package com.agrinexus.payment.dto;

public class PaymentOrderRequest {

    private Long jobId;
    private Long workerId;
    private String idempotencyKey;

    public PaymentOrderRequest() {
    }

    public PaymentOrderRequest(Long jobId, Long workerId, String idempotencyKey) {
        this.jobId = jobId;
        this.workerId = workerId;
        this.idempotencyKey = idempotencyKey;
    }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public String getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }
}
