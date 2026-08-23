package com.agrinexus.admin.dto;

public class JobStatisticsResponse {

    private long created;
    private long open;
    private long filled;
    private long inProgress;
    private long completed;
    private long cancelled;

    public JobStatisticsResponse() {
    }

    public JobStatisticsResponse(long created, long open, long filled, long inProgress, long completed, long cancelled) {
        this.created = created;
        this.open = open;
        this.filled = filled;
        this.inProgress = inProgress;
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public long getCreated() { return created; }
    public void setCreated(long created) { this.created = created; }
    public long getOpen() { return open; }
    public void setOpen(long open) { this.open = open; }
    public long getFilled() { return filled; }
    public void setFilled(long filled) { this.filled = filled; }
    public long getInProgress() { return inProgress; }
    public void setInProgress(long inProgress) { this.inProgress = inProgress; }
    public long getCompleted() { return completed; }
    public void setCompleted(long completed) { this.completed = completed; }
    public long getCancelled() { return cancelled; }
    public void setCancelled(long cancelled) { this.cancelled = cancelled; }
}
