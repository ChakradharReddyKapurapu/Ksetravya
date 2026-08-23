package com.agrinexus.market.client;

import com.agrinexus.market.entity.MarketPrice;

import java.time.LocalDate;
import java.util.List;

public interface MarketPriceProvider {

    List<MarketPrice> fetchCurrentPrices(String commodity, String district, String state);

    List<MarketPrice> fetchHistoricalPrices(String commodity, String market, LocalDate from, LocalDate to);
}
