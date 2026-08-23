package com.agrinexus.seeds.dto;

import java.util.ArrayList;
import java.util.List;

public class SeedRecommendationResponse {

    private SeedResponse seed;
    private Integer score;
    private String label = "Rule-based suitability score";
    private String disclaimer = "Indicative suitability based on configured farm context and agronomic parameters. Not guaranteed agricultural advice.";
    private List<String> matchedFactors = new ArrayList<>();
    private List<String> unmatchedFactors = new ArrayList<>();

    public SeedRecommendationResponse() {
    }

    public SeedRecommendationResponse(SeedResponse seed, Integer score, String label, String disclaimer, List<String> matchedFactors, List<String> unmatchedFactors) {
        this.seed = seed;
        this.score = score;
        this.label = label != null ? label : "Rule-based suitability score";
        this.disclaimer = disclaimer != null ? disclaimer : "Indicative suitability based on configured farm context and agronomic parameters. Not guaranteed agricultural advice.";
        this.matchedFactors = matchedFactors != null ? matchedFactors : new ArrayList<>();
        this.unmatchedFactors = unmatchedFactors != null ? unmatchedFactors : new ArrayList<>();
    }

    public SeedResponse getSeed() { return seed; }
    public void setSeed(SeedResponse seed) { this.seed = seed; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
    public List<String> getMatchedFactors() { return matchedFactors; }
    public void setMatchedFactors(List<String> matchedFactors) { this.matchedFactors = matchedFactors; }
    public List<String> getUnmatchedFactors() { return unmatchedFactors; }
    public void setUnmatchedFactors(List<String> unmatchedFactors) { this.unmatchedFactors = unmatchedFactors; }
}
