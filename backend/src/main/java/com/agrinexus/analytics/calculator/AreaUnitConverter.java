package com.agrinexus.analytics.calculator;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class AreaUnitConverter {

    /**
     * Standard normalization to Acres.
     * 1 Acre = 1.0 Acre
     * 1 Hectare = 2.47105 Acres
     * 1 Guntha = 0.025 Acres (40 Gunthas = 1 Acre)
     * 1 Bigha = 0.625 Acres (approx Indian standard 1 Bigha ~ 5/8 Acre)
     * 1 Cent = 0.01 Acres (100 Cents = 1 Acre)
     * 1 Square Meter = 0.000247105 Acres
     */
    public static BigDecimal toAcres(BigDecimal area, String unit) {
        if (area == null || area.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ONE;
        }
        if (unit == null || unit.trim().isEmpty()) {
            return area;
        }

        String normalized = unit.trim().toUpperCase().replace(" ", "_");
        if (normalized.contains("HECTARE") || normalized.contains("HA")) {
            return area.multiply(new BigDecimal("2.47105")).setScale(4, RoundingMode.HALF_UP);
        } else if (normalized.contains("GUNTHA") || normalized.contains("GUNTA")) {
            return area.multiply(new BigDecimal("0.025")).setScale(4, RoundingMode.HALF_UP);
        } else if (normalized.contains("BIGHA")) {
            return area.multiply(new BigDecimal("0.625")).setScale(4, RoundingMode.HALF_UP);
        } else if (normalized.contains("CENT")) {
            return area.multiply(new BigDecimal("0.01")).setScale(4, RoundingMode.HALF_UP);
        } else if (normalized.contains("SQ_METER") || normalized.contains("SQM")) {
            return area.multiply(new BigDecimal("0.000247105")).setScale(4, RoundingMode.HALF_UP);
        }

        return area; // Default is Acres
    }

    public static BigDecimal fromAcres(BigDecimal acres, String targetUnit) {
        if (acres == null || acres.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ONE;
        }
        if (targetUnit == null || targetUnit.trim().isEmpty()) {
            return acres;
        }

        String normalized = targetUnit.trim().toUpperCase().replace(" ", "_");
        if (normalized.contains("HECTARE") || normalized.contains("HA")) {
            return acres.divide(new BigDecimal("2.47105"), 4, RoundingMode.HALF_UP);
        } else if (normalized.contains("GUNTHA") || normalized.contains("GUNTA")) {
            return acres.multiply(new BigDecimal("40")).setScale(2, RoundingMode.HALF_UP);
        } else if (normalized.contains("BIGHA")) {
            return acres.divide(new BigDecimal("0.625"), 4, RoundingMode.HALF_UP);
        } else if (normalized.contains("CENT")) {
            return acres.multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP);
        }

        return acres;
    }
}
