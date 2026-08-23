package com.agrinexus.tools.dto;

import com.agrinexus.tools.entity.RentalRequestStatus;
import com.agrinexus.tools.entity.ToolRentalRequest;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ToolRentalResponse {

    private Long id;
    private Long toolId;
    private String toolName;
    private String toolCategory;
    private String toolLocation;
    private String toolImageUrl;
    private BigDecimal pricePerDay;

    private Long renterId;
    private String renterName;
    private String renterEmail;
    private String renterPhone;

    private Long ownerId;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Integer requestedDays;
    private String message;
    private BigDecimal totalAmount;
    private BigDecimal securityDeposit;
    private RentalRequestStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public ToolRentalResponse() {
    }

    public ToolRentalResponse(Long id, Long toolId, String toolName, String toolCategory, String toolLocation, String toolImageUrl, BigDecimal pricePerDay, Long renterId, String renterName, String renterEmail, String renterPhone, Long ownerId, String ownerName, String ownerEmail, String ownerPhone, LocalDate startDate, LocalDate endDate, Integer requestedDays, String message, BigDecimal totalAmount, BigDecimal securityDeposit, RentalRequestStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.toolId = toolId;
        this.toolName = toolName;
        this.toolCategory = toolCategory;
        this.toolLocation = toolLocation;
        this.toolImageUrl = toolImageUrl;
        this.pricePerDay = pricePerDay;
        this.renterId = renterId;
        this.renterName = renterName;
        this.renterEmail = renterEmail;
        this.renterPhone = renterPhone;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.ownerPhone = ownerPhone;
        this.startDate = startDate;
        this.endDate = endDate;
        this.requestedDays = requestedDays;
        this.message = message;
        this.totalAmount = totalAmount;
        this.securityDeposit = securityDeposit;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ToolRentalResponse fromEntity(ToolRentalRequest request) {
        if (request == null) return null;
        return new ToolRentalResponse(
                request.getId(),
                request.getTool() != null ? request.getTool().getId() : null,
                request.getTool() != null ? request.getTool().getName() : null,
                request.getTool() != null && request.getTool().getCategory() != null ? request.getTool().getCategory().name() : null,
                request.getTool() != null ? request.getTool().getLocation() : null,
                request.getTool() != null ? request.getTool().getImageUrl() : null,
                request.getTool() != null ? request.getTool().getPricePerDay() : null,
                request.getRenter() != null ? request.getRenter().getId() : null,
                request.getRenter() != null ? request.getRenter().getFullName() : null,
                request.getRenter() != null ? request.getRenter().getEmail() : null,
                request.getRenter() != null ? request.getRenter().getPhone() : null,
                request.getOwner() != null ? request.getOwner().getId() : null,
                request.getOwner() != null ? request.getOwner().getFullName() : null,
                request.getOwner() != null ? request.getOwner().getEmail() : null,
                request.getOwner() != null ? request.getOwner().getPhone() : null,
                request.getStartDate(),
                request.getEndDate(),
                request.getRequestedDays(),
                request.getMessage(),
                request.getTotalAmount(),
                request.getSecurityDeposit(),
                request.getStatus(),
                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getToolId() { return toolId; }
    public void setToolId(Long toolId) { this.toolId = toolId; }
    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
    public String getToolCategory() { return toolCategory; }
    public void setToolCategory(String toolCategory) { this.toolCategory = toolCategory; }
    public String getToolLocation() { return toolLocation; }
    public void setToolLocation(String toolLocation) { this.toolLocation = toolLocation; }
    public String getToolImageUrl() { return toolImageUrl; }
    public void setToolImageUrl(String toolImageUrl) { this.toolImageUrl = toolImageUrl; }
    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }
    public Long getRenterId() { return renterId; }
    public void setRenterId(Long renterId) { this.renterId = renterId; }
    public String getRenterName() { return renterName; }
    public void setRenterName(String renterName) { this.renterName = renterName; }
    public String getRenterEmail() { return renterEmail; }
    public void setRenterEmail(String renterEmail) { this.renterEmail = renterEmail; }
    public String getRenterPhone() { return renterPhone; }
    public void setRenterPhone(String renterPhone) { this.renterPhone = renterPhone; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
    public String getOwnerPhone() { return ownerPhone; }
    public void setOwnerPhone(String ownerPhone) { this.ownerPhone = ownerPhone; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public Integer getRequestedDays() { return requestedDays; }
    public void setRequestedDays(Integer requestedDays) { this.requestedDays = requestedDays; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public BigDecimal getSecurityDeposit() { return securityDeposit; }
    public void setSecurityDeposit(BigDecimal securityDeposit) { this.securityDeposit = securityDeposit; }
    public RentalRequestStatus getStatus() { return status; }
    public void setStatus(RentalRequestStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
