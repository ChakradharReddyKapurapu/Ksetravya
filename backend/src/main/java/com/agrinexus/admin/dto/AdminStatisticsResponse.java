package com.agrinexus.admin.dto;

public class AdminStatisticsResponse {

    private UserGrowthResponse userGrowth;
    private JobStatisticsResponse jobStats;
    private MarketplaceStatisticsResponse marketplaceStats;
    private LandStatisticsResponse landStats;
    private NotificationStatisticsResponse notificationStats;

    public AdminStatisticsResponse() {
    }

    public AdminStatisticsResponse(UserGrowthResponse userGrowth, JobStatisticsResponse jobStats, MarketplaceStatisticsResponse marketplaceStats, LandStatisticsResponse landStats, NotificationStatisticsResponse notificationStats) {
        this.userGrowth = userGrowth;
        this.jobStats = jobStats;
        this.marketplaceStats = marketplaceStats;
        this.landStats = landStats;
        this.notificationStats = notificationStats;
    }

    public UserGrowthResponse getUserGrowth() { return userGrowth; }
    public void setUserGrowth(UserGrowthResponse userGrowth) { this.userGrowth = userGrowth; }
    public JobStatisticsResponse getJobStats() { return jobStats; }
    public void setJobStats(JobStatisticsResponse jobStats) { this.jobStats = jobStats; }
    public MarketplaceStatisticsResponse getMarketplaceStats() { return marketplaceStats; }
    public void setMarketplaceStats(MarketplaceStatisticsResponse marketplaceStats) { this.marketplaceStats = marketplaceStats; }
    public LandStatisticsResponse getLandStats() { return landStats; }
    public void setLandStats(LandStatisticsResponse landStats) { this.landStats = landStats; }
    public NotificationStatisticsResponse getNotificationStats() { return notificationStats; }
    public void setNotificationStats(NotificationStatisticsResponse notificationStats) { this.notificationStats = notificationStats; }
}
