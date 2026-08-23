package com.agrinexus.notification.dto;

import com.agrinexus.notification.entity.NotificationPreference;

public class NotificationPreferenceResponse {

    private boolean weatherAlerts;
    private boolean marketPriceAlerts;
    private boolean jobAlerts;
    private boolean landLeaseAlerts;
    private boolean marketplaceAlerts;
    private boolean cropInsights;
    private boolean systemNotifications;

    public NotificationPreferenceResponse() {
    }

    public NotificationPreferenceResponse(boolean weatherAlerts, boolean marketPriceAlerts, boolean jobAlerts, boolean landLeaseAlerts, boolean marketplaceAlerts, boolean cropInsights, boolean systemNotifications) {
        this.weatherAlerts = weatherAlerts;
        this.marketPriceAlerts = marketPriceAlerts;
        this.jobAlerts = jobAlerts;
        this.landLeaseAlerts = landLeaseAlerts;
        this.marketplaceAlerts = marketplaceAlerts;
        this.cropInsights = cropInsights;
        this.systemNotifications = systemNotifications;
    }

    public static NotificationPreferenceResponse fromEntity(NotificationPreference p) {
        if (p == null) return null;
        return new NotificationPreferenceResponse(
                p.isWeatherAlerts(),
                p.isMarketPriceAlerts(),
                p.isJobAlerts(),
                p.isLandLeaseAlerts(),
                p.isMarketplaceAlerts(),
                p.isCropInsights(),
                p.isSystemNotifications()
        );
    }

    public boolean isWeatherAlerts() { return weatherAlerts; }
    public void setWeatherAlerts(boolean weatherAlerts) { this.weatherAlerts = weatherAlerts; }
    public boolean isMarketPriceAlerts() { return marketPriceAlerts; }
    public void setMarketPriceAlerts(boolean marketPriceAlerts) { this.marketPriceAlerts = marketPriceAlerts; }
    public boolean isJobAlerts() { return jobAlerts; }
    public void setJobAlerts(boolean jobAlerts) { this.jobAlerts = jobAlerts; }
    public boolean isLandLeaseAlerts() { return landLeaseAlerts; }
    public void setLandLeaseAlerts(boolean landLeaseAlerts) { this.landLeaseAlerts = landLeaseAlerts; }
    public boolean isMarketplaceAlerts() { return marketplaceAlerts; }
    public void setMarketplaceAlerts(boolean marketplaceAlerts) { this.marketplaceAlerts = marketplaceAlerts; }
    public boolean isCropInsights() { return cropInsights; }
    public void setCropInsights(boolean cropInsights) { this.cropInsights = cropInsights; }
    public boolean isSystemNotifications() { return systemNotifications; }
    public void setSystemNotifications(boolean systemNotifications) { this.systemNotifications = systemNotifications; }
}
