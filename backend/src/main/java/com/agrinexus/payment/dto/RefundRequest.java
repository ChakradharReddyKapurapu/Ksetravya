package com.agrinexus.payment.dto;

import java.math.BigDecimal;

public class RefundRequest {

    private String reason;
    private BigDecimal amount; // Optional partial refund amount

    public RefundRequest() {
    }

    public RefundRequest(String reason, BigDecimal amount) {
        this.reason = reason;
        this.amount = amount;
    }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}
