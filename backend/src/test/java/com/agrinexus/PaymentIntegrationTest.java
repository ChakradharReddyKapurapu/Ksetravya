package com.agrinexus;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.payment.controller.PaymentController;
import com.agrinexus.payment.dto.*;
import com.agrinexus.payment.service.PaymentService;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@SpringBootTest
public class PaymentIntegrationTest {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PaymentController paymentController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User farmer;
    private User worker;
    private Job testJob;

    @BeforeEach
    void setUp() {
        farmer = userRepository.findByEmail("pay.farmer@agrinexus.com").orElseGet(() -> {
            User u = User.builder()
                    .firstName("Ramesh")
                    .lastName("Farmer")
                    .email("pay.farmer@agrinexus.com")
                    .password(passwordEncoder.encode("Password123!"))
                    .phone("9848011223")
                    .role(Role.FARMER)
                    .enabled(true)
                    .build();
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });

        worker = userRepository.findByEmail("pay.worker@agrinexus.com").orElseGet(() -> {
            User u = User.builder()
                    .firstName("Suresh")
                    .lastName("Worker")
                    .email("pay.worker@agrinexus.com")
                    .password(passwordEncoder.encode("Password123!"))
                    .phone("9848044556")
                    .role(Role.WORKER)
                    .enabled(true)
                    .build();
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });

        testJob = new Job();
        testJob.setCreatedBy(farmer);
        testJob.setTitle("Cotton Harvesting Job #" + System.currentTimeMillis());
        testJob.setDescription("Harvesting cotton crop on 4 acres");
        testJob.setCategory(JobCategory.HARVESTING);
        testJob.setLocation("Tenali");
        testJob.setDistrict("Guntur");
        testJob.setState("Andhra Pradesh");
        testJob.setStartDate(LocalDate.now());
        testJob.setEstimatedDays(3);
        testJob.setWage(new BigDecimal("600.00"));
        testJob.setStatus(JobStatus.OPEN);
        testJob = jobRepository.save(testJob);
    }

    @Test
    @DisplayName("Test Server-Side Amount Calculation & Payment Order Creation")
    void testCreatePaymentOrder() {
        UserPrincipal principal = UserPrincipal.create(farmer);
        PaymentOrderRequest req = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());

        ResponseEntity<PaymentController.ApiResponse<PaymentOrderResponse>> res = paymentController.createPaymentOrder(principal, req);

        Assertions.assertEquals(200, res.getStatusCode().value());
        Assertions.assertNotNull(res.getBody());
        Assertions.assertTrue(res.getBody().isSuccess());

