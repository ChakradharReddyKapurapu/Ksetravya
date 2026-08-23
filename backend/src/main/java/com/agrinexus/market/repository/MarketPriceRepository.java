package com.agrinexus.market.repository;

import com.agrinexus.market.entity.MarketPrice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long>, JpaSpecificationExecutor<MarketPrice> {

    Optional<MarketPrice> findByIdAndActiveTrue(Long id);

    List<MarketPrice> findByCommodityIgnoreCaseAndMarketIgnoreCaseAndPriceDateBetweenAndActiveTrueOrderByPriceDateAsc(
            String commodity, String market, LocalDate from, LocalDate to
    );

    List<MarketPrice> findByCommodityIgnoreCaseAndPriceDateBetweenAndActiveTrueOrderByPriceDateAsc(
            String commodity, LocalDate from, LocalDate to
    );

    List<MarketPrice> findByCommodityIgnoreCaseAndActiveTrueOrderByPriceDateDesc(String commodity);

    List<MarketPrice> findByDistrictIgnoreCaseAndActiveTrueOrderByPriceDateDesc(String district);

    @Query("SELECT DISTINCT m.commodity FROM MarketPrice m WHERE m.active = true")
    List<String> findDistinctCommodities();

    @Query("SELECT m FROM MarketPrice m WHERE LOWER(m.commodity) = LOWER(:commodity) AND m.active = true ORDER BY m.priceDate DESC")
    List<MarketPrice> findLatestByCommodity(@Param("commodity") String commodity, Pageable pageable);
}
