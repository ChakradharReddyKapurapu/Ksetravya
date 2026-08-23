package com.agrinexus.jobs.service;

import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.jobs.dto.JobRecommendationResponse;
import com.agrinexus.jobs.dto.JobResponse;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WorkerProfile;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.jobs.repository.WorkerProfileRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class JobRecommendationService {

    private final JobRepository jobRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final UserRepository userRepository;

    public JobRecommendationService(JobRepository jobRepository, WorkerProfileRepository workerProfileRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<JobRecommendationResponse> getRecommendedJobs(String workerEmail) {
        User user = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated worker not found"));

        WorkerProfile profile = workerProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> new WorkerProfile(user));

        List<Job> openJobs = jobRepository.findByActiveTrueAndStatus(JobStatus.OPEN);
        List<JobRecommendationResponse> results = new ArrayList<>();

        for (Job job : openJobs) {
            int score = 0;
            List<String> matchedFactors = new ArrayList<>();
            List<String> unmatchedFactors = new ArrayList<>();

            // 1. Preferred Category Match (35 pts)
            if (profile.getPreferredJobTypes() != null && profile.getPreferredJobTypes().contains(job.getCategory())) {
                score += 35;
                matchedFactors.add("Category Match: Worker preferred activity aligns with " + job.getCategory());
            } else {
                unmatchedFactors.add("Category variance: Job categorized as " + job.getCategory());
            }

            // 2. Location Match (25 pts)
            boolean locationMatch = false;
            if (profile.getPreferredLocations() != null && !profile.getPreferredLocations().isEmpty()) {
                for (String loc : profile.getPreferredLocations()) {
                    if (job.getDistrict().equalsIgnoreCase(loc.trim()) || job.getLocation().toLowerCase().contains(loc.toLowerCase().trim())) {
                        locationMatch = true;
                        break;
                    }
                }
            }
            if (locationMatch) {
                score += 25;
                matchedFactors.add("Location Proximity: Field site located in preferred district (" + job.getDistrict() + ")");
            } else {
                score += 10;
                unmatchedFactors.add("Location difference: Work site located in " + job.getDistrict());
            }

            // 3. Skills Match (25 pts)
            if (profile.getSkills() != null && job.getSkills() != null && !job.getSkills().isEmpty()) {
                long matchingSkillsCount = profile.getSkills().stream()
                        .filter(ws -> job.getSkills().stream().anyMatch(js -> js.equalsIgnoreCase(ws.trim()) || js.toLowerCase().contains(ws.toLowerCase().trim())))
                        .count();
                if (matchingSkillsCount > 0) {
                    score += 25;
                    matchedFactors.add("Skill Alignment: " + matchingSkillsCount + " required agricultural operational skills match worker profile");
                } else {
                    unmatchedFactors.add("Skill specifications: " + String.join(", ", job.getSkills()));
                }
            } else {
                score += 15;
            }

            // 4. Wage Alignment (15 pts)
            if (profile.getDailyWageExpectation() != null && profile.getDailyWageExpectation().compareTo(job.getWage()) <= 0) {
                score += 15;
                matchedFactors.add("Wage Compatibility: Offered wage (₹" + job.getWage() + ") meets or exceeds worker expectation");
            } else {
                score += 10;
            }

            score = Math.min(100, Math.max(0, score));

            results.add(new JobRecommendationResponse(
                    JobResponse.fromEntity(job),
                    score,
                    "Rule-based job relevance",
                    matchedFactors,
                    unmatchedFactors
            ));
        }

        results.sort(Comparator.comparingInt(JobRecommendationResponse::getMatchScore).reversed());
        return results;
    }
}
