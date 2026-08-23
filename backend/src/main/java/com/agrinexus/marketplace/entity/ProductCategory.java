package com.agrinexus.marketplace.entity;

public enum ProductCategory {
    SEEDS,
    GRAINS,
    VEGETABLES,
    FRUITS,
    OILSEEDS,
    PULSES,
    FERTILIZERS,
    CROP_PROTECTION,
    TOOLS,
    MACHINERY,
    IRRIGATION,
    FARM_EQUIPMENT,
    ORGANIC_PRODUCTS,
    OTHER;

    public static ProductCategory fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("SEED")) return SEEDS;
        if (normalized.contains("GRAIN") || normalized.contains("CEREAL")) return GRAINS;
        if (normalized.contains("VEGETABLE")) return VEGETABLES;
        if (normalized.contains("FRUIT") || normalized.contains("ORCHARD")) return FRUITS;
        if (normalized.contains("OILSEED")) return OILSEEDS;
        if (normalized.contains("PULSE") || normalized.contains("LEGUME")) return PULSES;
        if (normalized.contains("FERTILIZER") || normalized.contains("NUTRIENT")) return FERTILIZERS;
        if (normalized.contains("PROTECT") || normalized.contains("PEST") || normalized.contains("INSECT") || normalized.contains("BIO")) return CROP_PROTECTION;
        if (normalized.contains("TOOL")) return TOOLS;
        if (normalized.contains("MACHIN") || normalized.contains("TRACTOR")) return MACHINERY;
        if (normalized.contains("IRRIGAT") || normalized.contains("DRIP") || normalized.contains("PIPE")) return IRRIGATION;
        if (normalized.contains("EQUIP") || normalized.contains("SUPPL")) return FARM_EQUIPMENT;
        if (normalized.contains("ORGANIC")) return ORGANIC_PRODUCTS;

        try {
            return ProductCategory.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
