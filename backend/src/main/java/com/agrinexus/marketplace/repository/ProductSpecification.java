package com.agrinexus.marketplace.repository;

import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filter(
            String query,
            ProductCategory category,
            String subcategory,
            String brand,
            String district,
            String state,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            ProductStatus availability) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always active soft-delete check
            predicates.add(cb.isTrue(root.get("active")));

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), pattern);
                Predicate descMatch = cb.like(cb.lower(root.get("description")), pattern);
                Predicate brandMatch = cb.like(cb.lower(root.get("brand")), pattern);
                Predicate subMatch = cb.like(cb.lower(root.get("subcategory")), pattern);
                Predicate locMatch = cb.like(cb.lower(root.get("location")), pattern);
                Predicate distMatch = cb.like(cb.lower(root.get("district")), pattern);
                predicates.add(cb.or(nameMatch, descMatch, brandMatch, subMatch, locMatch, distMatch));
            }

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }

            if (subcategory != null && !subcategory.trim().isEmpty() && !"all".equalsIgnoreCase(subcategory.trim())) {
                predicates.add(cb.like(cb.lower(root.get("subcategory")), "%" + subcategory.trim().toLowerCase() + "%"));
            }

            if (brand != null && !brand.trim().isEmpty() && !"all".equalsIgnoreCase(brand.trim())) {
                predicates.add(cb.like(cb.lower(root.get("brand")), "%" + brand.trim().toLowerCase() + "%"));
            }

            if (district != null && !district.trim().isEmpty() && !"all".equalsIgnoreCase(district.trim())) {
                predicates.add(cb.like(cb.lower(root.get("district")), "%" + district.trim().toLowerCase() + "%"));
            }

            if (state != null && !state.trim().isEmpty() && !"all".equalsIgnoreCase(state.trim())) {
                predicates.add(cb.like(cb.lower(root.get("state")), "%" + state.trim().toLowerCase() + "%"));
            }

            if (minPrice != null && minPrice.compareTo(BigDecimal.ZERO) >= 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (availability != null) {
                predicates.add(cb.equal(root.get("availabilityStatus"), availability));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
