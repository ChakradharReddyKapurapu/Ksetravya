package com.agrinexus.market.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.market.cache.MarketPriceCacheManager;
import com.agrinexus.market.client.MarketPriceProvider;
import com.agrinexus.market.config.MarketPriceProperties;
import com.agrinexus.market.dto.*;
import com.agrinexus.market.entity.MarketPrice;
import com.agrinexus.market.repository.MarketPriceRepository;
import com.agrinexus.market.repository.MarketPriceSpecification;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MarketPriceService {

    private final MarketPriceRepository marketPriceRepository;
    private final MarketPriceProvider marketPriceProvider;
    private final MarketPriceCacheManager cacheManager;
    private final MarketPriceProperties properties;
    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final com.agrinexus.notification.service.MarketPriceAlertRuleService priceAlertRuleService;

    public MarketPriceService(MarketPriceRepository marketPriceRepository, MarketPriceProvider marketPriceProvider, MarketPriceCacheManager cacheManager, MarketPriceProperties properties, UserRepository userRepository, FarmRepository farmRepository, com.agrinexus.notification.service.MarketPriceAlertRuleService priceAlertRuleService) {
        this.marketPriceRepository = marketPriceRepository;
        this.marketPriceProvider = marketPriceProvider;
        this.cacheManager = cacheManager;
        this.properties = properties;
        this.userRepository = userRepository;
        this.farmRepository = farmRepository;
        this.priceAlertRuleService = priceAlertRuleService;
    }

    @Transactional(readOnly = true)
    public Page<MarketPriceResponse> getMarketPrices(
            String commodity,
            String variety,
            String market,
            String district,
            String state,
            LocalDate date,
            Pageable pageable) {

        Specification<MarketPrice> spec = MarketPriceSpecification.filter(
                null, commodity, variety, market, district, state, date
        );

        return marketPriceRepository.findAll(spec, pageable).map(MarketPriceResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public Page<MarketPriceResponse> searchMarketPrices(String query, Pageable pageable) {
        Specification<MarketPrice> spec = MarketPriceSpecification.filter(
                query, null, null, null, null, null, null
        );
        return marketPriceRepository.findAll(spec, pageable).map(MarketPriceResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public MarketPriceResponse getMarketPriceById(Long id) {
        MarketPrice mp = marketPriceRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Market price record not found with ID: " + id));

        return MarketPriceResponse.fromEntity(mp);
    }

    @Transactional(readOnly = true)
    public List<MarketPriceResponse> getCurrentPriceForCrop(String commodity) {
        if (commodity == null || commodity.trim().isEmpty()) {
            throw new BadRequestException("Commodity name must be specified.");
        }

        String cacheKey = "crop_" + commodity.trim().toLowerCase();
        Optional<List<MarketPriceResponse>> cached = cacheManager.get(cacheKey, properties.getCacheTtlMinutes());
        if (cached.isPresent()) {
            return cached.get();
        }

        List<MarketPriceResponse> results = marketPriceRepository
                .findByCommodityIgnoreCaseAndActiveTrueOrderByPriceDateDesc(commodity.trim())
                .stream()
                .limit(20)
                .map(MarketPriceResponse::fromEntity)
                .collect(Collectors.toList());

        cacheManager.put(cacheKey, results);
        return results;
    }

    @Transactional(readOnly = true)
    public List<MarketPriceResponse> getLocationMarketPrices(String district, String state) {
        if (district == null || district.trim().isEmpty()) {
            throw new BadRequestException("District must be specified.");
        }

        String cacheKey = "loc_" + district.trim().toLowerCase();
        Optional<List<MarketPriceResponse>> cached = cacheManager.get(cacheKey, properties.getCacheTtlMinutes());
        if (cached.isPresent()) {
            return cached.get();
        }

        List<MarketPriceResponse> results = marketPriceRepository
                .findByDistrictIgnoreCaseAndActiveTrueOrderByPriceDateDesc(district.trim())
                .stream()
                .limit(30)
                .map(MarketPriceResponse::fromEntity)
                .collect(Collectors.toList());

        cacheManager.put(cacheKey, results);
        return results;
    }

    @Transactional(readOnly = true)
    public List<MarketPriceResponse> getHistoricalPrices(String commodity, String market, LocalDate from, LocalDate to) {
        if (commodity == null || commodity.trim().isEmpty()) {
            throw new BadRequestException("Commodity name must be specified.");
        }
        if (from != null && to != null && from.isAfter(to)) {
            throw new BadRequestException("Start date ('from') must not be after end date ('to').");
        }

        LocalDate startDate = from != null ? from : LocalDate.now().minusMonths(6);
        LocalDate endDate = to != null ? to : LocalDate.now();

        return marketPriceProvider.fetchHistoricalPrices(commodity.trim(), market, startDate, endDate)
                .stream()
                .map(MarketPriceResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MarketPriceTrendResponse getPriceTrend(String commodity, String market, String period) {
        if (commodity == null || commodity.trim().isEmpty()) {
            throw new BadRequestException("Commodity name must be specified.");
        }

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = switch (period != null ? period.toUpperCase().trim() : "90D") {
            case "30D", "30DAYS" -> endDate.minusDays(30);
            case "60D", "60DAYS" -> endDate.minusDays(60);
            case "180D", "6M" -> endDate.minusMonths(6);
            case "1Y", "365D" -> endDate.minusYears(1);
            case "ALL" -> endDate.minusYears(5);
            default -> endDate.minusDays(90); // 90D default
        };

        List<MarketPrice> records = marketPriceProvider.fetchHistoricalPrices(commodity.trim(), market, startDate, endDate);

        if (records.isEmpty()) {
            return new MarketPriceTrendResponse(
                    commodity,
                    market != null ? market : "Statewide Mandis",
                    period != null ? period : "90D",
                    BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO,
                    "neutral",
                    Collections.emptyList(),
                    "APMC Mandi Registry"
            );
        }

        List<MarketPriceTrendPoint> points = records.stream()
                .map(r -> new MarketPriceTrendPoint(r.getPriceDate(), r.getModalPrice(), r.getMinimumPrice(), r.getMaximumPrice()))
                .collect(Collectors.toList());

        BigDecimal startPrice = points.get(0).getModalPrice();
        BigDecimal endPrice = points.get(points.size() - 1).getModalPrice();

        BigDecimal minPrice = points.stream().map(MarketPriceTrendPoint::getMinPrice).min(BigDecimal::compareTo).orElse(startPrice);
        BigDecimal maxPrice = points.stream().map(MarketPriceTrendPoint::getMaxPrice).max(BigDecimal::compareTo).orElse(endPrice);

        BigDecimal sum = points.stream().map(MarketPriceTrendPoint::getModalPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal averagePrice = sum.divide(BigDecimal.valueOf(points.size()), 2, RoundingMode.HALF_UP);

        BigDecimal percentageChange = BigDecimal.ZERO;
        String direction = "neutral";
        if (startPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal diff = endPrice.subtract(startPrice);
            percentageChange = diff.multiply(BigDecimal.valueOf(100)).divide(startPrice, 2, RoundingMode.HALF_UP);
            if (percentageChange.compareTo(BigDecimal.ZERO) > 0) {
                direction = "up";
            } else if (percentageChange.compareTo(BigDecimal.ZERO) < 0) {
                direction = "down";
            }
        }

        return new MarketPriceTrendResponse(
                commodity,
                market != null ? market : "Average across Mandis",
                period != null ? period : "90D",
                startPrice,
                endPrice,
                minPrice,
                maxPrice,
                averagePrice,
                percentageChange,
                direction,
                points,
                "APMC Mandi Registry (" + records.get(0).getSource() + ")"
        );
    }

    @Transactional(readOnly = true)
    public MarketPriceComparisonResponse getMarketPriceComparison(String commodity, String district, String state) {
        if (commodity == null || commodity.trim().isEmpty()) {
            throw new BadRequestException("Commodity name must be specified.");
        }

        Specification<MarketPrice> spec = MarketPriceSpecification.filter(
                null, commodity, null, null, district, state, null
        );

        List<MarketPrice> records = marketPriceRepository.findAll(spec, Sort.by(Sort.Direction.DESC, "priceDate"));

        // Deduplicate to latest record per market
        Map<String, MarketPrice> latestPerMarket = new LinkedHashMap<>();
        for (MarketPrice mp : records) {
            latestPerMarket.putIfAbsent(mp.getMarket(), mp);
        }

        List<MarketPriceComparisonItem> items = latestPerMarket.values().stream()
                .map(mp -> new MarketPriceComparisonItem(
                        mp.getMarket(),
                        mp.getDistrict(),
                        mp.getState(),
                        mp.getMinimumPrice(),
                        mp.getMaximumPrice(),
                        mp.getModalPrice(),
                        mp.getUnit(),
                        mp.getPriceDate(),
                        mp.getSource()
                ))
                .collect(Collectors.toList());

        String lowestMarket = items.stream().min(Comparator.comparing(MarketPriceComparisonItem::getModalPrice)).map(MarketPriceComparisonItem::getMarket).orElse("N/A");
        String highestMarket = items.stream().max(Comparator.comparing(MarketPriceComparisonItem::getModalPrice)).map(MarketPriceComparisonItem::getMarket).orElse("N/A");

        return new MarketPriceComparisonResponse(
                commodity,
                records.isEmpty() ? "Standard" : records.get(0).getVariety(),
                district != null ? district : (state != null ? state : "Statewide"),
                items,
                lowestMarket,
                highestMarket
        );
    }

    @Transactional(readOnly = true)
    public List<MarketPriceSummaryResponse> getMarketPriceSummary() {
        String cacheKey = "market_summary";
        Optional<List<MarketPriceSummaryResponse>> cached = cacheManager.get(cacheKey, properties.getCacheTtlMinutes());
        if (cached.isPresent()) {
            return cached.get();
        }

        List<String> commodities = marketPriceRepository.findDistinctCommodities();
        List<MarketPriceSummaryResponse> summaries = new ArrayList<>();

        for (String comm : commodities) {
            List<MarketPrice> latestTwo = marketPriceRepository.findLatestByCommodity(comm, PageRequest.of(0, 2));
            if (!latestTwo.isEmpty()) {
                MarketPrice latest = latestTwo.get(0);
                MarketPrice prev = latestTwo.size() > 1 ? latestTwo.get(1) : latest;

                BigDecimal change = latest.getModalPrice().subtract(prev.getModalPrice());
                BigDecimal pctChange = BigDecimal.ZERO;
                String direction = "neutral";
                if (prev.getModalPrice().compareTo(BigDecimal.ZERO) > 0) {
                    pctChange = change.multiply(BigDecimal.valueOf(100)).divide(prev.getModalPrice(), 2, RoundingMode.HALF_UP);
                    if (pctChange.compareTo(BigDecimal.ZERO) > 0) direction = "up";
                    else if (pctChange.compareTo(BigDecimal.ZERO) < 0) direction = "down";
                }

                summaries.add(new MarketPriceSummaryResponse(
                        latest.getCommodity(),
                        latest.getModalPrice(),
                        prev.getModalPrice(),
                        change,
                        pctChange,
                        direction,
                        latest.getUnit(),
                        latest.getPriceDate(),
                        latest.getMarket(),
                        latest.getSource()
                ));
            }
        }

        cacheManager.put(cacheKey, summaries);
        return summaries;
    }

    @Transactional(readOnly = true)
    public List<MarketPriceResponse> getFarmMarketPrices(String farmerEmail) {
        User user = userRepository.findByEmail(farmerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated farmer not found"));

        Farm farm = farmRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Farm profile not configured for user. Please setup farm profile first."));

        String crop = farm.getCurrentCrop();
        String district = farm.getDistrict();

        List<MarketPrice> records = new ArrayList<>();
        if (crop != null && !crop.trim().isEmpty()) {
            records = marketPriceRepository.findByCommodityIgnoreCaseAndActiveTrueOrderByPriceDateDesc(crop.trim());
        }

        if (records.isEmpty() && district != null && !district.trim().isEmpty()) {
            records = marketPriceRepository.findByDistrictIgnoreCaseAndActiveTrueOrderByPriceDateDesc(district.trim());
        }

        if (records.isEmpty()) {
            records = marketPriceRepository.findAll(PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "priceDate"))).getContent();
        }

        return records.stream().limit(15).map(MarketPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public MarketPriceResponse createMarketPrice(MarketPriceCreateRequest request) {
        MarketPrice mp = MarketPrice.builder()
                .commodity(request.getCommodity().trim())
                .variety(request.getVariety() != null ? request.getVariety().trim() : null)
                .market(request.getMarket().trim())
                .district(request.getDistrict().trim())
                .state(request.getState().trim())
                .minimumPrice(request.getMinimumPrice())
                .maximumPrice(request.getMaximumPrice())
                .modalPrice(request.getModalPrice())
                .unit(request.getUnit())
                .priceDate(request.getPriceDate())
                .source(request.getSource() != null ? request.getSource().trim() : "APMC Mandi Registry")
                .volume(request.getVolume() != null ? request.getVolume().trim() : null)
                .active(true)
                .build();

        MarketPrice saved = marketPriceRepository.save(mp);
        cacheManager.clear();

        // Evaluate price alerts asynchronously / safely
        try {
            priceAlertRuleService.evaluatePriceAlerts(saved.getCommodity(), saved.getModalPrice(), saved.getMarket());
        } catch (Exception ignored) {}

        return MarketPriceResponse.fromEntity(saved);
    }
}
