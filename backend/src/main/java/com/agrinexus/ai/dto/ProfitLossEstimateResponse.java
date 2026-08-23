package com.agrinexus.ai.dto;

import java.math.BigDecimal;

public class ProfitLossEstimateResponse {

    private String cropName;
    private BigDecimal farmAreaAcres;
    private BigDecimal seedCost;
    private BigDecimal fertilizerCost;
    private BigDecimal laborCost;
    private BigDecimal machineryCost;
    private BigDecimal totalEstimatedCost;
    private BigDecimal grossRevenue;
    private BigDecimal netProfit;
    private BigDecimal returnOnInvestmentPercentage;
    private String financialSummary;

    public ProfitLossEstimateResponse() {
    }

    public ProfitLossEstimateResponse(String cropName, BigDecimal farmAreaAcres, BigDecimal seedCost, BigDecimal fertilizerCost, BigDecimal laborCost, BigDecimal machineryCost, BigDecimal totalEstimatedCost, BigDecimal grossRevenue, BigDecimal netProfit, BigDecimal returnOnInvestmentPercentage, String financialSummary) {
        this.cropName = cropName;
        this.farmAreaAcres = farmAreaAcres;
        this.seedCost = seedCost;
        this.fertilizerCost = fertilizerCost;
        this.laborCost = laborCost;
        this.machineryCost = machineryCost;
        this.totalEstimatedCost = totalEstimatedCost;
        this.grossRevenue = grossRevenue;
        this.netProfit = netProfit;
        this.returnOnInvestmentPercentage = returnOnInvestmentPercentage;
        this.financialSummary = financialSummary;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public BigDecimal getFarmAreaAcres() { return farmAreaAcres; }
    public void setFarmAreaAcres(BigDecimal farmAreaAcres) { this.farmAreaAcres = farmAreaAcres; }

    public BigDecimal getSeedCost() { return seedCost; }
    public void setSeedCost(BigDecimal seedCost) { this.seedCost = seedCost; }

    public BigDecimal getFertilizerCost() { return fertilizerCost; }
    public void setFertilizerCost(BigDecimal fertilizerCost) { this.fertilizerCost = fertilizerCost; }

    public BigDecimal getLaborCost() { return laborCost; }
    public void setLaborCost(BigDecimal laborCost) { this.laborCost = laborCost; }

    public BigDecimal getMachineryCost() { return machineryCost; }
    public void setMachineryCost(BigDecimal machineryCost) { this.machineryCost = machineryCost; }

    public BigDecimal getTotalEstimatedCost() { return totalEstimatedCost; }
    public void setTotalEstimatedCost(BigDecimal totalEstimatedCost) { this.totalEstimatedCost = totalEstimatedCost; }

    public BigDecimal getGrossRevenue() { return grossRevenue; }
    public void setGrossRevenue(BigDecimal grossRevenue) { this.grossRevenue = grossRevenue; }

    public BigDecimal getNetProfit() { return netProfit; }
    public void setNetProfit(BigDecimal netProfit) { this.netProfit = netProfit; }

    public BigDecimal getReturnOnInvestmentPercentage() { return returnOnInvestmentPercentage; }
    public void setReturnOnInvestmentPercentage(BigDecimal returnOnInvestmentPercentage) { this.returnOnInvestmentPercentage = returnOnInvestmentPercentage; }

    public String getFinancialSummary() { return financialSummary; }
    public void setFinancialSummary(String financialSummary) { this.financialSummary = financialSummary; }
}
