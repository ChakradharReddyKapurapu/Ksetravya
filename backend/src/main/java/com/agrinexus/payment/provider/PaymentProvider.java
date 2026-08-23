package com.agrinexus.payment.provider;

import java.math.BigDecimal;

public interface PaymentProvider {

    String createPaymentOrder(BigDecimal amount, String currency, String receipt);

    boolean verifyPayment(String orderId, String paymentId, String signature);

    String refundPayment(String paymentId, BigDecimal amount, String reason);

    boolean verifyWebhookSignature(String payload, String signature, String webhookSecret);

    String getProviderName();

    String getPublicKeyId();
}
