package com.agrinexus.payment.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.payment.dto.*;
import com.agrinexus.payment.service.PaymentService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/payments/orders")
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> createPaymentOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody PaymentOrderRequest request) {
        PaymentOrderResponse response = paymentService.createPaymentOrder(principal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Payment order created successfully", response));
    }

    @PostMapping("/payments/verify")
    public ResponseEntity<ApiResponse<TransactionResponse>> verifyPayment(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody PaymentVerifyRequest request) {
        TransactionResponse response = paymentService.verifyPayment(principal.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Payment verified successfully", response));
    }

    @GetMapping("/payments/{transactionId}")
    public ResponseEntity<ApiResponse<TransactionResponse>> getTransactionDetails(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long transactionId) {
        TransactionResponse response = paymentService.getTransactionDetails(principal.getUsername(), transactionId);
        return ResponseEntity.ok(ApiResponse.success("Transaction details fetched successfully", response));
    }

    @PostMapping("/payments/{transactionId}/refund")
    public ResponseEntity<ApiResponse<TransactionResponse>> refundTransaction(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long transactionId,
            @RequestBody(required = false) RefundRequest request) {
        TransactionResponse response = paymentService.refundTransaction(principal.getUsername(), transactionId, request);
        return ResponseEntity.ok(ApiResponse.success("Transaction refund initiated successfully", response));
    }

    @GetMapping("/payments/my")
    public ResponseEntity<ApiResponse<Page<TransactionResponse>>> getFarmerTransactions(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<TransactionResponse> response = paymentService.getFarmerTransactions(principal.getUsername(), page, size);
        return ResponseEntity.ok(ApiResponse.success("Farmer transactions fetched successfully", response));
    }

    @GetMapping("/worker/earnings")
    public ResponseEntity<ApiResponse<WorkerEarningsResponse>> getWorkerEarnings(
            @AuthenticationPrincipal UserPrincipal principal) {
        WorkerEarningsResponse response = paymentService.getWorkerEarnings(principal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Worker earnings fetched successfully", response));
    }

    @PostMapping("/payments/webhook")
    public ResponseEntity<ApiResponse<String>> handleWebhook(
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature,
            @RequestBody String rawPayload,
            @RequestParam Map<String, Object> allParams) {
        paymentService.processWebhook(rawPayload, signature, Map.of());
        return ResponseEntity.ok(ApiResponse.success("Webhook processed successfully", "OK"));
    }

    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        public ApiResponse() {
        }

        public ApiResponse(boolean success, String message, T data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public static <T> ApiResponse<T> success(String message, T data) {
            return new ApiResponse<>(true, message, data);
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public T getData() { return data; }
        public void setData(T data) { this.data = data; }
    }
}
