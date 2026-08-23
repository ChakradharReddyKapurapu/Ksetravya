package com.agrinexus.land.dto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class LeaseApplicationRequest {

    @Size(max = 150, message = "Proposed crop must not exceed 150 characters")
    private String proposedCrop;

    @Size(max = 100, message = "Preferred tenure must not exceed 100 characters")
    private String preferredTenure;

    @Size(max = 1000, message = "Message must not exceed 1000 characters")
    private String message;

    @PositiveOrZero(message = "Offered rent must be positive or zero")
    private BigDecimal offeredRentPerAcre;

    public LeaseApplicationRequest() {
    }

    public LeaseApplicationRequest(String proposedCrop, String preferredTenure, String message, BigDecimal offeredRentPerAcre) {
        this.proposedCrop = proposedCrop;
        this.preferredTenure = preferredTenure;
        this.message = message;
        this.offeredRentPerAcre = offeredRentPerAcre;
    }

    public String getProposedCrop() { return proposedCrop; }
    public void setProposedCrop(String proposedCrop) { this.proposedCrop = proposedCrop; }
    public String getPreferredTenure() { return preferredTenure; }
    public void setPreferredTenure(String preferredTenure) { this.preferredTenure = preferredTenure; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public BigDecimal getOfferedRentPerAcre() { return offeredRentPerAcre; }
    public void setOfferedRentPerAcre(BigDecimal offeredRentPerAcre) { this.offeredRentPerAcre = offeredRentPerAcre; }
}
