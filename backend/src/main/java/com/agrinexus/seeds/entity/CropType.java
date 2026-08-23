package com.agrinexus.seeds.entity;

public enum CropType {
    RICE,
    GROUNDNUT,
    COTTON,
    MAIZE,
    WHEAT,
    CHILLI,
    TOMATO,
    MANGO,
    VEGETABLES,
    PULSES,
    OTHER;

    public static CropType fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");

        if (normalized.contains("RICE") || normalized.contains("PADDY")) return RICE;
        if (normalized.contains("GROUNDNUT") || normalized.contains("PEANUT")) return GROUNDNUT;
        if (normalized.contains("COTTON")) return COTTON;
        if (normalized.contains("MAIZE") || normalized.contains("CORN")) return MAIZE;
        if (normalized.contains("WHEAT")) return WHEAT;
        if (normalized.contains("CHILLI") || normalized.contains("CHILI") || normalized.contains("MIRCHI")) return CHILLI;
        if (normalized.contains("TOMATO")) return TOMATO;
        if (normalized.contains("MANGO")) return MANGO;
        if (normalized.contains("PULSE") || normalized.contains("DAL") || normalized.contains("GRAM")) return PULSES;
        if (normalized.contains("VEGETABLE")) return VEGETABLES;

        try {
            return CropType.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
