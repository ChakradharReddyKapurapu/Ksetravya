package com.agrinexus.market.dto;

import com.agrinexus.market.entity.MarketPrice;
import com.agrinexus.market.entity.PriceUnit;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class MarketPriceResponse {

    private Long id;
    private String commodity;
    private String variety;
    private String market;
    private String district;
    private String state;
    private BigDecimal minimumPrice;
    private BigDecimal maximumPrice;
    private BigDecimal modalPrice;
    private PriceUnit unit;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate priceDate;

    private String source;
    private String volume;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    public MarketPriceResponse() {
    }

    public MarketPriceResponse(Long id, String commodity, String variety, String market, String district, String state, BigDecimal minimumPrice, BigDecimal maximumPrice, BigDecimal modalPrice, PriceUnit unit, LocalDate priceDate, String source, String volume, LocalDateTime createdAt) {
        this.id = id;
        this.commodity = commodity;
        this.variety = variety;
        this.market = market;
        this.district = district;
        this.state = state;
        this.minimumPrice = minimumPrice;
        this.maximumPrice = maximumPrice;
        this.modalPrice = modalPrice;
        this.unit = unit;
        this.priceDate = priceDate;
        this.source = source;
        this.volume = volume;
        this.createdAt = createdAt;
    }

    public static MarketPriceResponse fromEntity(MarketPrice mp) {
        if (mp == null) return null;
        return new MarketPriceResponse(
                mp.getId(),
                mp.getCommodity(),
                mp.getVariety(),
                mp.getMarket(),
                mp.getDistrict(),
                mp.getState(),
                mp.getMinimumPrice(),
                mp.getMaximumPrice(),
                mp.getModalPrice(),
                mp.getUnit(),
                mp.getPriceDate(),
                mp.getSource(),
                mp.getVolume(),
                mp.getCreatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public String getMarket() { return market; }
    public void setMarket(String market) { this.market = market; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public BigDecimal getMinimumPrice() { return minimumPrice; }
    public void setMinimumPrice(BigDecimal minimumPrice) { this.minimumPrice = minimumPrice; }
    public BigDecimal getMaximumPrice() { return maximumPrice; }
    public void setMaximumPrice(BigDecimal maximumPrice) { this.maximumPrice = maximumPrice; }
    public BigDecimal getModalPrice() { return modalPrice; }
    public void setModalPrice(BigDecimal modalPrice) { this.modalPrice = modalPrice; }
    public PriceUnit getUnit() { return unit; }
    public void setUnit(PriceUnit unit) { this.unit = unit; }
    public LocalDate getPriceDate() { return priceDate; }
    public void setPriceDate(LocalDate priceDate) { this.priceDate = priceDate; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getVolume() { return volume; }
    public void setVolume(String volume) { this.volume = volume; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
