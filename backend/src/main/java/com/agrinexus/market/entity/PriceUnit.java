package com.agrinexus.market.entity;

public enum PriceUnit {
    PER_QUINTAL,
    PER_KG,
    PER_TON,
    PER_BAG,
    OTHER;

    public static PriceUnit fromString(String text) {
        if (text == null || text.trim().isEmpty()) {
            return PER_QUINTAL;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_").replace("/", "_");
        if (normalized.contains("QUINTAL") || normalized.contains("QTL")) return PER_QUINTAL;
        if (normalized.contains("KG") || normalized.contains("KILO")) return PER_KG;
        if (normalized.contains("TON") || normalized.contains("TONNE")) return PER_TON;
        if (normalized.contains("BAG")) return PER_BAG;

        try {
            return PriceUnit.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return PER_QUINTAL;
        }
    }
}
