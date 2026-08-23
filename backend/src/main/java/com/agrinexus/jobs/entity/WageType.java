package com.agrinexus.jobs.entity;

public enum WageType {
    PER_DAY,
    PER_HOUR,
    PER_TASK,
    PER_ACRE,
    FIXED;

    public static WageType fromString(String text) {
        if (text == null || text.trim().isEmpty()) {
            return PER_DAY;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_").replace("/", "_");
        if (normalized.contains("DAY")) return PER_DAY;
        if (normalized.contains("HR") || normalized.contains("HOUR")) return PER_HOUR;
        if (normalized.contains("TASK")) return PER_TASK;
        if (normalized.contains("ACRE")) return PER_ACRE;
        if (normalized.contains("FIX")) return FIXED;

        try {
            return WageType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return PER_DAY;
        }
    }
}
