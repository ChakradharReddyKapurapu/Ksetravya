package com.agrinexus.seeds.repository;

import com.agrinexus.seeds.entity.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class SeedSpecification {

    public static Specification<Seed> filter(
            String query,
            CropType crop,
            SeasonType season,
            SeedType seedType,
            SoilType soilType,
            WaterRequirement waterRequirement,
            SeedAvailabilityStatus availability,
            String region,
            String brand,
            BigDecimal minPrice,
            BigDecimal maxPrice) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always active
            predicates.add(cb.isTrue(root.get("active")));

            // Full text search
            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), pattern);
                Predicate varietyMatch = cb.like(cb.lower(root.get("variety")), pattern);
                Predicate brandMatch = cb.like(cb.lower(root.get("brand")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                predicates.add(cb.or(nameMatch, varietyMatch, brandMatch, descMatch));
            }

            if (crop != null) {
                predicates.add(cb.equal(root.get("crop"), crop));
            }

            if (season != null) {
                predicates.add(cb.equal(root.get("season"), season));
            }

            if (seedType != null) {
                predicates.add(cb.equal(root.get("seedType"), seedType));
            }

            if (waterRequirement != null) {
                predicates.add(cb.equal(root.get("waterRequirement"), waterRequirement));
            }

            if (availability != null) {
                predicates.add(cb.equal(root.get("availabilityStatus"), availability));
            }

            if (brand != null && !brand.trim().isEmpty() && !"all".equalsIgnoreCase(brand.trim())) {
                predicates.add(cb.like(cb.lower(root.get("brand")), "%" + brand.trim().toLowerCase() + "%"));
            }

            if (minPrice != null && minPrice.compareTo(BigDecimal.ZERO) >= 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (soilType != null) {
                Join<Seed, SoilType> soilJoin = root.join("soilTypes");
                predicates.add(cb.equal(soilJoin, soilType));
            }

            if (region != null && !region.trim().isEmpty() && !"all".equalsIgnoreCase(region.trim())) {
                Join<Seed, String> regionJoin = root.join("suitableRegions");
                predicates.add(cb.like(cb.lower(regionJoin), "%" + region.trim().toLowerCase() + "%"));
            }

            if (criteriaQuery != null) {
                criteriaQuery.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
