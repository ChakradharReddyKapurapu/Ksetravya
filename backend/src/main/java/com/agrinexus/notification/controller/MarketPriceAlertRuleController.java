package com.agrinexus.notification.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.notification.dto.MarketPriceAlertRuleRequest;
import com.agrinexus.notification.dto.MarketPriceAlertRuleResponse;
import com.agrinexus.notification.service.MarketPriceAlertRuleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications/price-alerts")
public class MarketPriceAlertRuleController {

    private final MarketPriceAlertRuleService ruleService;

    public MarketPriceAlertRuleController(MarketPriceAlertRuleService ruleService) {
        this.ruleService = ruleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MarketPriceAlertRuleResponse>>> getPriceAlertRules(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<MarketPriceAlertRuleResponse> response = ruleService.getRulesForUser(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Price alert rules retrieved", response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MarketPriceAlertRuleResponse>> createPriceAlertRule(
            @Valid @RequestBody MarketPriceAlertRuleRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        MarketPriceAlertRuleResponse response = ruleService.createRule(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Price alert rule created successfully", response));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<MarketPriceAlertRuleResponse>> updatePriceAlertRule(
            @PathVariable Long id,
            @RequestBody MarketPriceAlertRuleRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        MarketPriceAlertRuleResponse response = ruleService.updateRule(id, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Price alert rule updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePriceAlertRule(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        ruleService.deleteRule(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Price alert rule removed successfully", "OK"));
    }
}
