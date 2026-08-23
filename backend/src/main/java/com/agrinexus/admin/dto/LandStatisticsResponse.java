package com.agrinexus.admin.dto;

public class LandStatisticsResponse {

    private long totalListings;
    private long activeListings;
    private long leasedListings;
    private long availableListings;

    public LandStatisticsResponse() {
    }

    public LandStatisticsResponse(long totalListings, long activeListings, long leasedListings, long availableListings) {
        this.totalListings = totalListings;
        this.activeListings = activeListings;
        this.leasedListings = leasedListings;
        this.availableListings = availableListings;
    }

    public long getTotalListings() { return totalListings; }
    public void setTotalListings(long totalListings) { this.totalListings = totalListings; }
    public long getActiveListings() { return activeListings; }
    public void setActiveListings(long activeListings) { this.activeListings = activeListings; }
    public long getLeasedListings() { return leasedListings; }
    public void setLeasedListings(long leasedListings) { this.leasedListings = leasedListings; }
    public long getAvailableListings() { return availableListings; }
    public void setAvailableListings(long availableListings) { this.availableListings = availableListings; }
}
