package com.agrinexus.jobs.entity;

public enum JobCategory {
    PLANTING,
    SOWING,
    TRANSPLANTING,
    HARVESTING,
    THRESHING,
    WEEDING,
    IRRIGATION,
    SPRAYING,
    TRACTOR_OPERATOR,
    PLOUGHING,
    MACHINE_OPERATOR,
    PACKING,
    LOADING,
    TRANSPORT,
    FARM_MAINTENANCE,
    FRUIT_PICKING,
    VEGETABLE_PICKING,
    GENERAL_FARM_WORK,
    OTHER;

    public static JobCategory fromString(String text) {
        if (text == null || text.trim().isEmpty() || "all".equalsIgnoreCase(text.trim())) {
            return null;
        }
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        if (normalized.contains("HARVEST") || normalized.contains("CUTTING")) return HARVESTING;
        if (normalized.contains("THRESH")) return THRESHING;
        if (normalized.contains("TRANSPLANT")) return TRANSPLANTING;
        if (normalized.contains("PLANT")) return PLANTING;
        if (normalized.contains("SOW")) return SOWING;
        if (normalized.contains("WEED") || normalized.contains("HOE")) return WEEDING;
        if (normalized.contains("IRRIGAT") || normalized.contains("DRIP")) return IRRIGATION;
        if (normalized.contains("SPRAY") || normalized.contains("PESTICIDE")) return SPRAYING;
        if (normalized.contains("TRACTOR") || normalized.contains("PLOUGH")) return TRACTOR_OPERATOR;
        if (normalized.contains("MACHINE") || normalized.contains("COMBINE") || normalized.contains("OPERATOR")) return MACHINE_OPERATOR;
        if (normalized.contains("PACK") || normalized.contains("GRAD")) return PACKING;
        if (normalized.contains("LOAD")) return LOADING;
        if (normalized.contains("TRANS")) return TRANSPORT;
        if (normalized.contains("MAINT")) return FARM_MAINTENANCE;
        if (normalized.contains("FRUIT") || normalized.contains("ORCHARD")) return FRUIT_PICKING;
        if (normalized.contains("VEGETABLE") || normalized.contains("CHILLI") || normalized.contains("TOMATO")) return VEGETABLE_PICKING;
        if (normalized.contains("GENERAL") || normalized.contains("LABOR") || normalized.contains("LABOUR")) return GENERAL_FARM_WORK;

        try {
            return JobCategory.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return OTHER;
        }
    }
}
