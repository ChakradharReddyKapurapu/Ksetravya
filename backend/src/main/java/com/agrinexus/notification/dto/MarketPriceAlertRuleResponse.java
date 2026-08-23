package com.agrinexus.notification.dto;

import com.agrinexus.notification.entity.MarketPriceAlertRule;
import com.agrinexus.notification.entity.PriceAlertDirection;

import java.math.BigDecimal;
import java.time.Instant;

public class MarketPriceAlertRuleResponse {

    private Long id;
    private String commodity;
    private String market;
    private BigDecimal targetPrice;
    private PriceAlertDirection direction;
    private boolean enabled;
    private BigDecimal lastTriggeredPrice;
    private Instant lastTriggeredAt;
    private Instant createdAt;

    public MarketPriceAlertRuleResponse() {
    }

    public MarketPriceAlertRuleResponse(Long id, String commodity, String market, BigDecimal targetPrice, PriceAlertDirection direction, boolean enabled, BigDecimal lastTriggeredPrice, Instant lastTriggeredAt, Instant createdAt) {
        this.id = id;
        this.commodity = commodity;
        this.market = market;
        this.targetPrice = targetPrice;
        this.direction = direction;
        this.enabled = enabled;
        this.lastTriggeredPrice = lastTriggeredPrice;
        this.lastTriggeredAt = lastTriggeredAt;
        this.createdAt = createdAt;
    }

    public static MarketPriceAlertRuleResponse fromEntity(MarketPriceAlertRule r) {
        if (r == null) return null;
        return new MarketPriceAlertRuleResponse(
                r.getId(),
                r.getCommodity(),
                r.getMarket(),
                r.getTargetPrice(),
                r.getDirection(),
                r.isEnabled(),
                r.getLastTriggeredPrice(),
                r.getLastTriggeredAt(),
                r.getCreatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public String getMarket() { return market; }
    public void setMarket(String market) { this.market = market; }
    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }
    public PriceAlertDirection getDirection() { return direction; }
    public void setDirection(PriceAlertDirection direction) { this.direction = direction; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public BigDecimal getLastTriggeredPrice() { return lastTriggeredPrice; }
    public void setLastTriggeredPrice(BigDecimal lastTriggeredPrice) { this.lastTriggeredPrice = lastTriggeredPrice; }
    public Instant getLastTriggeredAt() { return lastTriggeredAt; }
    public void setLastTriggeredAt(Instant lastTriggeredAt) { this.lastTriggeredAt = lastTriggeredAt; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
