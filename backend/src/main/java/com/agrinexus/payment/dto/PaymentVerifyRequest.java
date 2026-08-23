package com.agrinexus.payment.dto;

public class PaymentVerifyRequest {

    private String providerOrderId;
    private String providerPaymentId;
    private String providerSignature;

    public PaymentVerifyRequest() {
    }

    public PaymentVerifyRequest(String providerOrderId, String providerPaymentId, String providerSignature) {
        this.providerOrderId = providerOrderId;
        this.providerPaymentId = providerPaymentId;
        this.providerSignature = providerSignature;
    }

    public String getProviderOrderId() { return providerOrderId; }
    public void setProviderOrderId(String providerOrderId) { this.providerOrderId = providerOrderId; }

    public String getProviderPaymentId() { return providerPaymentId; }
    public void setProviderPaymentId(String providerPaymentId) { this.providerPaymentId = providerPaymentId; }

    public String getProviderSignature() { return providerSignature; }
    public void setProviderSignature(String providerSignature) { this.providerSignature = providerSignature; }
}
