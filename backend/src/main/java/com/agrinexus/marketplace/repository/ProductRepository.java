package com.agrinexus.marketplace.repository;

import com.agrinexus.marketplace.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Optional<Product> findByIdAndActiveTrue(Long id);

    List<Product> findBySellerIdAndActiveTrueOrderByCreatedAtDesc(Long sellerId);

    Page<Product> findByActiveTrue(Pageable pageable);

    long countByAvailabilityStatus(com.agrinexus.marketplace.entity.ProductStatus availabilityStatus);

    @org.springframework.data.jpa.repository.Query("SELECT COUNT(DISTINCT p.seller.id) FROM Product p WHERE p.active = true")
    long countDistinctActiveSellers();
}
