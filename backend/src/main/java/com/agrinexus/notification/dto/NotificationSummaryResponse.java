package com.agrinexus.notification.dto;

public class NotificationSummaryResponse {

    private long totalUnread;
    private long highPriorityUnread;
    private NotificationResponse latestNotification;

    public NotificationSummaryResponse() {
    }

    public NotificationSummaryResponse(long totalUnread, long highPriorityUnread, NotificationResponse latestNotification) {
        this.totalUnread = totalUnread;
        this.highPriorityUnread = highPriorityUnread;
        this.latestNotification = latestNotification;
    }

    public long getTotalUnread() { return totalUnread; }
    public void setTotalUnread(long totalUnread) { this.totalUnread = totalUnread; }
    public long getHighPriorityUnread() { return highPriorityUnread; }
    public void setHighPriorityUnread(long highPriorityUnread) { this.highPriorityUnread = highPriorityUnread; }
    public NotificationResponse getLatestNotification() { return latestNotification; }
    public void setLatestNotification(NotificationResponse latestNotification) { this.latestNotification = latestNotification; }
}
