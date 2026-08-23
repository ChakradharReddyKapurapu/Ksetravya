package com.agrinexus.jobs.dto;

import java.util.ArrayList;
import java.util.List;

public class JobRecommendationResponse {

    private JobResponse job;
    private Integer matchScore;
    private String label = "Rule-based job relevance";
    private List<String> matchedFactors = new ArrayList<>();
    private List<String> unmatchedFactors = new ArrayList<>();

    public JobRecommendationResponse() {
    }

    public JobRecommendationResponse(JobResponse job, Integer matchScore, String label, List<String> matchedFactors, List<String> unmatchedFactors) {
        this.job = job;
        this.matchScore = matchScore;
        this.label = label != null ? label : "Rule-based job relevance";
        this.matchedFactors = matchedFactors != null ? matchedFactors : new ArrayList<>();
        this.unmatchedFactors = unmatchedFactors != null ? unmatchedFactors : new ArrayList<>();
    }

    public JobResponse getJob() { return job; }
    public void setJob(JobResponse job) { this.job = job; }
    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public List<String> getMatchedFactors() { return matchedFactors; }
    public void setMatchedFactors(List<String> matchedFactors) { this.matchedFactors = matchedFactors; }
    public List<String> getUnmatchedFactors() { return unmatchedFactors; }
    public void setUnmatchedFactors(List<String> unmatchedFactors) { this.unmatchedFactors = unmatchedFactors; }
}
