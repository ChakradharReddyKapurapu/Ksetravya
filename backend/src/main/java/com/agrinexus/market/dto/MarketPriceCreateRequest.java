package com.agrinexus.market.dto;

import com.agrinexus.market.entity.PriceUnit;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MarketPriceCreateRequest {

    @NotBlank(message = "Commodity name is required")
    @Size(max = 100, message = "Commodity must not exceed 100 characters")
    private String commodity;

    @Size(max = 100, message = "Variety must not exceed 100 characters")
    private String variety;

    @NotBlank(message = "Market name is required")
    @Size(max = 150, message = "Market must not exceed 150 characters")
    private String market;

    @NotBlank(message = "District is required")
    @Size(max = 100, message = "District must not exceed 100 characters")
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @NotNull(message = "Minimum price is required")
    @PositiveOrZero(message = "Minimum price must be positive or zero")
    private BigDecimal minimumPrice;

    @NotNull(message = "Maximum price is required")
    @PositiveOrZero(message = "Maximum price must be positive or zero")
    private BigDecimal maximumPrice;

    @NotNull(message = "Modal price is required")
    @PositiveOrZero(message = "Modal price must be positive or zero")
    private BigDecimal modalPrice;

    @NotNull(message = "Unit is required")
    private PriceUnit unit = PriceUnit.PER_QUINTAL;

    @NotNull(message = "Price date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate priceDate;

    @Size(max = 150, message = "Source must not exceed 150 characters")
    private String source;

    @Size(max = 100, message = "Volume must not exceed 100 characters")
    private String volume;

    public MarketPriceCreateRequest() {
    }

    public MarketPriceCreateRequest(String commodity, String variety, String market, String district, String state, BigDecimal minimumPrice, BigDecimal maximumPrice, BigDecimal modalPrice, PriceUnit unit, LocalDate priceDate, String source, String volume) {
        this.commodity = commodity;
        this.variety = variety;
        this.market = market;
        this.district = district;
        this.state = state;
        this.minimumPrice = minimumPrice;
        this.maximumPrice = maximumPrice;
        this.modalPrice = modalPrice;
        this.unit = unit != null ? unit : PriceUnit.PER_QUINTAL;
        this.priceDate = priceDate;
        this.source = source;
        this.volume = volume;
    }

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
}
