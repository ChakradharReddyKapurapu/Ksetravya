package com.agrinexus.market.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "market_prices", indexes = {
    @Index(name = "idx_mp_commodity", columnList = "commodity"),
    @Index(name = "idx_mp_market", columnList = "market"),
    @Index(name = "idx_mp_district", columnList = "district"),
    @Index(name = "idx_mp_state", columnList = "state"),
    @Index(name = "idx_mp_price_date", columnList = "price_date"),
    @Index(name = "idx_mp_comm_date", columnList = "commodity, price_date")
})
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String commodity;

    @Column(length = 100)
    private String variety;

    @Column(nullable = false, length = 150)
    private String market;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "minimum_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal minimumPrice;

    @Column(name = "maximum_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal maximumPrice;

    @Column(name = "modal_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal modalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PriceUnit unit = PriceUnit.PER_QUINTAL;

    @Column(name = "price_date", nullable = false)
    private LocalDate priceDate;

    @Column(length = 150)
    private String source;

    @Column(length = 100)
    private String volume;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public MarketPrice() {
    }

    public MarketPrice(Long id, String commodity, String variety, String market, String district, String state, BigDecimal minimumPrice, BigDecimal maximumPrice, BigDecimal modalPrice, PriceUnit unit, LocalDate priceDate, String source, String volume, Boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
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
        this.source = source != null ? source : "APMC Mandi Registry";
        this.volume = volume;
        this.active = active != null ? active : true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String commodity;
        private String variety;
        private String market;
        private String district;
        private String state;
        private BigDecimal minimumPrice;
        private BigDecimal maximumPrice;
        private BigDecimal modalPrice;
        private PriceUnit unit = PriceUnit.PER_QUINTAL;
        private LocalDate priceDate;
        private String source = "APMC Mandi Registry";
        private String volume;
        private Boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder commodity(String commodity) { this.commodity = commodity; return this; }
        public Builder variety(String variety) { this.variety = variety; return this; }
        public Builder market(String market) { this.market = market; return this; }
        public Builder district(String district) { this.district = district; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder minimumPrice(BigDecimal minimumPrice) { this.minimumPrice = minimumPrice; return this; }
        public Builder maximumPrice(BigDecimal maximumPrice) { this.maximumPrice = maximumPrice; return this; }
        public Builder modalPrice(BigDecimal modalPrice) { this.modalPrice = modalPrice; return this; }
        public Builder unit(PriceUnit unit) { this.unit = unit; return this; }
        public Builder priceDate(LocalDate priceDate) { this.priceDate = priceDate; return this; }
        public Builder source(String source) { this.source = source; return this; }
        public Builder volume(String volume) { this.volume = volume; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public MarketPrice build() {
            return new MarketPrice(id, commodity, variety, market, district, state, minimumPrice, maximumPrice, modalPrice, unit, priceDate, source, volume, active, createdAt, updatedAt);
        }
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
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
