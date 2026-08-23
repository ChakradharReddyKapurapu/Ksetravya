package com.agrinexus.market.client;

import com.agrinexus.market.entity.MarketPrice;
import com.agrinexus.market.repository.MarketPriceRepository;
import com.agrinexus.market.repository.MarketPriceSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DatabaseMarketPriceProvider implements MarketPriceProvider {

    private final MarketPriceRepository marketPriceRepository;

    public DatabaseMarketPriceProvider(MarketPriceRepository marketPriceRepository) {
        this.marketPriceRepository = marketPriceRepository;
    }

    @Override
    public List<MarketPrice> fetchCurrentPrices(String commodity, String district, String state) {
        Specification<MarketPrice> spec = MarketPriceSpecification.filter(
                null, commodity, null, null, district, state, null
        );
        return marketPriceRepository.findAll(spec);
    }

    @Override
    public List<MarketPrice> fetchHistoricalPrices(String commodity, String market, LocalDate from, LocalDate to) {
        if (market != null && !market.trim().isEmpty() && !"all".equalsIgnoreCase(market.trim())) {
            return marketPriceRepository.findByCommodityIgnoreCaseAndMarketIgnoreCaseAndPriceDateBetweenAndActiveTrueOrderByPriceDateAsc(
                    commodity, market, from, to
            );
        } else {
            return marketPriceRepository.findByCommodityIgnoreCaseAndPriceDateBetweenAndActiveTrueOrderByPriceDateAsc(
                    commodity, from, to
            );
        }
    }
}
