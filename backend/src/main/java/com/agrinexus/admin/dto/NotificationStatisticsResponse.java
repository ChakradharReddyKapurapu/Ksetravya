package com.agrinexus.admin.dto;

public class NotificationStatisticsResponse {

    private long totalNotifications;
    private long unread;
    private long highPriority;
    private long weatherAlerts;
    private long marketAlerts;
    private long jobAlerts;
    private long landAlerts;

    public NotificationStatisticsResponse() {
    }

    public NotificationStatisticsResponse(long totalNotifications, long unread, long highPriority, long weatherAlerts, long marketAlerts, long jobAlerts, long landAlerts) {
        this.totalNotifications = totalNotifications;
        this.unread = unread;
        this.highPriority = highPriority;
        this.weatherAlerts = weatherAlerts;
        this.marketAlerts = marketAlerts;
        this.jobAlerts = jobAlerts;
        this.landAlerts = landAlerts;
    }

    public long getTotalNotifications() { return totalNotifications; }
    public void setTotalNotifications(long totalNotifications) { this.totalNotifications = totalNotifications; }
    public long getUnread() { return unread; }
    public void setUnread(long unread) { this.unread = unread; }
    public long getHighPriority() { return highPriority; }
    public void setHighPriority(long highPriority) { this.highPriority = highPriority; }
    public long getWeatherAlerts() { return weatherAlerts; }
    public void setWeatherAlerts(long weatherAlerts) { this.weatherAlerts = weatherAlerts; }
    public long getMarketAlerts() { return marketAlerts; }
    public void setMarketAlerts(long marketAlerts) { this.marketAlerts = marketAlerts; }
    public long getJobAlerts() { return jobAlerts; }
    public void setJobAlerts(long jobAlerts) { this.jobAlerts = jobAlerts; }
    public long getLandAlerts() { return landAlerts; }
    public void setLandAlerts(long landAlerts) { this.landAlerts = landAlerts; }
}