        PaymentOrderResponse data = res.getBody().getData();
        Assertions.assertNotNull(data.getProviderOrderId());
        Assertions.assertEquals(new BigDecimal("1800.00"), data.getGrossAmount()); // 600 * 3 = 1800
        Assertions.assertEquals(new BigDecimal("90.00"), data.getPlatformFee());  // 5% of 1800 = 90
        Assertions.assertEquals(new BigDecimal("1710.00"), data.getNetWorkerAmount()); // 1800 - 90 = 1710
        Assertions.assertEquals("PENDING", data.getStatus());
    }

    @Test
    @DisplayName("Test Backend Signature Verification & Status Transition to SUCCESS")
    void testVerifyPaymentSuccess() {
        UserPrincipal principal = UserPrincipal.create(farmer);
        PaymentOrderRequest orderReq = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());
        PaymentOrderResponse orderRes = paymentController.createPaymentOrder(principal, orderReq).getBody().getData();

        PaymentVerifyRequest verifyReq = new PaymentVerifyRequest(
                orderRes.getProviderOrderId(),
                "pay_mock_" + System.currentTimeMillis(),
                "sig_mock_valid_123"
        );

        ResponseEntity<PaymentController.ApiResponse<TransactionResponse>> res = paymentController.verifyPayment(principal, verifyReq);

        Assertions.assertEquals(200, res.getStatusCode().value());
        TransactionResponse data = res.getBody().getData();
        Assertions.assertEquals("SUCCESS", data.getStatus());
        Assertions.assertEquals(orderRes.getProviderOrderId(), data.getProviderOrderId());
    }

    @Test
    @DisplayName("Test Fake Signature Rejection (Fake Frontend Success Callback)")
    void testVerifyPaymentInvalidSignature() {
        UserPrincipal principal = UserPrincipal.create(farmer);
        PaymentOrderRequest orderReq = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());
        PaymentOrderResponse orderRes = paymentController.createPaymentOrder(principal, orderReq).getBody().getData();

        PaymentVerifyRequest verifyReq = new PaymentVerifyRequest(
                orderRes.getProviderOrderId(),
                "pay_mock_fake",
                "invalid_signature"
        );

        Assertions.assertThrows(Exception.class, () -> {
            paymentController.verifyPayment(principal, verifyReq);
        });
    }

    @Test
    @DisplayName("Test Provider Webhook Verification & Idempotency")
    void testWebhookProcessing() {
        UserPrincipal principal = UserPrincipal.create(farmer);
        PaymentOrderRequest orderReq = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());
        PaymentOrderResponse orderRes = paymentController.createPaymentOrder(principal, orderReq).getBody().getData();

        Map<String, Object> payload = new HashMap<>();
        payload.put("event", "payment.authorized");
        payload.put("event_id", "evt_mock_" + System.currentTimeMillis());

        Map<String, Object> orderMap = new HashMap<>();
        orderMap.put("order_id", orderRes.getProviderOrderId());
        Map<String, Object> entityMap = new HashMap<>();
        entityMap.put("entity", orderMap);
        Map<String, Object> paymentMap = new HashMap<>();
        paymentMap.put("payment", entityMap);
        payload.put("payload", paymentMap);

        paymentService.processWebhook("{}", "wh_sig_valid", payload);

        TransactionResponse tx = paymentService.getTransactionDetails(farmer.getEmail(), orderRes.getTransactionId());
        Assertions.assertEquals("SUCCESS", tx.getStatus());
    }

    @Test
    @DisplayName("Test Refund Transaction")
    void testRefundTransaction() {
        UserPrincipal principal = UserPrincipal.create(farmer);
        PaymentOrderRequest orderReq = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());
        PaymentOrderResponse orderRes = paymentController.createPaymentOrder(principal, orderReq).getBody().getData();

        PaymentVerifyRequest verifyReq = new PaymentVerifyRequest(
                orderRes.getProviderOrderId(),
                "pay_mock_rfnd_" + System.currentTimeMillis(),
                "sig_mock_valid_456"
        );
        TransactionResponse verifiedTx = paymentController.verifyPayment(principal, verifyReq).getBody().getData();

        RefundRequest refundReq = new RefundRequest("Job cancelled by mutual agreement", verifiedTx.getAmount());
        ResponseEntity<PaymentController.ApiResponse<TransactionResponse>> refundRes = paymentController.refundTransaction(
                principal,
                verifiedTx.getTransactionId(),
                refundReq
        );

        Assertions.assertEquals(200, refundRes.getStatusCode().value());
        Assertions.assertEquals("REFUNDED", refundRes.getBody().getData().getStatus());
    }

    @Test
    @DisplayName("Test Worker Earnings & Farmer Payment History")
    void testWorkerEarningsAndFarmerHistory() {
        UserPrincipal farmerPrincipal = UserPrincipal.create(farmer);
        UserPrincipal workerPrincipal = UserPrincipal.create(worker);

        PaymentOrderRequest orderReq = new PaymentOrderRequest(testJob.getId(), worker.getId(), UUID.randomUUID().toString());
        PaymentOrderResponse orderRes = paymentController.createPaymentOrder(farmerPrincipal, orderReq).getBody().getData();

        PaymentVerifyRequest verifyReq = new PaymentVerifyRequest(
                orderRes.getProviderOrderId(),
                "pay_mock_earn_" + System.currentTimeMillis(),
                "sig_mock_valid_789"
        );
        paymentController.verifyPayment(farmerPrincipal, verifyReq);

        // Check Farmer Payment History
        ResponseEntity<PaymentController.ApiResponse<Page<TransactionResponse>>> historyRes = paymentController.getFarmerTransactions(farmerPrincipal, 0, 10);
        Assertions.assertEquals(200, historyRes.getStatusCode().value());
        Assertions.assertTrue(historyRes.getBody().getData().getTotalElements() > 0);

        // Check Worker Earnings
        ResponseEntity<PaymentController.ApiResponse<WorkerEarningsResponse>> earningsRes = paymentController.getWorkerEarnings(workerPrincipal);
        Assertions.assertEquals(200, earningsRes.getStatusCode().value());
        WorkerEarningsResponse earnings = earningsRes.getBody().getData();
        Assertions.assertNotNull(earnings.getTotalEarned());
        Assertions.assertTrue(earnings.getTotalEarned().compareTo(BigDecimal.ZERO) > 0);
    }
}
