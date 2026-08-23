package com.agrinexus.analytics.calculator;

import java.math.BigDecimal;
import java.util.*;

public class CropProfileConfig {

    public record AgronomicProfile(
            String cropCode,
            String displayName,
            String icon,
            Set<String> preferredSoils,
            String waterRequirement,
            Set<String> suitableIrrigation,
            int typicalDurationDays,
            BigDecimal defaultYieldPerAcre,
            String yieldUnit,
            BigDecimal defaultPricePerQuintal,
            BigDecimal seedCostPerAcre,
            BigDecimal fertilizerCostPerAcre,
            BigDecimal cropProtectionCostPerAcre,
            BigDecimal labourCostPerAcre,
            BigDecimal machineryCostPerAcre,
            BigDecimal irrigationCostPerAcre,
            BigDecimal transportCostPerAcre,
            BigDecimal otherCostPerAcre,
            String defaultRiskLevel,
            String marketTimingInsight
    ) {
        public BigDecimal getTotalBenchmarkCostPerAcre() {
            return seedCostPerAcre
                    .add(fertilizerCostPerAcre)
                    .add(cropProtectionCostPerAcre)
                    .add(labourCostPerAcre)
                    .add(machineryCostPerAcre)
                    .add(irrigationCostPerAcre)
                    .add(transportCostPerAcre)
                    .add(otherCostPerAcre);
        }
    }

    private static final Map<String, AgronomicProfile> PROFILES = new LinkedHashMap<>();

