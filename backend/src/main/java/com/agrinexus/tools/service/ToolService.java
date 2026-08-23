package com.agrinexus.tools.service;

import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.tools.dto.ToolCreateRequest;
import com.agrinexus.tools.dto.ToolResponse;
import com.agrinexus.tools.dto.ToolUpdateRequest;
import com.agrinexus.tools.entity.Tool;
import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolCategory;
import com.agrinexus.tools.entity.ToolCondition;
import com.agrinexus.tools.repository.ToolRepository;
import com.agrinexus.tools.repository.ToolSpecification;
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
public class ToolService {

    private final ToolRepository toolRepository;
    private final UserRepository userRepository;

    public ToolService(ToolRepository toolRepository, UserRepository userRepository) {
        this.toolRepository = toolRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<ToolResponse> getAllTools(
            String query,
            String categoryStr,
            String brand,
            String district,
            String state,
            String location,
            String conditionStr,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String availabilityStr,
            Pageable pageable) {

        ToolCategory category = ToolCategory.fromString(categoryStr);
        ToolCondition condition = ToolCondition.fromString(conditionStr);
        ToolAvailabilityStatus availability = ToolAvailabilityStatus.fromString(availabilityStr);

        Specification<Tool> spec = ToolSpecification.filter(
                query, category, brand, district, state, location, condition, minPrice, maxPrice, availability
        );

        return toolRepository.findAll(spec, pageable).map(ToolResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public ToolResponse getToolById(Long id) {
        Tool tool = toolRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tool not found with ID: " + id));

        return ToolResponse.fromEntity(tool);
    }

    @Transactional(readOnly = true)
    public List<ToolResponse> getMyTools(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + ownerEmail));

        return toolRepository.findByOwnerIdAndActiveTrueOrderByCreatedAtDesc(owner.getId())
                .stream()
                .map(ToolResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ToolResponse createTool(String ownerEmail, ToolCreateRequest request) {
        User owner = userRepository.findByEmail(ownerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Tool tool = Tool.builder()
                .owner(owner)
                .name(request.getName().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .category(request.getCategory())
                .brand(request.getBrand() != null ? request.getBrand().trim() : null)
                .model(request.getModel() != null ? request.getModel().trim() : null)
                .type(request.getType() != null ? request.getType().trim() : null)
                .condition(request.getCondition() != null ? request.getCondition() : ToolCondition.GOOD)
                .power(request.getPower())
                .powerUnit(request.getPowerUnit() != null ? request.getPowerUnit().trim() : "HP")
                .location(request.getLocation().trim())
                .district(request.getDistrict().trim())
                .state(request.getState().trim())
                .pricePerDay(request.getPricePerDay())
                .pricePerHour(request.getPricePerHour())
                .securityDeposit(request.getSecurityDeposit())
                .availabilityStatus(request.getAvailabilityStatus() != null ? request.getAvailabilityStatus() : ToolAvailabilityStatus.AVAILABLE)
                .imageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null)
                .year(request.getYear())
                .fuelType(request.getFuelType() != null ? request.getFuelType().trim() : null)
                .operatorRequired(request.getOperatorRequired() != null ? request.getOperatorRequired() : false)
                .deliveryAvailable(request.getDeliveryAvailable() != null ? request.getDeliveryAvailable() : false)
                .active(true)
                .build();

        Tool savedTool = toolRepository.save(tool);
        return ToolResponse.fromEntity(savedTool);
    }

    @Transactional
    public ToolResponse updateTool(String ownerEmail, Long id, ToolUpdateRequest request) {
        Tool tool = toolRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tool not found with ID: " + id));

        if (!tool.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to update this tool listing.");
        }

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            tool.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            tool.setDescription(request.getDescription().trim());
        }
        if (request.getCategory() != null) {
            tool.setCategory(request.getCategory());
        }
        if (request.getBrand() != null) {
            tool.setBrand(request.getBrand().trim());
        }
        if (request.getModel() != null) {
            tool.setModel(request.getModel().trim());
        }
        if (request.getType() != null) {
            tool.setType(request.getType().trim());
        }
        if (request.getCondition() != null) {
            tool.setCondition(request.getCondition());
        }
        if (request.getPower() != null) {
            tool.setPower(request.getPower());
        }
        if (request.getPowerUnit() != null) {
            tool.setPowerUnit(request.getPowerUnit().trim());
        }
        if (request.getLocation() != null && !request.getLocation().trim().isEmpty()) {
            tool.setLocation(request.getLocation().trim());
        }
        if (request.getDistrict() != null && !request.getDistrict().trim().isEmpty()) {
            tool.setDistrict(request.getDistrict().trim());
        }
        if (request.getState() != null && !request.getState().trim().isEmpty()) {
            tool.setState(request.getState().trim());
        }
        if (request.getPricePerDay() != null) {
            tool.setPricePerDay(request.getPricePerDay());
        }
        if (request.getPricePerHour() != null) {
            tool.setPricePerHour(request.getPricePerHour());
        }
        if (request.getSecurityDeposit() != null) {
            tool.setSecurityDeposit(request.getSecurityDeposit());
        }
        if (request.getAvailabilityStatus() != null) {
            tool.setAvailabilityStatus(request.getAvailabilityStatus());
        }
        if (request.getImageUrl() != null) {
            tool.setImageUrl(request.getImageUrl().trim());
        }
        if (request.getYear() != null) {
            tool.setYear(request.getYear());
        }
        if (request.getFuelType() != null) {
            tool.setFuelType(request.getFuelType().trim());
        }
        if (request.getOperatorRequired() != null) {
            tool.setOperatorRequired(request.getOperatorRequired());
        }
        if (request.getDeliveryAvailable() != null) {
            tool.setDeliveryAvailable(request.getDeliveryAvailable());
        }

        Tool updatedTool = toolRepository.save(tool);
        return ToolResponse.fromEntity(updatedTool);
    }

    @Transactional
    public void deleteTool(String ownerEmail, Long id, boolean isAdmin) {
        Tool tool = toolRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tool not found with ID: " + id));

        if (!isAdmin && !tool.getOwner().getEmail().equalsIgnoreCase(ownerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to delete this tool listing.");
        }

        // Soft delete / archive to preserve historical rental requests
        tool.setActive(false);
        toolRepository.save(tool);
    }
}
