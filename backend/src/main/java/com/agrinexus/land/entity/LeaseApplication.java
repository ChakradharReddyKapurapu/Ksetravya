package com.agrinexus.land.entity;

import com.agrinexus.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "land_lease_applications", indexes = {
    @Index(name = "idx_la_parcel", columnList = "parcel_id"),
    @Index(name = "idx_la_farmer", columnList = "farmer_id"),
    @Index(name = "idx_la_status", columnList = "status"),
    @Index(name = "idx_la_applied_at", columnList = "applied_at")
}, uniqueConstraints = {
    @UniqueConstraint(name = "uk_parcel_farmer", columnNames = {"parcel_id", "farmer_id"})
})
public class LeaseApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id", nullable = false)
    private LandParcel parcel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(name = "proposed_crop", length = 150)
    private String proposedCrop;

    @Column(name = "preferred_tenure", length = 100)
    private String preferredTenure;

    @Column(length = 1000)
    private String message;

    @Column(name = "offered_rent_per_acre", precision = 12, scale = 2)
    private BigDecimal offeredRentPerAcre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private LeaseApplicationStatus status = LeaseApplicationStatus.PENDING;

    @CreationTimestamp
    @Column(name = "applied_at", nullable = false, updatable = false)
    private LocalDateTime appliedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public LeaseApplication() {
    }

    public LeaseApplication(LandParcel parcel, User farmer, String proposedCrop, String preferredTenure, String message, BigDecimal offeredRentPerAcre, LeaseApplicationStatus status) {
        this.parcel = parcel;
        this.farmer = farmer;
        this.proposedCrop = proposedCrop;
        this.preferredTenure = preferredTenure;
        this.message = message;
        this.offeredRentPerAcre = offeredRentPerAcre;
        this.status = status != null ? status : LeaseApplicationStatus.PENDING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LandParcel getParcel() { return parcel; }
    public void setParcel(LandParcel parcel) { this.parcel = parcel; }
    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }
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
