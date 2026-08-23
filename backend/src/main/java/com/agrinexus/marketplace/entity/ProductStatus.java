package com.agrinexus.marketplace.entity;

public enum ProductStatus {
    ACTIVE,
    OUT_OF_STOCK,
    INACTIVE;

    public static ProductStatus fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return ProductStatus.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ACTIVE;
        }
    }
}
