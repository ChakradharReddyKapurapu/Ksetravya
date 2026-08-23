package com.agrinexus.ai.service;

import com.agrinexus.ai.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AISafetyValidationService {

    private static final Logger log = LoggerFactory.getLogger(AISafetyValidationService.class);

    private static final String MANDATORY_SAFETY_DISCLAIMER =
            "Disclaimer: AI recommendations are decision-support tools based on agronomic models and regional market data. Consult your local Krishi Vigyan Kendra (KVK) or agricultural extension officer before large-scale application.";

    public CropRecommendationResponse validateCropRecommendation(CropRecommendationResponse response) {
        if (response == null) return response;
        response.setSafetyNotice(MANDATORY_SAFETY_DISCLAIMER);
        return response;
    }

    public FertilizerGuidanceResponse validateFertilizerGuidance(FertilizerGuidanceResponse response) {
        if (response == null) return response;
        if (response.getDosages() != null) {
            for (FertilizerGuidanceResponse.FertilizerDosage dosage : response.getDosages()) {
                // Validate safe upper limits for chemical fertilizers
                if ("Urea".equalsIgnoreCase(dosage.getFertilizerName()) && dosage.getQuantityKg() != null) {
                    if (dosage.getQuantityKg().doubleValue() > 300.0) {
                        log.warn("Excessive Urea dosage detected and capped: {} kg", dosage.getQuantityKg());
                        dosage.setQuantityKg(new java.math.BigDecimal("200.0"));
                    }
                }
            }
        }
        response.setSafetyNotice(MANDATORY_SAFETY_DISCLAIMER);
        return response;
    }

    public AgriQueryResponse validateAgriQuery(AgriQueryResponse response) {
        if (response == null) return response;
        response.setSafetyNotice(MANDATORY_SAFETY_DISCLAIMER);
        return response;
    }

    public CropHealthAnalysisResponse validateCropHealthAnalysis(CropHealthAnalysisResponse response) {
        if (response == null) return response;
        response.setSafetyNotice(MANDATORY_SAFETY_DISCLAIMER);
        return response;
    }
}
