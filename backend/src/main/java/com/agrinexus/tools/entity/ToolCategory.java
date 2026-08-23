package com.agrinexus.tools.entity;

public enum ToolCategory {
    TRACTOR,
    HARVESTER,
    ROTAVATOR,
    SEEDER,
    SPRAYER,
    PLOUGH,
    CULTIVATOR,
    IRRIGATION,
    TILLER,
    SOWING,
    SOIL_PREP,
    PROTECTION,
    FERTILIZER,
    TRANSPORT,
    OTHER;

    public static ToolCategory fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");

        if (normalized.equals("TRACTORS")) return TRACTOR;
        if (normalized.equals("HARVESTING")) return HARVESTER;
        if (normalized.equals("SOWING_&_PLANTING") || normalized.equals("SOWING")) return SOWING;
        if (normalized.equals("SOIL_PREPARATION") || normalized.equals("SOIL_PREP")) return SOIL_PREP;
        if (normalized.equals("CROP_PROTECTION") || normalized.equals("PROTECTION")) return PROTECTION;
        if (normalized.equals("FERTILIZER_EQUIPMENT") || normalized.equals("FERTILIZER")) return FERTILIZER;
        if (normalized.equals("FARM_TRANSPORT") || normalized.equals("TRANSPORT")) return TRANSPORT;

        try {
            return ToolCategory.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
