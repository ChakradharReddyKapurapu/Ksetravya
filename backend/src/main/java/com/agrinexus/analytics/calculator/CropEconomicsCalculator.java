package com.agrinexus.analytics.calculator;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class CropEconomicsCalculator {

    public record EconomicCalculation(
            BigDecimal totalCost,
            BigDecimal seedCost,
            BigDecimal fertilizerCost,
            BigDecimal cropProtectionCost,
            BigDecimal labourCost,
            BigDecimal machineryCost,
            BigDecimal irrigationCost,
            BigDecimal landLeaseCost,
            BigDecimal transportCost,
            BigDecimal otherCost,
            BigDecimal estimatedYield,
            String yieldUnit,
            BigDecimal referencePrice,
            String priceUnit,
            BigDecimal estimatedRevenue,
            BigDecimal estimatedProfit,
            BigDecimal profitMargin,
            String status,
            List<String> assumptions
    ) {}

    public static EconomicCalculation calculateEconomics(
            CropProfileConfig.AgronomicProfile profile,
            BigDecimal areaInAcres,
            BigDecimal customLandRent,
            BigDecimal overridePricePerQuintal) {

        BigDecimal area = areaInAcres != null && areaInAcres.compareTo(BigDecimal.ZERO) > 0 ? areaInAcres : BigDecimal.ONE;

        // Scale benchmark costs by area
        BigDecimal seedCost = profile.seedCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal fertilizerCost = profile.fertilizerCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal cropProtCost = profile.cropProtectionCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal labourCost = profile.labourCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal machineryCost = profile.machineryCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal irrigationCost = profile.irrigationCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal landLeaseCost = customLandRent != null ? customLandRent.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
        BigDecimal transportCost = profile.transportCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal otherCost = profile.otherCostPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalCost = seedCost
                .add(fertilizerCost)
                .add(cropProtCost)
                .add(labourCost)
                .add(machineryCost)
                .add(irrigationCost)
                .add(landLeaseCost)
                .add(transportCost)
                .add(otherCost);

        // Yield & Revenue
        BigDecimal estimatedYield = profile.defaultYieldPerAcre().multiply(area).setScale(2, RoundingMode.HALF_UP);
        BigDecimal price = overridePricePerQuintal != null && overridePricePerQuintal.compareTo(BigDecimal.ZERO) > 0
                ? overridePricePerQuintal
                : profile.defaultPricePerQuintal();

        BigDecimal estimatedRevenue = estimatedYield.multiply(price).setScale(2, RoundingMode.HALF_UP);
        BigDecimal estimatedProfit = estimatedRevenue.subtract(totalCost).setScale(2, RoundingMode.HALF_UP);

        BigDecimal profitMargin = BigDecimal.ZERO;
        if (estimatedRevenue.compareTo(BigDecimal.ZERO) > 0) {
            profitMargin = estimatedProfit.multiply(BigDecimal.valueOf(100))
                    .divide(estimatedRevenue, 2, RoundingMode.HALF_UP);
        }

        String status = "BREAK_EVEN";
        if (estimatedProfit.compareTo(BigDecimal.ZERO) > 0) {
            status = "ESTIMATED_PROFIT";
        } else if (estimatedProfit.compareTo(BigDecimal.ZERO) < 0) {
            status = "ESTIMATED_LOSS";
        }

        List<String> assumptions = new ArrayList<>();
        assumptions.add(String.format("Calculations normalized for %.2f acres using standard agricultural economic benchmarks.", area));
        assumptions.add(String.format("Estimated yield baseline: %.1f %s.", profile.defaultYieldPerAcre(), profile.yieldUnit()));
        assumptions.add(String.format("Reference commodity realization: ₹%.2f per Quintal.", price));
        assumptions.add("Cost estimates include land preparation, input consumables, farm labour, machinery, and post-harvest transport.");
        assumptions.add("Important: Actual yield and revenue vary with weather conditions, pest outbreaks, and mandi daily auction dynamics.");

        return new EconomicCalculation(
                totalCost, seedCost, fertilizerCost, cropProtCost, labourCost, machineryCost,
                irrigationCost, landLeaseCost, transportCost, otherCost,
                estimatedYield, profile.yieldUnit(), price, "PER_QUINTAL",
                estimatedRevenue, estimatedProfit, profitMargin, status, assumptions
        );
    }

    public static EconomicCalculation calculateCustomScenario(
            String cropName,
            BigDecimal areaInAcres,
            BigDecimal landRent,
            BigDecimal labourCost,
            BigDecimal seedCost,
            BigDecimal fertilizerCost,
            BigDecimal cropProtectionCost,
            BigDecimal otherCost,
            BigDecimal customYield,
            BigDecimal customPrice) {

        BigDecimal area = areaInAcres != null && areaInAcres.compareTo(BigDecimal.ZERO) > 0 ? areaInAcres : BigDecimal.ONE;

        CropProfileConfig.AgronomicProfile profile = CropProfileConfig.getProfile(cropName)
                .orElse(CropProfileConfig.getProfile("GROUNDNUT").orElseThrow());

        BigDecimal sCost = seedCost != null ? seedCost : profile.seedCostPerAcre().multiply(area);
        BigDecimal fCost = fertilizerCost != null ? fertilizerCost : profile.fertilizerCostPerAcre().multiply(area);
        BigDecimal cpCost = cropProtectionCost != null ? cropProtectionCost : profile.cropProtectionCostPerAcre().multiply(area);
        BigDecimal lCost = labourCost != null ? labourCost : profile.labourCostPerAcre().multiply(area);
        BigDecimal mCost = profile.machineryCostPerAcre().multiply(area);
        BigDecimal iCost = profile.irrigationCostPerAcre().multiply(area);
        BigDecimal rent = landRent != null ? landRent : BigDecimal.ZERO;
        BigDecimal tCost = profile.transportCostPerAcre().multiply(area);
        BigDecimal oCost = otherCost != null ? otherCost : profile.otherCostPerAcre().multiply(area);

        BigDecimal totalCost = sCost.add(fCost).add(cpCost).add(lCost).add(mCost).add(iCost).add(rent).add(tCost).add(oCost)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal yield = customYield != null && customYield.compareTo(BigDecimal.ZERO) > 0
                ? customYield
                : profile.defaultYieldPerAcre().multiply(area);

        BigDecimal price = customPrice != null && customPrice.compareTo(BigDecimal.ZERO) > 0
                ? customPrice
                : profile.defaultPricePerQuintal();

        BigDecimal estimatedRevenue = yield.multiply(price).setScale(2, RoundingMode.HALF_UP);
        BigDecimal estimatedProfit = estimatedRevenue.subtract(totalCost).setScale(2, RoundingMode.HALF_UP);

        BigDecimal profitMargin = BigDecimal.ZERO;
        if (estimatedRevenue.compareTo(BigDecimal.ZERO) > 0) {
            profitMargin = estimatedProfit.multiply(BigDecimal.valueOf(100))
                    .divide(estimatedRevenue, 2, RoundingMode.HALF_UP);
        }

        String status = "BREAK_EVEN";
        if (estimatedProfit.compareTo(BigDecimal.ZERO) > 0) {
            status = "ESTIMATED_PROFIT";
        } else if (estimatedProfit.compareTo(BigDecimal.ZERO) < 0) {
            status = "ESTIMATED_LOSS";
        }

        List<String> assumptions = new ArrayList<>();
        assumptions.add("Custom scenario calculated with farmer-provided parameters.");
        assumptions.add(String.format("Cultivation area: %.2f acres.", area));
        assumptions.add("This is an exploratory scenario simulation without mutating active farm profile or database state.");

        return new EconomicCalculation(
                totalCost, sCost, fCost, cpCost, lCost, mCost,
                iCost, rent, tCost, oCost,
                yield, profile.yieldUnit(), price, "PER_QUINTAL",
                estimatedRevenue, estimatedProfit, profitMargin, status, assumptions
        );
    }
}
