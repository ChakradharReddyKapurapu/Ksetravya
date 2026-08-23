package com.agrinexus.payment.provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service("mockPaymentProvider")
public class MockPaymentProvider implements PaymentProvider {

    private static final Logger log = LoggerFactory.getLogger(MockPaymentProvider.class);

    @Value("${agrinexus.payment.key-id:rzp_test_agrinexus123}")
    private String keyId;

    @Override
    public String createPaymentOrder(BigDecimal amount, String currency, String receipt) {
        String orderId = "order_mock_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        log.info("[MOCK PROVIDER] Created payment order {} for amount {} {}", orderId, amount, currency);
        return orderId;
    }

    @Override
    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        log.info("[MOCK PROVIDER] Verifying payment for order {}, paymentId {}, signature {}", orderId, paymentId, signature);
        if (signature == null || signature.trim().isEmpty()) {
            return false;
        }
        // Reject explicit invalid signature test cases
        if ("invalid_signature".equalsIgnoreCase(signature) || "fake_signature".equalsIgnoreCase(signature)) {
            return false;
        }
        return true;
    }

    @Override
    public String refundPayment(String paymentId, BigDecimal amount, String reason) {
        String refundId = "rfnd_mock_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        log.info("[MOCK PROVIDER] Refunded paymentId {} with refundId {} for amount {}", paymentId, refundId, amount);
        return refundId;
    }

    @Override
    public boolean verifyWebhookSignature(String payload, String signature, String webhookSecret) {
        log.info("[MOCK PROVIDER] Verifying webhook signature {}", signature);
        if (signature == null || signature.trim().isEmpty()) {
            return false;
        }
        return !"invalid_signature".equalsIgnoreCase(signature);
    }

    @Override
    public String getProviderName() {
        return "MOCK";
    }

    @Override
    public String getPublicKeyId() {
        return keyId;
    }
}
