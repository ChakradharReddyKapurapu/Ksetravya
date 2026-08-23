package com.agrinexus.market.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.market.dto.*;
import com.agrinexus.market.service.MarketPriceService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/market-prices")
public class MarketPriceController {

    private final MarketPriceService marketPriceService;

    public MarketPriceController(MarketPriceService marketPriceService) {
        this.marketPriceService = marketPriceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<MarketPriceResponse>>> getMarketPrices(
            @RequestParam(required = false) String commodity,
            @RequestParam(required = false) String variety,
            @RequestParam(required = false) String market,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = switch (sort.toLowerCase()) {
            case "priceasc", "price_asc", "pricelow" -> Sort.by(Sort.Direction.ASC, "modalPrice");
            case "pricedesc", "price_desc", "pricehigh" -> Sort.by(Sort.Direction.DESC, "modalPrice");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "priceDate");
            default -> Sort.by(Sort.Direction.DESC, "priceDate");
        };

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<MarketPriceResponse> results = marketPriceService.getMarketPrices(
                commodity, variety, market, district, state, date, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Agricultural market prices retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<MarketPriceResponse>>> searchMarketPrices(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(Sort.Direction.DESC, "priceDate"));
        Page<MarketPriceResponse> results = marketPriceService.searchMarketPrices(query, pageable);
        return ResponseEntity.ok(ApiResponse.success("Market prices search results", results));
    }

    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<MarketPriceResponse>> getMarketPriceById(@PathVariable Long id) {
        MarketPriceResponse response = marketPriceService.getMarketPriceById(id);
        return ResponseEntity.ok(ApiResponse.success("Market price record retrieved", response));
    }

    @GetMapping("/crop/{commodity}")
    public ResponseEntity<ApiResponse<List<MarketPriceResponse>>> getCurrentPriceForCrop(
            @PathVariable String commodity) {

        List<MarketPriceResponse> response = marketPriceService.getCurrentPriceForCrop(commodity);
        return ResponseEntity.ok(ApiResponse.success("Current mandi prices for commodity", response));
    }

    @GetMapping("/location")
    public ResponseEntity<ApiResponse<List<MarketPriceResponse>>> getLocationMarketPrices(
            @RequestParam String district,
            @RequestParam(required = false) String state) {

        List<MarketPriceResponse> response = marketPriceService.getLocationMarketPrices(district, state);
        return ResponseEntity.ok(ApiResponse.success("Location-specific mandi prices retrieved", response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<MarketPriceResponse>>> getHistoricalPrices(
            @RequestParam String commodity,
            @RequestParam(required = false) String market,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<MarketPriceResponse> response = marketPriceService.getHistoricalPrices(commodity, market, from, to);
        return ResponseEntity.ok(ApiResponse.success("Historical market prices retrieved", response));
    }

    @GetMapping("/trend")
    public ResponseEntity<ApiResponse<MarketPriceTrendResponse>> getPriceTrend(
            @RequestParam String commodity,
            @RequestParam(required = false) String market,
            @RequestParam(defaultValue = "90D") String period) {

        MarketPriceTrendResponse response = marketPriceService.getPriceTrend(commodity, market, period);
        return ResponseEntity.ok(ApiResponse.success("Mandi price trend analysis compiled", response));
    }

    @GetMapping("/compare")
    public ResponseEntity<ApiResponse<MarketPriceComparisonResponse>> getMarketPriceComparison(
            @RequestParam String commodity,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state) {

        MarketPriceComparisonResponse response = marketPriceService.getMarketPriceComparison(commodity, district, state);
        return ResponseEntity.ok(ApiResponse.success("Mandi price cross-market comparison compiled", response));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<List<MarketPriceSummaryResponse>>> getMarketPriceSummary() {
        List<MarketPriceSummaryResponse> summaries = marketPriceService.getMarketPriceSummary();
        return ResponseEntity.ok(ApiResponse.success("Market commodity price summaries", summaries));
    }

    @GetMapping("/farm")
    public ResponseEntity<ApiResponse<List<MarketPriceResponse>>> getFarmMarketPrices(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<MarketPriceResponse> response = marketPriceService.getFarmMarketPrices(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Farm-relevant market prices retrieved", response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MarketPriceResponse>> createMarketPrice(
            @Valid @RequestBody MarketPriceCreateRequest request) {

        MarketPriceResponse response = marketPriceService.createMarketPrice(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Market price record recorded successfully", response));
    }
}
