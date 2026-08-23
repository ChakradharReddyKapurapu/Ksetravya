package com.agrinexus.land.entity;

public enum WaterSourceType {
    CANAL,
    BOREWELL,
    RIVER,
    DRIP_READY,
    WELL,
    RAIN_FED,
    OTHER;

    public static WaterSourceType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("CANAL")) return CANAL;
        if (normalized.contains("BOREWELL") || normalized.contains("BORE")) return BOREWELL;
        if (normalized.contains("RIVER")) return RIVER;
        if (normalized.contains("DRIP")) return DRIP_READY;
        if (normalized.contains("WELL")) return WELL;
        if (normalized.contains("RAIN") || normalized.contains("DRY")) return RAIN_FED;

        try {
            return WaterSourceType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
