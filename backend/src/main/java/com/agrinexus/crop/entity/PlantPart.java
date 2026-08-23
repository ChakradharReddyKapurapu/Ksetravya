package com.agrinexus.crop.entity;

public enum PlantPart {
    LEAF,
    STEM,
    ROOT,
    FRUIT,
    FLOWER,
    SEED,
    WHOLE_PLANT,
    OTHER;

    public static PlantPart fromString(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("LEAF") || normalized.contains("FOLIAGE")) return LEAF;
        if (normalized.contains("STEM") || normalized.contains("STALK") || normalized.contains("SHOOT")) return STEM;
        if (normalized.contains("ROOT") || normalized.contains("TUBER")) return ROOT;
        if (normalized.contains("FRUIT") || normalized.contains("POD") || normalized.contains("GRAIN")) return FRUIT;
        if (normalized.contains("FLOWER") || normalized.contains("BLOSSOM")) return FLOWER;
        if (normalized.contains("SEED")) return SEED;
        if (normalized.contains("WHOLE") || normalized.contains("PLANT")) return WHOLE_PLANT;

        try {
            return PlantPart.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
