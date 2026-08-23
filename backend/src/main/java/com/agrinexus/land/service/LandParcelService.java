package com.agrinexus.land.service;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.land.dto.LandParcelCreateRequest;
import com.agrinexus.land.dto.LandParcelResponse;
import com.agrinexus.land.dto.LandParcelUpdateRequest;
import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.WaterSourceType;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.land.repository.LandParcelSpecification;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LandParcelService {

    private final LandParcelRepository landParcelRepository;
    private final UserRepository userRepository;

    public LandParcelService(LandParcelRepository landParcelRepository, UserRepository userRepository) {
        this.landParcelRepository = landParcelRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<LandParcelResponse> getAllLandParcels(
            String query,
            String soilTypeStr,
            String waterSourceStr,
            String district,
            String state,
            BigDecimal minAcreage,
            BigDecimal maxAcreage,
            BigDecimal minRent,
            BigDecimal maxRent,
            Boolean hasRiver,
            Boolean hasBorewell,
            Boolean hasDrip,
            Boolean hasCanal,
            String statusStr,
            Pageable pageable) {

        LandSoilType soilType = LandSoilType.fromString(soilTypeStr);
        WaterSourceType waterSource = WaterSourceType.fromString(waterSourceStr);
        LandStatus status = LandStatus.fromString(statusStr);

        Specification<LandParcel> spec = LandParcelSpecification.filter(
                query, soilType, waterSource, district, state, minAcreage, maxAcreage,
                minRent, maxRent, hasRiver, hasBorewell, hasDrip, hasCanal, status
        );

        return landParcelRepository.findAll(spec, pageable).map(LandParcelResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public LandParcelResponse getLandParcelById(Long id) {
        LandParcel parcel = landParcelRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farmland parcel not found with ID: " + id));

        return LandParcelResponse.fromEntity(parcel);
    }

    @Transactional(readOnly = true)
    public Page<LandParcelResponse> searchLandParcels(String query, Pageable pageable) {
        Specification<LandParcel> spec = LandParcelSpecification.filter(
                query, null, null, null, null, null, null, null, null, null, null, null, null, null
        );
        return landParcelRepository.findAll(spec, pageable).map(LandParcelResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<LandParcelResponse> getMyLandParcels(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated owner not found"));

        return landParcelRepository.findByOwnerIdAndActiveTrueOrderByCreatedAtDesc(owner.getId())
                .stream()
                .map(LandParcelResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public LandParcelResponse createLandParcel(String ownerEmail, LandParcelCreateRequest request) {
        User owner = userRepository.findByEmail(ownerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated owner not found"));

        BigDecimal totalRent = request.getAnnualRentPerAcre().multiply(request.getAcreage());

        LandParcel parcel = LandParcel.builder()
                .owner(owner)
                .title(request.getTitle().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .surveyNumber(request.getSurveyNumber() != null ? request.getSurveyNumber().trim() : null)
                .location(request.getLocation().trim())
                .district(request.getDistrict().trim())
                .state(request.getState().trim())
                .acreage(request.getAcreage())
                .soilType(request.getSoilType())
                .soilTypeName(request.getSoilTypeName() != null ? request.getSoilTypeName().trim() : null)
                .waterSource(request.getWaterSource())
                .waterSourceName(request.getWaterSourceName() != null ? request.getWaterSourceName().trim() : null)
                .hasRiver(request.getHasRiver() != null ? request.getHasRiver() : false)
                .hasBorewell(request.getHasBorewell() != null ? request.getHasBorewell() : false)
                .hasDrip(request.getHasDrip() != null ? request.getHasDrip() : false)
                .hasCanal(request.getHasCanal() != null ? request.getHasCanal() : false)
                .annualRentPerAcre(request.getAnnualRentPerAcre())
                .totalAnnualRent(totalRent)
                .securityDepositMonths(request.getSecurityDepositMonths() != null ? request.getSecurityDepositMonths() : 3)
                .leaseTenure(request.getLeaseTenure() != null ? request.getLeaseTenure().trim() : null)
                .availableFrom(request.getAvailableFrom() != null ? request.getAvailableFrom().trim() : "Immediate")
                .verifiedTitle(request.getVerifiedTitle() != null ? request.getVerifiedTitle() : true)
                .roadAccess(request.getRoadAccess() != null ? request.getRoadAccess().trim() : null)
                .electricity(request.getElectricity() != null ? request.getElectricity().trim() : null)
                .fencing(request.getFencing() != null ? request.getFencing().trim() : null)
                .soilHealthScore(request.getSoilHealthScore())
                .suitableCrops(request.getSuitableCrops())
                .status(LandStatus.AVAILABLE)
                .active(true)
                .build();

        LandParcel saved = landParcelRepository.save(parcel);
        return LandParcelResponse.fromEntity(saved);
    }

    @Transactional
    public LandParcelResponse updateLandParcel(String ownerEmail, Long id, LandParcelUpdateRequest request, boolean isAdmin) {
        LandParcel parcel = landParcelRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farmland parcel not found with ID: " + id));

        if (!isAdmin && !parcel.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to update this farmland parcel.");
        }

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            parcel.setTitle(request.getTitle().trim());
        }
        if (request.getDescription() != null) {
            parcel.setDescription(request.getDescription().trim());
        }
        if (request.getSurveyNumber() != null) {
            parcel.setSurveyNumber(request.getSurveyNumber().trim());
        }
        if (request.getLocation() != null) {
            parcel.setLocation(request.getLocation().trim());
        }
        if (request.getDistrict() != null) {
            parcel.setDistrict(request.getDistrict().trim());
        }
        if (request.getState() != null) {
            parcel.setState(request.getState().trim());
        }
        if (request.getAcreage() != null) {
            parcel.setAcreage(request.getAcreage());
            parcel.setTotalAnnualRent(parcel.getAnnualRentPerAcre().multiply(parcel.getAcreage()));
        }
        if (request.getSoilType() != null) {
            parcel.setSoilType(request.getSoilType());
        }
        if (request.getSoilTypeName() != null) {
            parcel.setSoilTypeName(request.getSoilTypeName().trim());
        }
        if (request.getWaterSource() != null) {
            parcel.setWaterSource(request.getWaterSource());
        }
        if (request.getWaterSourceName() != null) {
            parcel.setWaterSourceName(request.getWaterSourceName().trim());
        }
        if (request.getHasRiver() != null) {
            parcel.setHasRiver(request.getHasRiver());
        }
        if (request.getHasBorewell() != null) {
            parcel.setHasBorewell(request.getHasBorewell());
        }
        if (request.getHasDrip() != null) {
            parcel.setHasDrip(request.getHasDrip());
        }
        if (request.getHasCanal() != null) {
            parcel.setHasCanal(request.getHasCanal());
        }
        if (request.getAnnualRentPerAcre() != null) {
            parcel.setAnnualRentPerAcre(request.getAnnualRentPerAcre());
            parcel.setTotalAnnualRent(parcel.getAnnualRentPerAcre().multiply(parcel.getAcreage()));
        }
        if (request.getSecurityDepositMonths() != null) {
            parcel.setSecurityDepositMonths(request.getSecurityDepositMonths());
        }
        if (request.getLeaseTenure() != null) {
            parcel.setLeaseTenure(request.getLeaseTenure().trim());
        }
        if (request.getAvailableFrom() != null) {
            parcel.setAvailableFrom(request.getAvailableFrom().trim());
        }
        if (request.getVerifiedTitle() != null) {
            parcel.setVerifiedTitle(request.getVerifiedTitle());
        }
        if (request.getRoadAccess() != null) {
            parcel.setRoadAccess(request.getRoadAccess().trim());
        }
        if (request.getElectricity() != null) {
            parcel.setElectricity(request.getElectricity().trim());
        }
        if (request.getFencing() != null) {
            parcel.setFencing(request.getFencing().trim());
        }
        if (request.getSoilHealthScore() != null) {
            parcel.setSoilHealthScore(request.getSoilHealthScore());
        }
        if (request.getSuitableCrops() != null) {
            parcel.setSuitableCrops(request.getSuitableCrops());
        }
        if (request.getStatus() != null) {
            if (!parcel.getStatus().canTransitionTo(request.getStatus())) {
                throw new BadRequestException("Invalid land status transition from " + parcel.getStatus() + " to " + request.getStatus());
            }
            parcel.setStatus(request.getStatus());
        }

        LandParcel updated = landParcelRepository.save(parcel);
        return LandParcelResponse.fromEntity(updated);
    }

    @Transactional
    public void deleteLandParcel(String ownerEmail, Long id, boolean isAdmin) {
        LandParcel parcel = landParcelRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farmland parcel not found with ID: " + id));

        if (!isAdmin && !parcel.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to delete this farmland parcel.");
        }

        parcel.setActive(false);
        parcel.setStatus(LandStatus.INACTIVE);
        landParcelRepository.save(parcel);
    }
}
