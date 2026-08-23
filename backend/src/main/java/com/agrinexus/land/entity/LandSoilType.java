package com.agrinexus.land.entity;

public enum LandSoilType {
    BLACK_SOIL,
    RED_LOAM,
    ALLUVIAL,
    COASTAL_SAND,
    CLAY_LOAM,
    LATERITE,
    OTHER;

    public static LandSoilType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("BLACK") || normalized.contains("REGUR")) return BLACK_SOIL;
        if (normalized.contains("RED") || normalized.contains("SANDY_LOAM")) return RED_LOAM;
        if (normalized.contains("ALLUVIAL") || normalized.contains("RIVER")) return ALLUVIAL;
        if (normalized.contains("COASTAL") || normalized.contains("SAND")) return COASTAL_SAND;
        if (normalized.contains("CLAY")) return CLAY_LOAM;
        if (normalized.contains("LATERITE")) return LATERITE;

        try {
            return LandSoilType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
