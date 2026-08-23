package com.agrinexus.notification.service;

import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.notification.dto.NotificationPreferenceRequest;
import com.agrinexus.notification.dto.NotificationPreferenceResponse;
import com.agrinexus.notification.entity.NotificationPreference;
import com.agrinexus.notification.repository.NotificationPreferenceRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationPreferenceService {

    private final NotificationPreferenceRepository preferenceRepository;
    private final UserRepository userRepository;

    public NotificationPreferenceService(NotificationPreferenceRepository preferenceRepository, UserRepository userRepository) {
        this.preferenceRepository = preferenceRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public NotificationPreferenceResponse getPreferences(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        NotificationPreference pref = preferenceRepository.findByUserId(userId)
                .orElseGet(() -> preferenceRepository.save(NotificationPreference.defaultFor(user)));

        return NotificationPreferenceResponse.fromEntity(pref);
    }

    @Transactional
    public NotificationPreferenceResponse updatePreferences(Long userId, NotificationPreferenceRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        NotificationPreference pref = preferenceRepository.findByUserId(userId)
                .orElseGet(() -> NotificationPreference.defaultFor(user));

        if (request.getWeatherAlerts() != null) pref.setWeatherAlerts(request.getWeatherAlerts());
        if (request.getMarketPriceAlerts() != null) pref.setMarketPriceAlerts(request.getMarketPriceAlerts());
        if (request.getJobAlerts() != null) pref.setJobAlerts(request.getJobAlerts());
        if (request.getLandLeaseAlerts() != null) pref.setLandLeaseAlerts(request.getLandLeaseAlerts());
        if (request.getMarketplaceAlerts() != null) pref.setMarketplaceAlerts(request.getMarketplaceAlerts());
        if (request.getCropInsights() != null) pref.setCropInsights(request.getCropInsights());
        if (request.getSystemNotifications() != null) pref.setSystemNotifications(request.getSystemNotifications());

        NotificationPreference saved = preferenceRepository.save(pref);
        return NotificationPreferenceResponse.fromEntity(saved);
    }
}
