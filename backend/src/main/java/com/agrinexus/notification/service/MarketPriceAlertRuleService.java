package com.agrinexus.notification.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.notification.dto.MarketPriceAlertRuleRequest;
import com.agrinexus.notification.dto.MarketPriceAlertRuleResponse;
import com.agrinexus.notification.entity.MarketPriceAlertRule;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.entity.PriceAlertDirection;
import com.agrinexus.notification.repository.MarketPriceAlertRuleRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MarketPriceAlertRuleService {

    private final MarketPriceAlertRuleRepository ruleRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public MarketPriceAlertRuleService(MarketPriceAlertRuleRepository ruleRepository, NotificationService notificationService, UserRepository userRepository) {
        this.ruleRepository = ruleRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<MarketPriceAlertRuleResponse> getRulesForUser(Long userId) {
        return ruleRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(MarketPriceAlertRuleResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public MarketPriceAlertRuleResponse createRule(Long userId, MarketPriceAlertRuleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (request.getTargetPrice() == null || request.getTargetPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Target price must be greater than 0.");
        }

        MarketPriceAlertRule rule = MarketPriceAlertRule.builder()
                .user(user)
                .commodity(request.getCommodity().trim().toUpperCase())
                .market(request.getMarket() != null ? request.getMarket().trim() : null)
                .targetPrice(request.getTargetPrice())
                .direction(request.getDirection() != null ? request.getDirection() : PriceAlertDirection.ABOVE)
                .enabled(request.getEnabled() != null ? request.getEnabled() : true)
                .build();

        MarketPriceAlertRule saved = ruleRepository.save(rule);
        return MarketPriceAlertRuleResponse.fromEntity(saved);
    }

    @Transactional
    public MarketPriceAlertRuleResponse updateRule(Long id, Long userId, MarketPriceAlertRuleRequest request) {
        MarketPriceAlertRule rule = ruleRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Price alert rule not found with ID: " + id));

        if (request.getCommodity() != null && !request.getCommodity().trim().isEmpty()) {
            rule.setCommodity(request.getCommodity().trim().toUpperCase());
        }
        if (request.getMarket() != null) {
            rule.setMarket(request.getMarket().trim());
        }
        if (request.getTargetPrice() != null) {
            if (request.getTargetPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new BadRequestException("Target price must be greater than 0.");
            }
            rule.setTargetPrice(request.getTargetPrice());
        }
        if (request.getDirection() != null) {
            rule.setDirection(request.getDirection());
        }
        if (request.getEnabled() != null) {
            rule.setEnabled(request.getEnabled());
        }

        MarketPriceAlertRule saved = ruleRepository.save(rule);
        return MarketPriceAlertRuleResponse.fromEntity(saved);
    }

    @Transactional
    public void deleteRule(Long id, Long userId) {
        MarketPriceAlertRule rule = ruleRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Price alert rule not found with ID: " + id));

        ruleRepository.delete(rule);
    }

    @Transactional
    public void evaluatePriceAlerts(String commodity, BigDecimal currentPrice, String marketName) {
        if (commodity == null || currentPrice == null) return;

        List<MarketPriceAlertRule> rules = ruleRepository.findByCommodityIgnoreCaseAndEnabledTrue(commodity.trim());

        for (MarketPriceAlertRule rule : rules) {
            boolean triggered = false;
            BigDecimal lastPrice = rule.getLastTriggeredPrice();

            if (rule.getDirection() == PriceAlertDirection.ABOVE) {
                // Crossing event ABOVE target price
                if (currentPrice.compareTo(rule.getTargetPrice()) >= 0) {
                    if (lastPrice == null || lastPrice.compareTo(rule.getTargetPrice()) < 0) {
                        triggered = true;
                    }
                }
            } else if (rule.getDirection() == PriceAlertDirection.BELOW) {
                // Crossing event BELOW target price
                if (currentPrice.compareTo(rule.getTargetPrice()) <= 0) {
                    if (lastPrice == null || lastPrice.compareTo(rule.getTargetPrice()) > 0) {
                        triggered = true;
                    }
                }
            }

            if (triggered) {
                rule.setLastTriggeredPrice(currentPrice);
                rule.setLastTriggeredAt(Instant.now());
                ruleRepository.save(rule);

                String directionText = rule.getDirection() == PriceAlertDirection.ABOVE ? "climbed above" : "dropped below";
                String title = String.format("Mandi Alert: %s %s ₹%.2f", rule.getCommodity(), directionText, rule.getTargetPrice());
                String message = String.format("Current modal trading price for %s reached ₹%.2f in %s.",
                        rule.getCommodity(), currentPrice, marketName != null ? marketName : "regional APMC yard");

                String idempotencyKey = String.format("PRICE_ALERT:%d:%s:%.2f:%s",
                        rule.getUser().getId(), rule.getCommodity(), rule.getTargetPrice(), Instant.now().toString().substring(0, 10));

                notificationService.createNotification(
                        rule.getUser().getId(),
                        title,
                        message,
                        NotificationType.MARKET_PRICE,
                        NotificationPriority.HIGH,
                        "MARKET",
                        null,
                        Instant.now().plusSeconds(86400 * 3), // expires in 3 days
                        idempotencyKey
                );
            }
        }
    }
}
