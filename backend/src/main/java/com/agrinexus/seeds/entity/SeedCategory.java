package com.agrinexus.seeds.entity;

public enum SeedCategory {
    CEREALS,
    PULSES,
    OILSEEDS,
    VEGETABLES,
    FRUITS,
    COMMERCIAL,
    OTHER;

    public static SeedCategory fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("CEREAL") || normalized.contains("GRAIN")) return CEREALS;
        if (normalized.contains("PULSE") || normalized.contains("LEGUME")) return PULSES;
        if (normalized.contains("OILSEED")) return OILSEEDS;
        if (normalized.contains("VEGETABLE")) return VEGETABLES;
        if (normalized.contains("FRUIT") || normalized.contains("ORCHARD")) return FRUITS;
        if (normalized.contains("COMMERCIAL")) return COMMERCIAL;

        try {
            return SeedCategory.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
