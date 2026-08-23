package com.agrinexus.crop.entity;

public enum ProtectionType {
    DISEASE,
    PEST,
    DEFICIENCY,
    WEED,
    OTHER;

    public static ProtectionType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("DISEASE") || normalized.contains("FUNGAL") || normalized.contains("BACTERIAL")) return DISEASE;
        if (normalized.contains("PEST") || normalized.contains("INSECT") || normalized.contains("BUG")) return PEST;
        if (normalized.contains("DEFICIENCY") || normalized.contains("NUTRIENT")) return DEFICIENCY;
        if (normalized.contains("WEED")) return WEED;

        try {
            return ProtectionType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
