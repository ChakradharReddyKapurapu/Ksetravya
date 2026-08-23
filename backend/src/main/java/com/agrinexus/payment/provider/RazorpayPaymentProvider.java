package com.agrinexus.payment.provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service("razorpayPaymentProvider")
public class RazorpayPaymentProvider implements PaymentProvider {

    private static final Logger log = LoggerFactory.getLogger(RazorpayPaymentProvider.class);

    @Value("${agrinexus.payment.key-id:rzp_test_agrinexus123}")
    private String keyId;

    @Value("${agrinexus.payment.key-secret:secret_agrinexus_key_456}")
    private String keySecret;

    @Value("${agrinexus.payment.webhook-secret:whsec_agrinexus_789}")
    private String webhookSecret;

    @Override
    public String createPaymentOrder(BigDecimal amount, String currency, String receipt) {
        // Razorpay API integration simulation or SDK call
        String orderId = "order_rzp_" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);
        log.info("[RAZORPAY PROVIDER] Created order {} for amount {} {}", orderId, amount, currency);
        return orderId;
    }

    @Override
    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        if (orderId == null || paymentId == null || signature == null) {
            return false;
        }
        try {
            String data = orderId + "|" + paymentId;
            String generatedSignature = calculateHmacSha256(data, keySecret);
            return generatedSignature.equalsIgnoreCase(signature);
        } catch (Exception e) {
            log.error("Razorpay payment signature verification failed: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public String refundPayment(String paymentId, BigDecimal amount, String reason) {
        String refundId = "rfnd_rzp_" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);
        log.info("[RAZORPAY PROVIDER] Generated refund {} for paymentId {}", refundId, paymentId);
        return refundId;
    }

    @Override
    public boolean verifyWebhookSignature(String payload, String signature, String secret) {
        if (payload == null || signature == null) {
            return false;
        }
        String effectiveSecret = (secret != null && !secret.trim().isEmpty()) ? secret : webhookSecret;
        try {
            String generatedSignature = calculateHmacSha256(payload, effectiveSecret);
            return generatedSignature.equalsIgnoreCase(signature);
        } catch (Exception e) {
            log.error("Razorpay webhook signature verification failed: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public String getProviderName() {
        return "RAZORPAY";
    }

    @Override
    public String getPublicKeyId() {
        return keyId;
    }

    private String calculateHmacSha256(String data, String secret) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder result = new StringBuilder();
        for (byte b : hash) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}
