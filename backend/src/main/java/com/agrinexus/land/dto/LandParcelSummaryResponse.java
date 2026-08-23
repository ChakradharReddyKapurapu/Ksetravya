package com.agrinexus.land.dto;

import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.WaterSourceType;

import java.math.BigDecimal;

public class LandParcelSummaryResponse {

    private Long id;
    private String title;
    private String location;
    private String district;
    private String state;
    private BigDecimal acreage;
    private LandSoilType soilType;
    private String soilTypeName;
    private WaterSourceType waterSource;
    private BigDecimal annualRentPerAcre;
    private BigDecimal totalAnnualRent;
    private LandStatus status;

    public LandParcelSummaryResponse() {
    }

    public LandParcelSummaryResponse(Long id, String title, String location, String district, String state, BigDecimal acreage, LandSoilType soilType, String soilTypeName, WaterSourceType waterSource, BigDecimal annualRentPerAcre, BigDecimal totalAnnualRent, LandStatus status) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.district = district;
        this.state = state;
        this.acreage = acreage;
        this.soilType = soilType;
        this.soilTypeName = soilTypeName;
        this.waterSource = waterSource;
        this.annualRentPerAcre = annualRentPerAcre;
        this.totalAnnualRent = totalAnnualRent;
        this.status = status;
    }

    public static LandParcelSummaryResponse fromEntity(LandParcel lp) {
        if (lp == null) return null;
        return new LandParcelSummaryResponse(
                lp.getId(),
                lp.getTitle(),
                lp.getLocation(),
                lp.getDistrict(),
                lp.getState(),
                lp.getAcreage(),
                lp.getSoilType(),
                lp.getSoilTypeName(),
                lp.getWaterSource(),
                lp.getAnnualRentPerAcre(),
                lp.getTotalAnnualRent(),
                lp.getStatus()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public BigDecimal getAcreage() { return acreage; }
    public void setAcreage(BigDecimal acreage) { this.acreage = acreage; }
    public LandSoilType getSoilType() { return soilType; }
    public void setSoilType(LandSoilType soilType) { this.soilType = soilType; }
    public String getSoilTypeName() { return soilTypeName; }
    public void setSoilTypeName(String soilTypeName) { this.soilTypeName = soilTypeName; }
    public WaterSourceType getWaterSource() { return waterSource; }
    public void setWaterSource(WaterSourceType waterSource) { this.waterSource = waterSource; }
    public BigDecimal getAnnualRentPerAcre() { return annualRentPerAcre; }
    public void setAnnualRentPerAcre(BigDecimal annualRentPerAcre) { this.annualRentPerAcre = annualRentPerAcre; }
    public BigDecimal getTotalAnnualRent() { return totalAnnualRent; }
    public void setTotalAnnualRent(BigDecimal totalAnnualRent) { this.totalAnnualRent = totalAnnualRent; }
    public LandStatus getStatus() { return status; }
    public void setStatus(LandStatus status) { this.status = status; }
}
