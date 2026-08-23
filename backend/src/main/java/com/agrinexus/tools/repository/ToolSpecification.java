package com.agrinexus.tools.repository;

import com.agrinexus.tools.entity.Tool;
import com.agrinexus.tools.entity.ToolAvailabilityStatus;
import com.agrinexus.tools.entity.ToolCategory;
import com.agrinexus.tools.entity.ToolCondition;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ToolSpecification {

    public static Specification<Tool> filter(
            String query,
            ToolCategory category,
            String brand,
            String district,
            String state,
            String location,
            ToolCondition condition,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            ToolAvailabilityStatus availability) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always only include active (non-archived) tools
            predicates.add(cb.isTrue(root.get("active")));

            // Full text search query
            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), pattern);
                Predicate brandMatch = cb.like(cb.lower(root.get("brand")), pattern);
                Predicate modelMatch = cb.like(cb.lower(root.get("model")), pattern);
                Predicate locationMatch = cb.like(cb.lower(root.get("location")), pattern);
                Predicate districtMatch = cb.like(cb.lower(root.get("district")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                predicates.add(cb.or(nameMatch, brandMatch, modelMatch, locationMatch, districtMatch, descMatch));
            }

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            if (brand != null && !brand.trim().isEmpty() && !"all".equalsIgnoreCase(brand.trim()) && !"all brands".equalsIgnoreCase(brand.trim())) {
                predicates.add(cb.like(cb.lower(root.get("brand")), "%" + brand.trim().toLowerCase() + "%"));
            }

            if (district != null && !district.trim().isEmpty() && !"all".equalsIgnoreCase(district.trim())) {
                predicates.add(cb.like(cb.lower(root.get("district")), "%" + district.trim().toLowerCase() + "%"));
            }

            if (state != null && !state.trim().isEmpty() && !"all".equalsIgnoreCase(state.trim())) {
                predicates.add(cb.like(cb.lower(root.get("state")), "%" + state.trim().toLowerCase() + "%"));
            }

            if (location != null && !location.trim().isEmpty() && !"all".equalsIgnoreCase(location.trim())) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.trim().toLowerCase() + "%"));
            }

            if (condition != null) {
                predicates.add(cb.equal(root.get("condition"), condition));
            }

            if (minPrice != null && minPrice.compareTo(BigDecimal.ZERO) >= 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("pricePerDay"), minPrice));
            }

            if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("pricePerDay"), maxPrice));
            }

            if (availability != null) {
                predicates.add(cb.equal(root.get("availabilityStatus"), availability));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
