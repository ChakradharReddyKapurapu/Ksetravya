package com.agrinexus.admin.dto;

import java.util.List;

public class UserGrowthResponse {

    private String timeframe;
    private long totalNewUsers;
    private List<DailyGrowthPoint> points;

    public UserGrowthResponse() {
    }

    public UserGrowthResponse(String timeframe, long totalNewUsers, List<DailyGrowthPoint> points) {
        this.timeframe = timeframe;
        this.totalNewUsers = totalNewUsers;
        this.points = points;
    }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }
    public long getTotalNewUsers() { return totalNewUsers; }
    public void setTotalNewUsers(long totalNewUsers) { this.totalNewUsers = totalNewUsers; }
    public List<DailyGrowthPoint> getPoints() { return points; }
    public void setPoints(List<DailyGrowthPoint> points) { this.points = points; }

    public static class DailyGrowthPoint {
        private String date;
        private long newUsers;

        public DailyGrowthPoint() {
        }

        public DailyGrowthPoint(String date, long newUsers) {
            this.date = date;
            this.newUsers = newUsers;
        }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public long getNewUsers() { return newUsers; }
        public void setNewUsers(long newUsers) { this.newUsers = newUsers; }
    }
}
