package com.agrinexus.tools.controller;

import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.common.ApiResponse;
import com.agrinexus.tools.dto.ToolCreateRequest;
import com.agrinexus.tools.dto.ToolResponse;
import com.agrinexus.tools.dto.ToolUpdateRequest;
import com.agrinexus.tools.service.ToolService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolController {

    private final ToolService toolService;

    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ToolResponse>>> getAllTools(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String availability,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        Sort sortObj = switch (sort.toLowerCase()) {
            case "priceasc", "price_asc", "pricelow" -> Sort.by(Sort.Direction.ASC, "pricePerDay");
            case "pricedesc", "price_desc", "pricehigh" -> Sort.by(Sort.Direction.DESC, "pricePerDay");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), sortObj);
        Page<ToolResponse> results = toolService.getAllTools(
                query, category, brand, district, state, location, condition, minPrice, maxPrice, availability, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Agricultural tools retrieved successfully", results));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<ToolResponse>>> searchTools(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        return getAllTools(query, null, null, null, null, null, null, null, null, null, page, size, sort);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ToolResponse>> getToolById(@PathVariable Long id) {
        ToolResponse response = toolService.getToolById(id);
        return ResponseEntity.ok(ApiResponse.success("Tool details retrieved successfully", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ToolResponse>>> getMyTools(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ToolResponse> myTools = toolService.getMyTools(userPrincipal.getUsername());
        return ResponseEntity.ok(ApiResponse.success("My agricultural tool listings retrieved", myTools));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ToolResponse>> createTool(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ToolCreateRequest request) {
        ToolResponse response = toolService.createTool(userPrincipal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tool listing published successfully", response));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<ToolResponse>> updateTool(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ToolUpdateRequest request) {
        ToolResponse response = toolService.updateTool(userPrincipal.getUsername(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Tool listing updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTool(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        toolService.deleteTool(userPrincipal.getUsername(), id, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Tool listing deleted/archived successfully", null));
    }
}
