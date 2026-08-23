package com.agrinexus.tools.entity;

public enum ToolCondition {
    NEW,
    GOOD,
    USED,
    REFURBISHED;

    public static ToolCondition fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        try {
            return ToolCondition.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return GOOD;
        }
    }
}
