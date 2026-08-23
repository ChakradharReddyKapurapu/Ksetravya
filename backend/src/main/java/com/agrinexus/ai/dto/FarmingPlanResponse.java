package com.agrinexus.ai.dto;

import java.util.List;

public class FarmingPlanResponse {

    private String cropName;
    private Integer totalDurationDays;
    private List<PlanStage> stages;
    private String planSummary;

    public FarmingPlanResponse() {
    }

    public FarmingPlanResponse(String cropName, Integer totalDurationDays, List<PlanStage> stages, String planSummary) {
        this.cropName = cropName;
        this.totalDurationDays = totalDurationDays;
        this.stages = stages;
        this.planSummary = planSummary;
    }

    public static class PlanStage {
        private String stageName; // E.g., Land Preparation, Sowing, Weed Control, Harvesting
        private Integer startDay;
        private Integer endDay;
        private List<String> activities;
        private String requiredInputs;

        public PlanStage() {
        }

        public PlanStage(String stageName, Integer startDay, Integer endDay, List<String> activities, String requiredInputs) {
            this.stageName = stageName;
            this.startDay = startDay;
            this.endDay = endDay;
            this.activities = activities;
            this.requiredInputs = requiredInputs;
        }

        public String getStageName() { return stageName; }
        public void setStageName(String stageName) { this.stageName = stageName; }

        public Integer getStartDay() { return startDay; }
        public void setStartDay(Integer startDay) { this.startDay = startDay; }

        public Integer getEndDay() { return endDay; }
        public void setEndDay(Integer endDay) { this.endDay = endDay; }

        public List<String> getActivities() { return activities; }
        public void setActivities(List<String> activities) { this.activities = activities; }

        public String getRequiredInputs() { return requiredInputs; }
        public void setRequiredInputs(String requiredInputs) { this.requiredInputs = requiredInputs; }
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public Integer getTotalDurationDays() { return totalDurationDays; }
    public void setTotalDurationDays(Integer totalDurationDays) { this.totalDurationDays = totalDurationDays; }

    public List<PlanStage> getStages() { return stages; }
    public void setStages(List<PlanStage> stages) { this.stages = stages; }

    public String getPlanSummary() { return planSummary; }
    public void setPlanSummary(String planSummary) { this.planSummary = planSummary; }
}
