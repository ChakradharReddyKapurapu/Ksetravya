package com.agrinexus.payment.entity;

public enum TransactionStatus {
    CREATED,
    PENDING,
    AUTHORIZED,
    SUCCESS,
    FAILED,
    CANCELLED,
    REFUND_PENDING,
    REFUNDED;

    public boolean canTransitionTo(TransactionStatus target) {
        if (this == target) return true;
        return switch (this) {
            case CREATED -> target == PENDING || target == AUTHORIZED || target == SUCCESS || target == FAILED || target == CANCELLED;
            case PENDING -> target == AUTHORIZED || target == SUCCESS || target == FAILED || target == CANCELLED;
            case AUTHORIZED -> target == SUCCESS || target == FAILED || target == CANCELLED;
            case SUCCESS -> target == REFUND_PENDING || target == REFUNDED;
            case REFUND_PENDING -> target == REFUNDED || target == FAILED;
            case FAILED, CANCELLED, REFUNDED -> false; // Terminal states
        };
    }
}
