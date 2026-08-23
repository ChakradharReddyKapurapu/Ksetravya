package com.agrinexus.seeds.service;

import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.seeds.dto.SeedCreateRequest;
import com.agrinexus.seeds.dto.SeedResponse;
import com.agrinexus.seeds.dto.SeedUpdateRequest;
import com.agrinexus.seeds.entity.*;
import com.agrinexus.seeds.repository.SeedRepository;
import com.agrinexus.seeds.repository.SeedSpecification;
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
public class SeedService {

    private final SeedRepository seedRepository;
    private final UserRepository userRepository;

    public SeedService(SeedRepository seedRepository, UserRepository userRepository) {
        this.seedRepository = seedRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<SeedResponse> getAllSeeds(
            String query,
            String cropStr,
            String seasonStr,
            String seedTypeStr,
            String soilTypeStr,
            String waterReqStr,
            String availabilityStr,
            String region,
            String brand,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable) {

        CropType crop = CropType.fromString(cropStr);
        SeasonType season = SeasonType.fromString(seasonStr);
        SeedType seedType = SeedType.fromString(seedTypeStr);
        SoilType soilType = SoilType.fromString(soilTypeStr);
        WaterRequirement waterReq = WaterRequirement.fromString(waterReqStr);
        SeedAvailabilityStatus availability = SeedAvailabilityStatus.fromString(availabilityStr);

        Specification<Seed> spec = SeedSpecification.filter(
                query, crop, season, seedType, soilType, waterReq, availability, region, brand, minPrice, maxPrice
        );

        return seedRepository.findAll(spec, pageable).map(SeedResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public SeedResponse getSeedById(Long id) {
        Seed seed = seedRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seed variety not found with ID: " + id));

        return SeedResponse.fromEntity(seed);
    }

    @Transactional(readOnly = true)
    public Page<SeedResponse> getSeedsByCrop(String cropStr, Pageable pageable) {
        CropType crop = CropType.fromString(cropStr);
        if (crop == null) {
            return seedRepository.findAll(pageable).map(SeedResponse::fromEntity);
        }
        return seedRepository.findByCropAndActiveTrue(crop, pageable).map(SeedResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public Page<SeedResponse> getSeedsBySeason(String seasonStr, Pageable pageable) {
        SeasonType season = SeasonType.fromString(seasonStr);
        if (season == null) {
            return seedRepository.findAll(pageable).map(SeedResponse::fromEntity);
        }
        return seedRepository.findBySeasonAndActiveTrue(season, pageable).map(SeedResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<SeedResponse> getMySeeds(String supplierEmail) {
        User supplier = userRepository.findByEmail(supplierEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return seedRepository.findBySupplierIdAndActiveTrueOrderByCreatedAtDesc(supplier.getId())
                .stream()
                .map(SeedResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public SeedResponse createSeed(String supplierEmail, SeedCreateRequest request) {
        User supplier = userRepository.findByEmail(supplierEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Seed seed = Seed.builder()
                .supplier(supplier)
                .name(request.getName().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .crop(request.getCrop())
                .category(request.getCategory())
                .variety(request.getVariety() != null ? request.getVariety().trim() : null)
                .brand(request.getBrand() != null ? request.getBrand().trim() : null)
                .seedType(request.getSeedType() != null ? request.getSeedType() : SeedType.CERTIFIED)
                .season(request.getSeason() != null ? request.getSeason() : SeasonType.KHARIF)
                .durationDays(request.getDurationDays())
                .durationText(request.getDurationText() != null ? request.getDurationText().trim() : null)
                .soilTypes(request.getSoilTypes())
                .suitableRegions(request.getSuitableRegions())
                .waterRequirement(request.getWaterRequirement() != null ? request.getWaterRequirement() : WaterRequirement.MEDIUM)
                .irrigationRequirement(request.getIrrigationRequirement() != null ? request.getIrrigationRequirement().trim() : null)
                .yieldPotential(request.getYieldPotential() != null ? request.getYieldPotential().trim() : null)
                .germinationRate(request.getGerminationRate() != null ? request.getGerminationRate().trim() : null)
                .diseaseResistance(request.getDiseaseResistance() != null ? request.getDiseaseResistance().trim() : null)
                .price(request.getPrice())
                .priceUnit(request.getPriceUnit() != null ? request.getPriceUnit().trim() : "KG")
                .packSize(request.getPackSize() != null ? request.getPackSize().trim() : null)
                .quantityAvailable(request.getQuantityAvailable() != null ? request.getQuantityAvailable() : 100)
                .availabilityStatus(request.getAvailabilityStatus() != null ? request.getAvailabilityStatus() : SeedAvailabilityStatus.AVAILABLE)
                .imageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null)
                .active(true)
                .build();

        Seed saved = seedRepository.save(seed);
        return SeedResponse.fromEntity(saved);
    }

    @Transactional
    public SeedResponse updateSeed(String supplierEmail, Long id, SeedUpdateRequest request, boolean isAdmin) {
        Seed seed = seedRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seed variety not found with ID: " + id));

        if (!isAdmin && (seed.getSupplier() == null || !seed.getSupplier().getEmail().equalsIgnoreCase(supplierEmail.trim()))) {
            throw new AccessDeniedException("You do not have permission to modify this seed catalog entry.");
        }

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            seed.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            seed.setDescription(request.getDescription().trim());
        }
        if (request.getCrop() != null) {
            seed.setCrop(request.getCrop());
        }
        if (request.getCategory() != null) {
            seed.setCategory(request.getCategory());
        }
        if (request.getVariety() != null) {
            seed.setVariety(request.getVariety().trim());
        }
        if (request.getBrand() != null) {
            seed.setBrand(request.getBrand().trim());
        }
        if (request.getSeedType() != null) {
            seed.setSeedType(request.getSeedType());
        }
        if (request.getSeason() != null) {
            seed.setSeason(request.getSeason());
        }
        if (request.getDurationDays() != null) {
            seed.setDurationDays(request.getDurationDays());
        }
        if (request.getDurationText() != null) {
            seed.setDurationText(request.getDurationText().trim());
        }
        if (request.getSoilTypes() != null) {
            seed.setSoilTypes(request.getSoilTypes());
        }
        if (request.getSuitableRegions() != null) {
            seed.setSuitableRegions(request.getSuitableRegions());
        }
        if (request.getWaterRequirement() != null) {
            seed.setWaterRequirement(request.getWaterRequirement());
        }
        if (request.getIrrigationRequirement() != null) {
            seed.setIrrigationRequirement(request.getIrrigationRequirement().trim());
        }
        if (request.getYieldPotential() != null) {
            seed.setYieldPotential(request.getYieldPotential().trim());
        }
        if (request.getGerminationRate() != null) {
            seed.setGerminationRate(request.getGerminationRate().trim());
        }
        if (request.getDiseaseResistance() != null) {
            seed.setDiseaseResistance(request.getDiseaseResistance().trim());
        }
        if (request.getPrice() != null) {
            seed.setPrice(request.getPrice());
        }
        if (request.getPriceUnit() != null) {
            seed.setPriceUnit(request.getPriceUnit().trim());
        }
        if (request.getPackSize() != null) {
            seed.setPackSize(request.getPackSize().trim());
        }
        if (request.getQuantityAvailable() != null) {
            seed.setQuantityAvailable(request.getQuantityAvailable());
        }
        if (request.getAvailabilityStatus() != null) {
            seed.setAvailabilityStatus(request.getAvailabilityStatus());
        }
        if (request.getImageUrl() != null) {
            seed.setImageUrl(request.getImageUrl().trim());
        }

        Seed updated = seedRepository.save(seed);
        return SeedResponse.fromEntity(updated);
    }

    @Transactional
    public void deleteSeed(String supplierEmail, Long id, boolean isAdmin) {
        Seed seed = seedRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seed variety not found with ID: " + id));

        if (!isAdmin && (seed.getSupplier() == null || !seed.getSupplier().getEmail().equalsIgnoreCase(supplierEmail.trim()))) {
            throw new AccessDeniedException("You do not have permission to delete this seed catalog entry.");
        }

        seed.setActive(false);
        seedRepository.save(seed);
    }
}
