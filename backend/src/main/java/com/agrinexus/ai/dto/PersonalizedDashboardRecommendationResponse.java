package com.agrinexus.ai.dto;

import java.util.List;

public class PersonalizedDashboardRecommendationResponse {

    private String farmerName;
    private String farmLocation;
    private String activeSeason;
    private String weatherSummary;
    private List<ActionCard> urgentActions;
    private List<ActionCard> upcomingMilestones;
    private String marketTrendHighlight;

    public PersonalizedDashboardRecommendationResponse() {
    }

    public PersonalizedDashboardRecommendationResponse(String farmerName, String farmLocation, String activeSeason, String weatherSummary, List<ActionCard> urgentActions, List<ActionCard> upcomingMilestones, String marketTrendHighlight) {
        this.farmerName = farmerName;
        this.farmLocation = farmLocation;
        this.activeSeason = activeSeason;
        this.weatherSummary = weatherSummary;
        this.urgentActions = urgentActions;
        this.upcomingMilestones = upcomingMilestones;
        this.marketTrendHighlight = marketTrendHighlight;
    }

    public static class ActionCard {
        private String title;
        private String category; // FERTILIZER, IRRIGATION, MARKET, PEST_ALERT, HARVEST
        private String priority; // HIGH, MEDIUM, LOW
        private String description;
        private String actionUrl;

        public ActionCard() {
        }

        public ActionCard(String title, String category, String priority, String description, String actionUrl) {
            this.title = title;
            this.category = category;
            this.priority = priority;
            this.description = description;
            this.actionUrl = actionUrl;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getActionUrl() { return actionUrl; }
        public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }
    }

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }

    public String getFarmLocation() { return farmLocation; }
    public void setFarmLocation(String farmLocation) { this.farmLocation = farmLocation; }

    public String getActiveSeason() { return activeSeason; }
    public void setActiveSeason(String activeSeason) { this.activeSeason = activeSeason; }

    public String getWeatherSummary() { return weatherSummary; }
    public void setWeatherSummary(String weatherSummary) { this.weatherSummary = weatherSummary; }

    public List<ActionCard> getUrgentActions() { return urgentActions; }
    public void setUrgentActions(List<ActionCard> urgentActions) { this.urgentActions = urgentActions; }

    public List<ActionCard> getUpcomingMilestones() { return upcomingMilestones; }
    public void setUpcomingMilestones(List<ActionCard> upcomingMilestones) { this.upcomingMilestones = upcomingMilestones; }

    public String getMarketTrendHighlight() { return marketTrendHighlight; }
    public void setMarketTrendHighlight(String marketTrendHighlight) { this.marketTrendHighlight = marketTrendHighlight; }
}
