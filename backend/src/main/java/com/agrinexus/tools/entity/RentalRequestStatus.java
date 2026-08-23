package com.agrinexus.tools.entity;

public enum RentalRequestStatus {
    PENDING,
    APPROVED,
    REJECTED,
    CANCELLED,
    ACTIVE,
    COMPLETED;

    public boolean canTransitionTo(RentalRequestStatus next) {
        if (this == next) return true;
        return switch (this) {
            case PENDING -> next == APPROVED || next == REJECTED || next == CANCELLED;
            case APPROVED -> next == ACTIVE || next == CANCELLED;
            case ACTIVE -> next == COMPLETED;
            case REJECTED, CANCELLED, COMPLETED -> false; // Terminal states
        };
    }
}
