package com.agrinexus.admin.dto;

import java.util.List;

public class AdminDashboardResponse {

    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;

    private long totalFarmers;
    private long totalWorkers;
    private long totalCoordinators;
    private long totalAdmins;

    private long totalJobs;
    private long activeJobs;
    private long completedJobs;

    private long totalLandListings;
    private long activeLandListings;
    private long activeLeases;

    private long totalProducts;
    private long activeProducts;
    private long totalOrders;

    private long unreadSystemIssues;
    private List<AuditLogResponse> recentActivity;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(long totalUsers, long activeUsers, long inactiveUsers, long totalFarmers, long totalWorkers, long totalCoordinators, long totalAdmins, long totalJobs, long activeJobs, long completedJobs, long totalLandListings, long activeLandListings, long activeLeases, long totalProducts, long activeProducts, long totalOrders, long unreadSystemIssues, List<AuditLogResponse> recentActivity) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.inactiveUsers = inactiveUsers;
        this.totalFarmers = totalFarmers;
        this.totalWorkers = totalWorkers;
        this.totalCoordinators = totalCoordinators;
        this.totalAdmins = totalAdmins;
        this.totalJobs = totalJobs;
        this.activeJobs = activeJobs;
        this.completedJobs = completedJobs;
        this.totalLandListings = totalLandListings;
        this.activeLandListings = activeLandListings;
        this.activeLeases = activeLeases;
        this.totalProducts = totalProducts;
        this.activeProducts = activeProducts;
        this.totalOrders = totalOrders;
        this.unreadSystemIssues = unreadSystemIssues;
        this.recentActivity = recentActivity;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(long activeUsers) { this.activeUsers = activeUsers; }
    public long getInactiveUsers() { return inactiveUsers; }
    public void setInactiveUsers(long inactiveUsers) { this.inactiveUsers = inactiveUsers; }
    public long getTotalFarmers() { return totalFarmers; }
    public void setTotalFarmers(long totalFarmers) { this.totalFarmers = totalFarmers; }
    public long getTotalWorkers() { return totalWorkers; }
    public void setTotalWorkers(long totalWorkers) { this.totalWorkers = totalWorkers; }
    public long getTotalCoordinators() { return totalCoordinators; }
    public void setTotalCoordinators(long totalCoordinators) { this.totalCoordinators = totalCoordinators; }
    public long getTotalAdmins() { return totalAdmins; }
    public void setTotalAdmins(long totalAdmins) { this.totalAdmins = totalAdmins; }
    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }
    public long getActiveJobs() { return activeJobs; }
    public void setActiveJobs(long activeJobs) { this.activeJobs = activeJobs; }
    public long getCompletedJobs() { return completedJobs; }
    public void setCompletedJobs(long completedJobs) { this.completedJobs = completedJobs; }
    public long getTotalLandListings() { return totalLandListings; }
    public void setTotalLandListings(long totalLandListings) { this.totalLandListings = totalLandListings; }
    public long getActiveLandListings() { return activeLandListings; }
    public void setActiveLandListings(long activeLandListings) { this.activeLandListings = activeLandListings; }
    public long getActiveLeases() { return activeLeases; }
    public void setActiveLeases(long activeLeases) { this.activeLeases = activeLeases; }
    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }
    public long getActiveProducts() { return activeProducts; }
    public void setActiveProducts(long activeProducts) { this.activeProducts = activeProducts; }
    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
    public long getUnreadSystemIssues() { return unreadSystemIssues; }
    public void setUnreadSystemIssues(long unreadSystemIssues) { this.unreadSystemIssues = unreadSystemIssues; }
    public List<AuditLogResponse> getRecentActivity() { return recentActivity; }
    public void setRecentActivity(List<AuditLogResponse> recentActivity) { this.recentActivity = recentActivity; }
}
