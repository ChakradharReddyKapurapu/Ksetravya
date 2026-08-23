package com.agrinexus.seeds.entity;

public enum WaterRequirement {
    LOW,
    MEDIUM,
    HIGH;

    public static WaterRequirement fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return WaterRequirement.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return MEDIUM;
        }
    }
}
