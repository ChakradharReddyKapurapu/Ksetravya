package com.agrinexus.payment.dto;

import java.math.BigDecimal;

public class PaymentOrderResponse {

    private Long transactionId;
    private Long jobId;
    private String provider;
    private String providerOrderId;
    private String keyId; // Public key ID for client SDK initialization
    private BigDecimal amount;
    private BigDecimal grossAmount;
    private BigDecimal platformFee;
    private BigDecimal netWorkerAmount;
    private String currency;
    private String status;

    public PaymentOrderResponse() {
    }

    public PaymentOrderResponse(Long transactionId, Long jobId, String provider, String providerOrderId, String keyId, BigDecimal amount, BigDecimal grossAmount, BigDecimal platformFee, BigDecimal netWorkerAmount, String currency, String status) {
        this.transactionId = transactionId;
        this.jobId = jobId;
        this.provider = provider;
        this.providerOrderId = providerOrderId;
        this.keyId = keyId;
        this.amount = amount;
        this.grossAmount = grossAmount;
        this.platformFee = platformFee;
        this.netWorkerAmount = netWorkerAmount;
        this.currency = currency;
        this.status = status;
    }

    public Long getTransactionId() { return transactionId; }
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getProviderOrderId() { return providerOrderId; }
    public void setProviderOrderId(String providerOrderId) { this.providerOrderId = providerOrderId; }

    public String getKeyId() { return keyId; }
    public void setKeyId(String keyId) { this.keyId = keyId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getGrossAmount() { return grossAmount; }
    public void setGrossAmount(BigDecimal grossAmount) { this.grossAmount = grossAmount; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getNetWorkerAmount() { return netWorkerAmount; }
    public void setNetWorkerAmount(BigDecimal netWorkerAmount) { this.netWorkerAmount = netWorkerAmount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
