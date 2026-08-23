package com.agrinexus.jobs.service;

import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.jobs.dto.WorkerProfileResponse;
import com.agrinexus.jobs.dto.WorkerProfileUpdateRequest;
import com.agrinexus.jobs.entity.WorkerProfile;
import com.agrinexus.jobs.repository.WorkerProfileRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkerProfileService {

    private final WorkerProfileRepository workerProfileRepository;
    private final UserRepository userRepository;

    public WorkerProfileService(WorkerProfileRepository workerProfileRepository, UserRepository userRepository) {
        this.workerProfileRepository = workerProfileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public WorkerProfile getOrCreateProfile(String workerEmail) {
        User user = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return workerProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> workerProfileRepository.save(new WorkerProfile(user)));
    }

    @Transactional(readOnly = true)
    public WorkerProfileResponse getMyProfile(String workerEmail) {
        User user = userRepository.findByEmail(workerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        WorkerProfile profile = workerProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> new WorkerProfile(user));

        return WorkerProfileResponse.fromEntity(profile);
    }

    @Transactional
    public WorkerProfileResponse updateProfile(String workerEmail, WorkerProfileUpdateRequest request) {
        WorkerProfile profile = getOrCreateProfile(workerEmail);

        if (request.getSkills() != null) {
            profile.setSkills(request.getSkills());
        }
        if (request.getExperienceYears() != null) {
            profile.setExperienceYears(request.getExperienceYears());
        }
        if (request.getPreferredJobTypes() != null) {
            profile.setPreferredJobTypes(request.getPreferredJobTypes());
        }
        if (request.getPreferredLocations() != null) {
            profile.setPreferredLocations(request.getPreferredLocations());
        }
        if (request.getAvailability() != null) {
            profile.setAvailability(request.getAvailability());
        }
        if (request.getBio() != null) {
            profile.setBio(request.getBio().trim());
        }
        if (request.getDailyWageExpectation() != null) {
            profile.setDailyWageExpectation(request.getDailyWageExpectation());
        }

        WorkerProfile updated = workerProfileRepository.save(profile);
        return WorkerProfileResponse.fromEntity(updated);
    }
}