    static {
        // 1. RICE / PADDY
        PROFILES.put("RICE", new AgronomicProfile(
                "RICE",
                "Sona Masoori Paddy (Rice)",
                "🌾",
                Set.of("ALLUVIAL", "CLAY_LOAM", "BLACK_SOIL"),
                "HIGH",
                Set.of("CANAL", "BOREWELL", "FLOOD"),
                135,
                new BigDecimal("20.00"), // 20 Quintals / Acre
                "Quintals / Acre",
                new BigDecimal("2420.00"), // ₹2,420 / Quintal
                new BigDecimal("3500.00"),
                new BigDecimal("6500.00"),
                new BigDecimal("3200.00"),
                new BigDecimal("14000.00"),
                new BigDecimal("5500.00"),
                new BigDecimal("2000.00"),
                new BigDecimal("1800.00"),
                new BigDecimal("1500.00"),
                "LOW",
                "Observed prices show steady demand with favorable mandi realizations in Nov-Dec post-harvest."
        ));

        // 2. COTTON
        PROFILES.put("COTTON", new AgronomicProfile(
                "COTTON",
                "Bt Hybrid Cotton (White Gold)",
                "🌿",
                Set.of("BLACK_SOIL", "BLACK_COTTON", "DEEP_BLACK", "RED_LOAM"),
                "MEDIUM",
                Set.of("BOREWELL", "DRIP", "DRIP_READY", "RAIN_FED"),
                165,
                new BigDecimal("12.00"), // 12 Quintals / Acre
                "Quintals / Acre",
                new BigDecimal("7550.00"), // ₹7,550 / Quintal
                new BigDecimal("4200.00"),
                new BigDecimal("8000.00"),
                new BigDecimal("7500.00"),
                new BigDecimal("18000.00"),
                new BigDecimal("6000.00"),
                new BigDecimal("2500.00"),
                new BigDecimal("2200.00"),
                new BigDecimal("1600.00"),
                "MEDIUM",
                "Textile demand supports firm price floors. Peak mandi pricing historically noted in Jan-Feb."
        ));

        // 3. CHILLI
        PROFILES.put("CHILLI", new AgronomicProfile(
                "CHILLI",
                "Teja Red Chilli (Guntur Spice)",
                "🌶️",
                Set.of("BLACK_SOIL", "RED_LOAM", "SANDY_LOAM"),
                "MEDIUM",
                Set.of("BOREWELL", "DRIP", "DRIP_READY"),
                150,
                new BigDecimal("22.00"), // 22 Quintals / Acre
                "Quintals / Acre",
                new BigDecimal("20400.00"), // ₹20,400 / Quintal
                new BigDecimal("6000.00"),
                new BigDecimal("15000.00"),
                new BigDecimal("18000.00"),
                new BigDecimal("32000.00"),
                new BigDecimal("8000.00"),
                new BigDecimal("4000.00"),
                new BigDecimal("3500.00"),
                new BigDecimal("3500.00"),
                "MEDIUM",
                "Export demand keeps Guntur cold storage stocks in high demand throughout Feb-April."
        ));

        // 4. GROUNDNUT
        PROFILES.put("GROUNDNUT", new AgronomicProfile(
                "GROUNDNUT",
                "Kadiri Bold Groundnut Pods",
                "🥜",
                Set.of("RED_LOAM", "RED_SANDY_LOAM", "SANDY_LOAM", "LIGHT_SOIL"),
                "LOW",
                Set.of("BOREWELL", "SPRINKLER", "RAIN_FED"),
                115,
                new BigDecimal("16.00"), // 16 Quintals / Acre
                "Quintals / Acre",
                new BigDecimal("7500.00"), // ₹7,500 / Quintal
                new BigDecimal("5500.00"),
                new BigDecimal("5000.00"),
                new BigDecimal("3000.00"),
                new BigDecimal("11000.00"),
                new BigDecimal("4500.00"),
                new BigDecimal("2000.00"),
                new BigDecimal("1500.00"),
                new BigDecimal("1500.00"),
                "LOW",
                "Oil mill crushing demand maintains tight supply buffers across Rayalaseema mandis."
        ));

        // 5. MAIZE
        PROFILES.put("MAIZE", new AgronomicProfile(
                "MAIZE",
                "Yellow Feed Corn (Maize)",
                "🌽",
                Set.of("RED_LOAM", "ALLUVIAL", "BLACK_SOIL"),
                "MEDIUM",
                Set.of("BOREWELL", "CANAL", "DRIP"),
                105,
                new BigDecimal("25.00"), // 25 Quintals / Acre
                "Quintals / Acre",
                new BigDecimal("2250.00"), // ₹2,250 / Quintal
                new BigDecimal("3200.00"),
                new BigDecimal("6000.00"),
                new BigDecimal("2800.00"),
                new BigDecimal("9500.00"),
                new BigDecimal("4000.00"),
                new BigDecimal("2000.00"),
                new BigDecimal("1500.00"),
                new BigDecimal("1200.00"),
                "LOW",
                "Poultry feed industry drives steady procurement with low price volatility."
        ));

        // 6. SUGARCANE
        PROFILES.put("SUGARCANE", new AgronomicProfile(
                "SUGARCANE",
                "Commercial High-Sugar Cane",
                "🎋",
                Set.of("ALLUVIAL", "BLACK_SOIL", "CLAY_LOAM"),
                "HIGH",
                Set.of("CANAL", "BOREWELL", "DRIP"),
                330,
                new BigDecimal("400.00"), // 400 Quintals / 40 Tons / Acre
                "Quintals / Acre",
                new BigDecimal("350.00"), // ₹350 / Quintal (FRP factory rate)
                new BigDecimal("12000.00"),
                new BigDecimal("18000.00"),
                new BigDecimal("6500.00"),
                new BigDecimal("28000.00"),
                new BigDecimal("9000.00"),
                new BigDecimal("6000.00"),
                new BigDecimal("5000.00"),
                new BigDecimal("3500.00"),
                "LOW",
                "Guaranteed mill crushing quotas and Fair & Remunerative Price (FRP) floors."
        ));
    }

    public static Optional<AgronomicProfile> getProfile(String cropNameOrCode) {
        if (cropNameOrCode == null || cropNameOrCode.trim().isEmpty()) {
            return Optional.empty();
        }
        String normalized = cropNameOrCode.trim().toUpperCase()
                .replace(" ", "_")
                .replace("-", "_")
                .replace("PADDY", "RICE")
                .replace("PEANUT", "GROUNDNUT");

        for (Map.Entry<String, AgronomicProfile> entry : PROFILES.entrySet()) {
            if (normalized.contains(entry.getKey())) {
                return Optional.of(entry.getValue());
            }
        }
        return Optional.empty();
    }

    public static Collection<AgronomicProfile> getAllProfiles() {
        return PROFILES.values();
    }
}
