package com.agrinexus.jobs.repository;

import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.entity.WageType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class JobSpecification {

    public static Specification<Job> filter(
            String query,
            JobCategory category,
            String crop,
            String district,
            String state,
            WageType wageType,
            BigDecimal minWage,
            BigDecimal maxWage,
            LocalDate startDate,
            Boolean foodProvided,
            Boolean accommodationProvided,
            Boolean transportProvided,
            JobStatus status) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always check active soft-delete
            predicates.add(cb.isTrue(root.get("active")));

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate titleMatch = cb.like(cb.lower(root.get("title")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                Predicate cropMatch = cb.like(cb.lower(root.get("crop")), pattern);
                Predicate locMatch = cb.like(cb.lower(root.get("location")), pattern);
                Predicate distMatch = cb.like(cb.lower(root.get("district")), pattern);
                predicates.add(cb.or(titleMatch, descMatch, cropMatch, locMatch, distMatch));
            }

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            if (crop != null && !crop.trim().isEmpty() && !"all".equalsIgnoreCase(crop.trim())) {
                predicates.add(cb.like(cb.lower(root.get("crop")), "%" + crop.trim().toLowerCase() + "%"));
            }

            if (district != null && !district.trim().isEmpty() && !"all".equalsIgnoreCase(district.trim())) {
                predicates.add(cb.like(cb.lower(root.get("district")), "%" + district.trim().toLowerCase() + "%"));
            }

            if (state != null && !state.trim().isEmpty() && !"all".equalsIgnoreCase(state.trim())) {
                predicates.add(cb.like(cb.lower(root.get("state")), "%" + state.trim().toLowerCase() + "%"));
            }

            if (wageType != null) {
                predicates.add(cb.equal(root.get("wageType"), wageType));
            }

            if (minWage != null && minWage.compareTo(BigDecimal.ZERO) >= 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("wage"), minWage));
            }

            if (maxWage != null && maxWage.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("wage"), maxWage));
            }

            if (startDate != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), startDate));
            }

            if (foodProvided != null) {
                predicates.add(cb.equal(root.get("foodProvided"), foodProvided));
            }

            if (accommodationProvided != null) {
                predicates.add(cb.equal(root.get("accommodationProvided"), accommodationProvided));
            }

            if (transportProvided != null) {
                predicates.add(cb.equal(root.get("transportProvided"), transportProvided));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
