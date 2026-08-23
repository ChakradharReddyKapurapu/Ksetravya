package com.agrinexus.ai.dto;

import java.util.List;

public class AgriQueryResponse {

    private String query;
    private String answer;
    private List<String> keyActionSteps;
    private List<String> recommendedProducts;
    private String safetyNotice;

    public AgriQueryResponse() {
    }

    public AgriQueryResponse(String query, String answer, List<String> keyActionSteps, List<String> recommendedProducts, String safetyNotice) {
        this.query = query;
        this.answer = answer;
        this.keyActionSteps = keyActionSteps;
        this.recommendedProducts = recommendedProducts;
        this.safetyNotice = safetyNotice;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public List<String> getKeyActionSteps() { return keyActionSteps; }
    public void setKeyActionSteps(List<String> keyActionSteps) { this.keyActionSteps = keyActionSteps; }

    public List<String> getRecommendedProducts() { return recommendedProducts; }
    public void setRecommendedProducts(List<String> recommendedProducts) { this.recommendedProducts = recommendedProducts; }

    public String getSafetyNotice() { return safetyNotice; }
    public void setSafetyNotice(String safetyNotice) { this.safetyNotice = safetyNotice; }
}
