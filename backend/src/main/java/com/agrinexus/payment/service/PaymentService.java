package com.agrinexus.payment.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.jobs.entity.ApplicationStatus;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobApplication;
import com.agrinexus.jobs.repository.JobApplicationRepository;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.service.NotificationService;
import com.agrinexus.payment.dto.*;
import com.agrinexus.payment.entity.Transaction;
import com.agrinexus.payment.entity.TransactionStatus;
import com.agrinexus.payment.provider.PaymentProvider;
import com.agrinexus.payment.repository.TransactionRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final TransactionRepository transactionRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final Map<String, PaymentProvider> paymentProviders;
    private final NotificationService notificationService;

    @Value("${agrinexus.payment.provider:mock}")
    private String configuredProvider;

    @Value("${agrinexus.payment.currency:INR}")
    private String configuredCurrency;

    @Value("${agrinexus.payment.platform-fee-percentage:5.0}")
    private double platformFeePercentage;

    public PaymentService(
            TransactionRepository transactionRepository,
            JobRepository jobRepository,
            JobApplicationRepository jobApplicationRepository,
            UserRepository userRepository,
            Map<String, PaymentProvider> paymentProviders,
            NotificationService notificationService) {
        this.transactionRepository = transactionRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.paymentProviders = paymentProviders;
        this.notificationService = notificationService;
    }

    private PaymentProvider getActiveProvider() {
        if ("razorpay".equalsIgnoreCase(configuredProvider) && paymentProviders.containsKey("razorpayPaymentProvider")) {
            return paymentProviders.get("razorpayPaymentProvider");
        }
        return paymentProviders.getOrDefault("mockPaymentProvider", paymentProviders.values().iterator().next());
    }

    @Transactional
    public PaymentOrderResponse createPaymentOrder(String farmerEmail, PaymentOrderRequest request) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer user not found"));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job listing not found with ID: " + request.getJobId()));

        if (!job.getCreatedBy().getId().equals(farmer.getId())) {
            throw new UnauthorizedException("You are not authorized to initiate payment for this job listing");
        }

        // Determine worker
        User worker = null;
        if (request.getWorkerId() != null) {
            worker = userRepository.findById(request.getWorkerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + request.getWorkerId()));
        } else {
            // Find accepted applicant for this job
            List<JobApplication> applications = jobApplicationRepository.findByJobIdOrderByAppliedAtDesc(job.getId());
            JobApplication accepted = applications.stream()
                    .filter(a -> a.getStatus() == ApplicationStatus.ACCEPTED)
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException("No accepted worker found for this job. Please accept a worker application first."));
            worker = accepted.getWorker();
        }

        // Idempotency check
        String idempotencyKey = request.getIdempotencyKey();
        if (idempotencyKey != null && !idempotencyKey.trim().isEmpty()) {
            var existing = transactionRepository.findByIdempotencyKey(idempotencyKey.trim());
            if (existing.isPresent()) {
                Transaction tx = existing.get();
                return mapToOrderResponse(tx);
            }
        } else {
            idempotencyKey = UUID.randomUUID().toString();
        }

        // Check for active existing transaction for this job
        List<Transaction> activeTxs = transactionRepository.findByJobIdAndStatusIn(
                job.getId(),
                Arrays.asList(TransactionStatus.CREATED, TransactionStatus.PENDING, TransactionStatus.SUCCESS)
        );

        if (!activeTxs.isEmpty()) {
            Transaction existingTx = activeTxs.get(0);
            if (existingTx.getStatus() == TransactionStatus.SUCCESS) {
                throw new DuplicateResourceException("Payment has already been completed for this job listing.");
            }
            if (existingTx.getStatus() == TransactionStatus.PENDING || existingTx.getStatus() == TransactionStatus.CREATED) {
                return mapToOrderResponse(existingTx);
            }
        }

        // Backend Amount Calculation
        BigDecimal wage = job.getWage() != null ? job.getWage() : new BigDecimal("500.00");
        int days = (job.getEstimatedDays() != null && job.getEstimatedDays() > 0) ? job.getEstimatedDays() : 1;
        BigDecimal grossAmount = wage.multiply(BigDecimal.valueOf(days)).setScale(2, RoundingMode.HALF_UP);

        BigDecimal feePercent = BigDecimal.valueOf(platformFeePercentage);
        BigDecimal platformFee = grossAmount.multiply(feePercent).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal netWorkerAmount = grossAmount.subtract(platformFee);

        PaymentProvider provider = getActiveProvider();
        String providerOrderId = provider.createPaymentOrder(grossAmount, configuredCurrency, "job_rcpt_" + job.getId());

        Transaction transaction = new Transaction(
                job,
                farmer,
                worker,
                grossAmount,
                grossAmount,
                platformFee,
                netWorkerAmount,
                configuredCurrency,
                TransactionStatus.PENDING,
                provider.getProviderName(),
                providerOrderId,
                idempotencyKey
        );

        Transaction saved = transactionRepository.save(transaction);

        // Dispatch Payment Initiated Notification
        publishPaymentNotification(
                farmer.getId(),
                "Payment Initiated",
                "Payment order created for job: " + job.getTitle() + " (Amount: ₹" + grossAmount + ")",
                NotificationType.SYSTEM,
                saved.getId()
        );

        return mapToOrderResponse(saved);
    }

    @Transactional
    public TransactionResponse verifyPayment(String farmerEmail, PaymentVerifyRequest request) {
        if (request.getProviderOrderId() == null || request.getProviderOrderId().trim().isEmpty()) {
            throw new BadRequestException("Provider Order ID is required for verification");
        }

        Transaction tx = transactionRepository.findByProviderOrderId(request.getProviderOrderId().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found for provider order ID: " + request.getProviderOrderId()));

        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        if (!tx.getPayer().getId().equals(farmer.getId())) {
            throw new UnauthorizedException("You are not authorized to verify this transaction");
        }

        if (tx.getStatus() == TransactionStatus.SUCCESS) {
            return mapToTransactionResponse(tx);
        }

        if (!tx.getStatus().canTransitionTo(TransactionStatus.SUCCESS)) {
            throw new BadRequestException("Transaction cannot transition to SUCCESS from status: " + tx.getStatus());
        }

        PaymentProvider provider = getActiveProvider();
        boolean verified = provider.verifyPayment(
                request.getProviderOrderId(),
                request.getProviderPaymentId(),
                request.getProviderSignature()
        );

        if (!verified) {
            tx.setStatus(TransactionStatus.FAILED);
            transactionRepository.save(tx);
            throw new BadRequestException("Payment verification failed: Invalid cryptographic signature.");
        }

        tx.setStatus(TransactionStatus.SUCCESS);
        tx.setProviderPaymentId(request.getProviderPaymentId());
        tx.setProviderSignature(request.getProviderSignature());
        Transaction saved = transactionRepository.save(tx);

        // Send notifications to Farmer and Worker
        publishPaymentNotification(
                tx.getPayer().getId(),
                "Payment Successful",
                "Your payment of ₹" + tx.getAmount() + " for job '" + tx.getJob().getTitle() + "' was successfully processed.",
                NotificationType.SYSTEM,
                saved.getId()
        );

        publishPaymentNotification(
                tx.getPayee().getId(),
                "Payment Received",
                "You received ₹" + tx.getNetWorkerAmount() + " (after platform fee) for job '" + tx.getJob().getTitle() + "'.",
                NotificationType.JOB_ACCEPTED,
                saved.getId()
        );

        return mapToTransactionResponse(saved);
    }

    @Transactional
    public void processWebhook(String payload, String signature, Map<String, Object> body) {
        PaymentProvider provider = getActiveProvider();
        boolean valid = provider.verifyWebhookSignature(payload, signature, null);

        if (!valid) {
            log.warn("Invalid payment webhook signature received. Signature: {}", signature);
            throw new BadRequestException("Invalid webhook signature");
        }

        String eventId = body.containsKey("event_id") ? String.valueOf(body.get("event_id")) :
                (body.containsKey("id") ? String.valueOf(body.get("id")) : UUID.randomUUID().toString());

        if (transactionRepository.findByProviderEventId(eventId).isPresent()) {
            log.info("Webhook event {} already processed. Ignoring.", eventId);
            return;
        }

        String eventType = body.containsKey("event") ? String.valueOf(body.get("event")) : "payment.authorized";

        String orderId = extractOrderIdFromWebhookPayload(body);
        if (orderId != null) {
            transactionRepository.findByProviderOrderId(orderId).ifPresent(tx -> {
                tx.setProviderEventId(eventId);

                if (("payment.authorized".equalsIgnoreCase(eventType) || "order.paid".equalsIgnoreCase(eventType) || "payment.captured".equalsIgnoreCase(eventType))
                        && tx.getStatus() != TransactionStatus.SUCCESS) {
                    tx.setStatus(TransactionStatus.SUCCESS);

                    publishPaymentNotification(
                            tx.getPayer().getId(),
                            "Payment Confirmed",
                            "Payment of ₹" + tx.getAmount() + " confirmed by provider webhook.",
                            NotificationType.SYSTEM,
                            tx.getId()
                    );
                } else if ("payment.failed".equalsIgnoreCase(eventType) && tx.getStatus() == TransactionStatus.PENDING) {
                    tx.setStatus(TransactionStatus.FAILED);
                }
                transactionRepository.save(tx);
            });
        }
    }

    @Transactional
    public TransactionResponse refundTransaction(String userEmail, Long transactionId, RefundRequest request) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Transaction tx = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + transactionId));

        if (!tx.getPayer().getId().equals(user.getId()) && !user.getRole().name().equals("ADMIN")) {
            throw new UnauthorizedException("You are not authorized to initiate a refund for this transaction");
        }

        if (tx.getStatus() != TransactionStatus.SUCCESS) {
            throw new BadRequestException("Only successful transactions can be refunded. Current status: " + tx.getStatus());
        }

        PaymentProvider provider = getActiveProvider();
        BigDecimal refundAmount = (request != null && request.getAmount() != null) ? request.getAmount() : tx.getAmount();
        String reason = (request != null && request.getReason() != null) ? request.getReason() : "Customer requested refund";

        String refundId = provider.refundPayment(tx.getProviderPaymentId(), refundAmount, reason);

        tx.setStatus(TransactionStatus.REFUNDED);
        Transaction saved = transactionRepository.save(tx);

        publishPaymentNotification(
                tx.getPayer().getId(),
                "Payment Refunded",
                "Your payment of ₹" + refundAmount + " for job '" + tx.getJob().getTitle() + "' has been refunded. Refund ID: " + refundId,
                NotificationType.SYSTEM,
                saved.getId()
        );

        return mapToTransactionResponse(saved);
    }

    @Transactional(readOnly = true)
    public TransactionResponse getTransactionDetails(String userEmail, Long transactionId) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        Transaction tx = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + transactionId));

        if (!tx.getPayer().getId().equals(user.getId()) && !tx.getPayee().getId().equals(user.getId()) && !user.getRole().name().equals("ADMIN")) {
            throw new UnauthorizedException("You are not authorized to view this transaction");
        }

        return mapToTransactionResponse(tx);
    }

    @Transactional(readOnly = true)
    public Page<TransactionResponse> getFarmerTransactions(String farmerEmail, int page, int size) {
        User farmer = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Farmer user not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Transaction> txPage = transactionRepository.findByPayerId(farmer.getId(), pageable);
        return txPage.map(this::mapToTransactionResponse);
    }

    @Transactional(readOnly = true)
    public WorkerEarningsResponse getWorkerEarnings(String workerEmail) {
        User worker = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Worker user not found"));

        BigDecimal totalEarned = transactionRepository.sumNetWorkerAmountByPayeeIdAndStatus(worker.getId(), TransactionStatus.SUCCESS);
        BigDecimal pendingEarnings = transactionRepository.sumNetWorkerAmountByPayeeIdAndStatus(worker.getId(), TransactionStatus.PENDING);

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Transaction> recentPage = transactionRepository.findByPayeeId(worker.getId(), pageable);

        List<TransactionResponse> recentTxs = recentPage.getContent().stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());

        long completedCount = recentPage.getTotalElements();

        return new WorkerEarningsResponse(
                worker.getId(),
                worker.getFullName(),
                totalEarned != null ? totalEarned : BigDecimal.ZERO,
                pendingEarnings != null ? pendingEarnings : BigDecimal.ZERO,
                (int) completedCount,
                recentTxs
        );
    }

    private PaymentOrderResponse mapToOrderResponse(Transaction tx) {
        PaymentProvider provider = getActiveProvider();
        return new PaymentOrderResponse(
                tx.getId(),
                tx.getJob().getId(),
                tx.getProvider(),
                tx.getProviderOrderId(),
                provider.getPublicKeyId(),
                tx.getAmount(),
                tx.getGrossAmount(),
                tx.getPlatformFee(),
                tx.getNetWorkerAmount(),
                tx.getCurrency(),
                tx.getStatus().name()
        );
    }

    private TransactionResponse mapToTransactionResponse(Transaction tx) {
        return new TransactionResponse(
                tx.getId(),
                tx.getJob().getId(),
                tx.getJob().getTitle(),
                tx.getPayer().getId(),
                tx.getPayer().getFullName(),
                tx.getPayee().getId(),
                tx.getPayee().getFullName(),
                tx.getAmount(),
                tx.getGrossAmount(),
                tx.getPlatformFee(),
                tx.getNetWorkerAmount(),
                tx.getCurrency(),
                tx.getStatus().name(),
                tx.getProvider(),
                tx.getProviderOrderId(),
                tx.getProviderPaymentId(),
                tx.getCreatedAt(),
                tx.getUpdatedAt()
        );
    }

    @SuppressWarnings("unchecked")
    private String extractOrderIdFromWebhookPayload(Map<String, Object> body) {
        try {
            if (body.containsKey("payload")) {
                Map<String, Object> p = (Map<String, Object>) body.get("payload");
                if (p.containsKey("payment")) {
                    Map<String, Object> payment = (Map<String, Object>) p.get("payment");
                    if (payment.containsKey("entity")) {
                        Map<String, Object> entity = (Map<String, Object>) payment.get("entity");
                        return String.valueOf(entity.get("order_id"));
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to parse orderId from webhook payload: {}", e.getMessage());
        }
        return null;
    }

    private void publishPaymentNotification(Long userId, String title, String message, NotificationType type, Long txId) {
        try {
            notificationService.createNotification(
                    userId,
                    title,
                    message,
                    type,
                    NotificationPriority.HIGH,
                    "TRANSACTION",
                    txId,
                    null,
                    UUID.randomUUID().toString()
            );
        } catch (Exception e) {
            log.error("Failed to publish payment notification: {}", e.getMessage());
        }
    }
}
