package com.agrinexus.land.dto;

import com.agrinexus.land.entity.LeaseApplication;
import com.agrinexus.land.entity.LeaseApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LeaseApplicationResponse {

    private Long id;
    private Long parcelId;
    private String parcelTitle;
    private BigDecimal parcelAcreage;
    private LandFarmerSummary farmer;
    private String proposedCrop;
    private String preferredTenure;
    private String message;
    private BigDecimal offeredRentPerAcre;
    private LeaseApplicationStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime appliedAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public LeaseApplicationResponse() {
    }

    public LeaseApplicationResponse(Long id, Long parcelId, String parcelTitle, BigDecimal parcelAcreage, LandFarmerSummary farmer, String proposedCrop, String preferredTenure, String message, BigDecimal offeredRentPerAcre, LeaseApplicationStatus status, LocalDateTime appliedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.parcelId = parcelId;
        this.parcelTitle = parcelTitle;
        this.parcelAcreage = parcelAcreage;
        this.farmer = farmer;
        this.proposedCrop = proposedCrop;
        this.preferredTenure = preferredTenure;
        this.message = message;
        this.offeredRentPerAcre = offeredRentPerAcre;
        this.status = status;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
    }

    public static LeaseApplicationResponse fromEntity(LeaseApplication la) {
        if (la == null) return null;
        return new LeaseApplicationResponse(
                la.getId(),
                la.getParcel() != null ? la.getParcel().getId() : null,
                la.getParcel() != null ? la.getParcel().getTitle() : null,
                la.getParcel() != null ? la.getParcel().getAcreage() : null,
                LandFarmerSummary.fromEntity(la.getFarmer()),
                la.getProposedCrop(),
                la.getPreferredTenure(),
                la.getMessage(),
                la.getOfferedRentPerAcre(),
                la.getStatus(),
                la.getAppliedAt(),
                la.getUpdatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getParcelId() { return parcelId; }
    public void setParcelId(Long parcelId) { this.parcelId = parcelId; }
    public String getParcelTitle() { return parcelTitle; }
    public void setParcelTitle(String parcelTitle) { this.parcelTitle = parcelTitle; }
    public BigDecimal getParcelAcreage() { return parcelAcreage; }
    public void setParcelAcreage(BigDecimal parcelAcreage) { this.parcelAcreage = parcelAcreage; }
    public LandFarmerSummary getFarmer() { return farmer; }
    public void setFarmer(LandFarmerSummary farmer) { this.farmer = farmer; }
    public String getProposedCrop() { return proposedCrop; }
    public void setProposedCrop(String proposedCrop) { this.proposedCrop = proposedCrop; }
    public String getPreferredTenure() { return preferredTenure; }
    public void setPreferredTenure(String preferredTenure) { this.preferredTenure = preferredTenure; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public BigDecimal getOfferedRentPerAcre() { return offeredRentPerAcre; }
    public void setOfferedRentPerAcre(BigDecimal offeredRentPerAcre) { this.offeredRentPerAcre = offeredRentPerAcre; }
    public LeaseApplicationStatus getStatus() { return status; }
    public void setStatus(LeaseApplicationStatus status) { this.status = status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
