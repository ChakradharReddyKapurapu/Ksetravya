package com.agrinexus.land.repository;

import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandSoilType;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.entity.WaterSourceType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class LandParcelSpecification {

    public static Specification<LandParcel> filter(
            String query,
            LandSoilType soilType,
            WaterSourceType waterSource,
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
            LandStatus status) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Active soft-delete flag
            predicates.add(cb.isTrue(root.get("active")));

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate titleMatch = cb.like(cb.lower(root.get("title")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                Predicate locMatch = cb.like(cb.lower(root.get("location")), pattern);
                Predicate distMatch = cb.like(cb.lower(root.get("district")), pattern);
                predicates.add(cb.or(titleMatch, descMatch, locMatch, distMatch));
            }

            if (soilType != null) {
                predicates.add(cb.equal(root.get("soilType"), soilType));
            }

            if (waterSource != null) {
                predicates.add(cb.equal(root.get("waterSource"), waterSource));
            }

            if (district != null && !district.trim().isEmpty() && !"all".equalsIgnoreCase(district.trim())) {
                predicates.add(cb.like(cb.lower(root.get("district")), "%" + district.trim().toLowerCase() + "%"));
            }

            if (state != null && !state.trim().isEmpty() && !"all".equalsIgnoreCase(state.trim())) {
                predicates.add(cb.like(cb.lower(root.get("state")), "%" + state.trim().toLowerCase() + "%"));
            }

            if (minAcreage != null && minAcreage.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("acreage"), minAcreage));
            }

            if (maxAcreage != null && maxAcreage.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("acreage"), maxAcreage));
            }

            if (minRent != null && minRent.compareTo(BigDecimal.ZERO) >= 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("annualRentPerAcre"), minRent));
            }

            if (maxRent != null && maxRent.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("annualRentPerAcre"), maxRent));
            }

            if (hasRiver != null) {
                predicates.add(cb.equal(root.get("hasRiver"), hasRiver));
            }

            if (hasBorewell != null) {
                predicates.add(cb.equal(root.get("hasBorewell"), hasBorewell));
            }

            if (hasDrip != null) {
                predicates.add(cb.equal(root.get("hasDrip"), hasDrip));
            }

            if (hasCanal != null) {
                predicates.add(cb.equal(root.get("hasCanal"), hasCanal));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
