package com.agrinexus.seeds.dto;

import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import com.agrinexus.seeds.entity.Seed;
import com.agrinexus.seeds.entity.SeedAvailabilityStatus;

import java.math.BigDecimal;

public class SeedSummaryResponse {

    private Long id;
    private String name;
    private CropType crop;
    private String variety;
    private String brand;
    private SeasonType season;
    private Integer durationDays;
    private BigDecimal price;
    private String priceUnit;
    private SeedAvailabilityStatus availabilityStatus;
    private String imageUrl;

    public SeedSummaryResponse() {
    }

    public SeedSummaryResponse(Long id, String name, CropType crop, String variety, String brand, SeasonType season, Integer durationDays, BigDecimal price, String priceUnit, SeedAvailabilityStatus availabilityStatus, String imageUrl) {
        this.id = id;
        this.name = name;
        this.crop = crop;
        this.variety = variety;
        this.brand = brand;
        this.season = season;
        this.durationDays = durationDays;
        this.price = price;
        this.priceUnit = priceUnit;
        this.availabilityStatus = availabilityStatus;
        this.imageUrl = imageUrl;
    }

    public static SeedSummaryResponse fromEntity(Seed seed) {
        if (seed == null) return null;
        return new SeedSummaryResponse(
                seed.getId(),
                seed.getName(),
                seed.getCrop(),
                seed.getVariety(),
                seed.getBrand(),
                seed.getSeason(),
                seed.getDurationDays(),
                seed.getPrice(),
                seed.getPriceUnit(),
                seed.getAvailabilityStatus(),
                seed.getImageUrl()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public CropType getCrop() { return crop; }
    public void setCrop(CropType crop) { this.crop = crop; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public SeasonType getSeason() { return season; }
    public void setSeason(SeasonType season) { this.season = season; }
    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }
    public SeedAvailabilityStatus getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(SeedAvailabilityStatus availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
