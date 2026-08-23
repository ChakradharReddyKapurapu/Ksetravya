package com.agrinexus.payment.dto;

import java.math.BigDecimal;
import java.util.List;

public class WorkerEarningsResponse {

    private Long workerId;
    private String workerName;
    private BigDecimal totalEarned;
    private BigDecimal pendingEarnings;
    private Integer completedJobsPaidCount;
    private List<TransactionResponse> recentEarningsTransactions;

    public WorkerEarningsResponse() {
    }

    public WorkerEarningsResponse(Long workerId, String workerName, BigDecimal totalEarned, BigDecimal pendingEarnings, Integer completedJobsPaidCount, List<TransactionResponse> recentEarningsTransactions) {
        this.workerId = workerId;
        this.workerName = workerName;
        this.totalEarned = totalEarned;
        this.pendingEarnings = pendingEarnings;
        this.completedJobsPaidCount = completedJobsPaidCount;
        this.recentEarningsTransactions = recentEarningsTransactions;
    }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public String getWorkerName() { return workerName; }
    public void setWorkerName(String workerName) { this.workerName = workerName; }

    public BigDecimal getTotalEarned() { return totalEarned; }
    public void setTotalEarned(BigDecimal totalEarned) { this.totalEarned = totalEarned; }

    public BigDecimal getPendingEarnings() { return pendingEarnings; }
    public void setPendingEarnings(BigDecimal pendingEarnings) { this.pendingEarnings = pendingEarnings; }

    public Integer getCompletedJobsPaidCount() { return completedJobsPaidCount; }
    public void setCompletedJobsPaidCount(Integer completedJobsPaidCount) { this.completedJobsPaidCount = completedJobsPaidCount; }

    public List<TransactionResponse> getRecentEarningsTransactions() { return recentEarningsTransactions; }
    public void setRecentEarningsTransactions(List<TransactionResponse> recentEarningsTransactions) { this.recentEarningsTransactions = recentEarningsTransactions; }
}
