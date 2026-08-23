package com.agrinexus.farm.service;

import com.agrinexus.exception.DuplicateResourceException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.farm.dto.FarmCreateRequest;
import com.agrinexus.farm.dto.FarmResponse;
import com.agrinexus.farm.dto.FarmUpdateRequest;
import com.agrinexus.farm.entity.Farm;
import com.agrinexus.farm.repository.FarmRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FarmService {

    private final FarmRepository farmRepository;
    private final UserRepository userRepository;

    public FarmService(FarmRepository farmRepository, UserRepository userRepository) {
        this.farmRepository = farmRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public FarmResponse getFarmByEmail(String email) {
        Farm farm = farmRepository.findByUserEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("No farm profile found for this account. You can create one via POST /api/farms."));

        return FarmResponse.fromEntity(farm);
    }

    @Transactional
    public FarmResponse createFarm(String email, FarmCreateRequest request) {
        String normalizedEmail = email.toLowerCase().trim();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (farmRepository.existsByUserId(user.getId())) {
            throw new DuplicateResourceException("A farm profile already exists for this account. Use PATCH /api/farms/me to update.");
        }

        Farm farm = Farm.builder()
                .user(user)
                .farmName(request.getFarmName() != null ? request.getFarmName().trim() : user.getFullName() + "'s Farm")
                .location(request.getLocation().trim())
                .district(request.getDistrict() != null ? request.getDistrict().trim() : null)
                .state(request.getState().trim())
                .pincode(request.getPincode() != null ? request.getPincode().trim() : null)
                .area(request.getArea())
                .areaUnit(request.getAreaUnit() != null ? request.getAreaUnit().trim() : "Acres")
                .soilType(request.getSoilType() != null ? request.getSoilType().trim() : null)
                .waterAvailability(request.getWaterAvailability() != null ? request.getWaterAvailability().trim() : null)
                .irrigationType(request.getIrrigationType() != null ? request.getIrrigationType().trim() : null)
                .currentCrop(request.getCurrentCrop() != null ? request.getCurrentCrop().trim() : null)
                .season(request.getSeason() != null ? request.getSeason().trim() : null)
                .build();

        Farm savedFarm = farmRepository.save(farm);
        return FarmResponse.fromEntity(savedFarm);
    }

    @Transactional
    public FarmResponse updateFarm(String email, FarmUpdateRequest request) {
        String normalizedEmail = email.toLowerCase().trim();

        Farm farm = farmRepository.findByUserEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("No farm profile found to update. Create a farm profile first via POST /api/farms."));

        if (request.getFarmName() != null && !request.getFarmName().trim().isEmpty()) {
            farm.setFarmName(request.getFarmName().trim());
        }
        if (request.getLocation() != null && !request.getLocation().trim().isEmpty()) {
            farm.setLocation(request.getLocation().trim());
        }
        if (request.getDistrict() != null && !request.getDistrict().trim().isEmpty()) {
            farm.setDistrict(request.getDistrict().trim());
        }
        if (request.getState() != null && !request.getState().trim().isEmpty()) {
            farm.setState(request.getState().trim());
        }
        if (request.getPincode() != null && !request.getPincode().trim().isEmpty()) {
            farm.setPincode(request.getPincode().trim());
        }
        if (request.getArea() != null && request.getArea() > 0) {
            farm.setArea(request.getArea());
        }
        if (request.getAreaUnit() != null && !request.getAreaUnit().trim().isEmpty()) {
            farm.setAreaUnit(request.getAreaUnit().trim());
        }
        if (request.getSoilType() != null && !request.getSoilType().trim().isEmpty()) {
            farm.setSoilType(request.getSoilType().trim());
        }
        if (request.getWaterAvailability() != null && !request.getWaterAvailability().trim().isEmpty()) {
            farm.setWaterAvailability(request.getWaterAvailability().trim());
        }
        if (request.getIrrigationType() != null && !request.getIrrigationType().trim().isEmpty()) {
            farm.setIrrigationType(request.getIrrigationType().trim());
        }
        if (request.getCurrentCrop() != null && !request.getCurrentCrop().trim().isEmpty()) {
            farm.setCurrentCrop(request.getCurrentCrop().trim());
        }
        if (request.getSeason() != null && !request.getSeason().trim().isEmpty()) {
            farm.setSeason(request.getSeason().trim());
        }

        Farm updatedFarm = farmRepository.save(farm);
        return FarmResponse.fromEntity(updatedFarm);
    }
}
