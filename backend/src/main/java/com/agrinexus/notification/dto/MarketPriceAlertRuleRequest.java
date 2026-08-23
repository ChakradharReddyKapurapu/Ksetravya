package com.agrinexus.notification.dto;

import com.agrinexus.notification.entity.PriceAlertDirection;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class MarketPriceAlertRuleRequest {

    @NotBlank(message = "Commodity is required")
    private String commodity;

    private String market;

    @NotNull(message = "Target price is required")
    @DecimalMin(value = "0.01", message = "Target price must be greater than 0")
    private BigDecimal targetPrice;

    @NotNull(message = "Direction is required (ABOVE or BELOW)")
    private PriceAlertDirection direction;

    private Boolean enabled = true;

    public MarketPriceAlertRuleRequest() {
    }

    public MarketPriceAlertRuleRequest(String commodity, String market, BigDecimal targetPrice, PriceAlertDirection direction, Boolean enabled) {
        this.commodity = commodity;
        this.market = market;
        this.targetPrice = targetPrice;
        this.direction = direction;
        this.enabled = enabled != null ? enabled : true;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }
    public String getMarket() { return market; }
    public void setMarket(String market) { this.market = market; }
    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }
    public PriceAlertDirection getDirection() { return direction; }
    public void setDirection(PriceAlertDirection direction) { this.direction = direction; }
    public Boolean getEnabled() { return enabled; }
    public void setEnabled(Boolean enabled) { this.enabled = enabled; }
}
