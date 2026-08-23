package com.agrinexus.market.repository;

import com.agrinexus.market.entity.MarketPrice;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MarketPriceSpecification {

    public static Specification<MarketPrice> filter(
            String query,
            String commodity,
            String variety,
            String market,
            String district,
            String state,
            LocalDate date) {

        return (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.isTrue(root.get("active")));

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate commMatch = cb.like(cb.lower(root.get("commodity")), pattern);
                Predicate varMatch = cb.like(cb.lower(root.get("variety")), pattern);
                Predicate mktMatch = cb.like(cb.lower(root.get("market")), pattern);
                Predicate distMatch = cb.like(cb.lower(root.get("district")), pattern);
                predicates.add(cb.or(commMatch, varMatch, mktMatch, distMatch));
            }

            if (commodity != null && !commodity.trim().isEmpty() && !"all".equalsIgnoreCase(commodity.trim())) {
                predicates.add(cb.like(cb.lower(root.get("commodity")), "%" + commodity.trim().toLowerCase() + "%"));
            }

            if (variety != null && !variety.trim().isEmpty() && !"all".equalsIgnoreCase(variety.trim())) {
                predicates.add(cb.like(cb.lower(root.get("variety")), "%" + variety.trim().toLowerCase() + "%"));
            }

            if (market != null && !market.trim().isEmpty() && !"all".equalsIgnoreCase(market.trim())) {
                predicates.add(cb.like(cb.lower(root.get("market")), "%" + market.trim().toLowerCase() + "%"));
            }

            if (district != null && !district.trim().isEmpty() && !"all".equalsIgnoreCase(district.trim())) {
                predicates.add(cb.like(cb.lower(root.get("district")), "%" + district.trim().toLowerCase() + "%"));
            }

            if (state != null && !state.trim().isEmpty() && !"all".equalsIgnoreCase(state.trim())) {
                predicates.add(cb.like(cb.lower(root.get("state")), "%" + state.trim().toLowerCase() + "%"));
            }

            if (date != null) {
                predicates.add(cb.equal(root.get("priceDate"), date));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
