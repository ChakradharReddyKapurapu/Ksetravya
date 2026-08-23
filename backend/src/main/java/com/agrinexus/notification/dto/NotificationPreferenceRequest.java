package com.agrinexus.notification.dto;

import com.agrinexus.notification.entity.NotificationPreference;

public class NotificationPreferenceRequest {

    private Boolean weatherAlerts;
    private Boolean marketPriceAlerts;
    private Boolean jobAlerts;
    private Boolean landLeaseAlerts;
    private Boolean marketplaceAlerts;
    private Boolean cropInsights;
    private Boolean systemNotifications;

    public NotificationPreferenceRequest() {
    }

    public NotificationPreferenceRequest(Boolean weatherAlerts, Boolean marketPriceAlerts, Boolean jobAlerts, Boolean landLeaseAlerts, Boolean marketplaceAlerts, Boolean cropInsights, Boolean systemNotifications) {
        this.weatherAlerts = weatherAlerts;
        this.marketPriceAlerts = marketPriceAlerts;
        this.jobAlerts = jobAlerts;
        this.landLeaseAlerts = landLeaseAlerts;
        this.marketplaceAlerts = marketplaceAlerts;
        this.cropInsights = cropInsights;
        this.systemNotifications = systemNotifications;
    }

    public Boolean getWeatherAlerts() { return weatherAlerts; }
    public void setWeatherAlerts(Boolean weatherAlerts) { this.weatherAlerts = weatherAlerts; }
    public Boolean getMarketPriceAlerts() { return marketPriceAlerts; }
    public void setMarketPriceAlerts(Boolean marketPriceAlerts) { this.marketPriceAlerts = marketPriceAlerts; }
    public Boolean getJobAlerts() { return jobAlerts; }
    public void setJobAlerts(Boolean jobAlerts) { this.jobAlerts = jobAlerts; }
    public Boolean getLandLeaseAlerts() { return landLeaseAlerts; }
    public void setLandLeaseAlerts(Boolean landLeaseAlerts) { this.landLeaseAlerts = landLeaseAlerts; }
    public Boolean getMarketplaceAlerts() { return marketplaceAlerts; }
    public void setMarketplaceAlerts(Boolean marketplaceAlerts) { this.marketplaceAlerts = marketplaceAlerts; }
    public Boolean getCropInsights() { return cropInsights; }
    public void setCropInsights(Boolean cropInsights) { this.cropInsights = cropInsights; }
    public Boolean getSystemNotifications() { return systemNotifications; }
    public void setSystemNotifications(Boolean systemNotifications) { this.systemNotifications = systemNotifications; }
}
