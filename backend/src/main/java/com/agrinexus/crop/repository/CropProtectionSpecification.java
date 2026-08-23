package com.agrinexus.crop.repository;

import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.crop.entity.PlantPart;
import com.agrinexus.crop.entity.ProtectionType;
import com.agrinexus.crop.entity.SeverityLevel;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CropProtectionSpecification {

    public static Specification<CropProtection> filter(
            String query,
            CropType crop,
            ProtectionType type,
            SeverityLevel severity,
            SeasonType season,
            PlantPart plantPart,
            String symptomQuery) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always active
            predicates.add(cb.isTrue(root.get("active")));

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), pattern);
                Predicate sciMatch = cb.like(cb.lower(root.get("scientificName")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                Predicate causesMatch = cb.like(cb.lower(root.get("causes")), pattern);
                predicates.add(cb.or(nameMatch, sciMatch, descMatch, causesMatch));
            }

            if (crop != null) {
                predicates.add(cb.equal(root.get("crop"), crop));
            }

            if (type != null) {
                predicates.add(cb.equal(root.get("type"), type));
            }

            if (severity != null) {
                predicates.add(cb.equal(root.get("severity"), severity));
            }

            if (season != null) {
                predicates.add(cb.equal(root.get("season"), season));
            }

            if (plantPart != null) {
                Join<CropProtection, PlantPart> partJoin = root.join("affectedParts");
                predicates.add(cb.equal(partJoin, plantPart));
            }

            if (symptomQuery != null && !symptomQuery.trim().isEmpty()) {
                Join<CropProtection, String> symptomJoin = root.join("symptoms");
                predicates.add(cb.like(cb.lower(symptomJoin), "%" + symptomQuery.trim().toLowerCase() + "%"));
            }

            if (criteriaQuery != null) {
                criteriaQuery.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
