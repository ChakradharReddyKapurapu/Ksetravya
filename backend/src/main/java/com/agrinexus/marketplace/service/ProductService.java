package com.agrinexus.marketplace.service;

import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.exception.UnauthorizedException;
import com.agrinexus.marketplace.dto.ProductCreateRequest;
import com.agrinexus.marketplace.dto.ProductResponse;
import com.agrinexus.marketplace.dto.ProductUpdateRequest;
import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.ProductRepository;
import com.agrinexus.marketplace.repository.ProductSpecification;
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
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(
            String query,
            String categoryStr,
            String subcategory,
            String brand,
            String district,
            String state,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String availabilityStr,
            Pageable pageable) {

        ProductCategory category = ProductCategory.fromString(categoryStr);
        ProductStatus availability = ProductStatus.fromString(availabilityStr);

        Specification<Product> spec = ProductSpecification.filter(
                query, category, subcategory, brand, district, state, minPrice, maxPrice, availability
        );

        return productRepository.findAll(spec, pageable).map(ProductResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        return ProductResponse.fromEntity(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> searchProducts(String query, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.filter(
                query, null, null, null, null, null, null, null, null
        );
        return productRepository.findAll(spec, pageable).map(ProductResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getMyProducts(String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        return productRepository.findBySellerIdAndActiveTrueOrderByCreatedAtDesc(seller.getId())
                .stream()
                .map(ProductResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductResponse createProduct(String sellerEmail, ProductCreateRequest request) {
        User seller = userRepository.findByEmail(sellerEmail.toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user not found"));

        Product product = Product.builder()
                .seller(seller)
                .name(request.getName().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .category(request.getCategory())
                .subcategory(request.getSubcategory() != null ? request.getSubcategory().trim() : null)
                .brand(request.getBrand() != null ? request.getBrand().trim() : null)
                .price(request.getPrice())
                .unit(request.getUnit() != null ? request.getUnit().trim() : "KG")
                .stockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 100)
                .availabilityStatus(request.getAvailabilityStatus() != null ? request.getAvailabilityStatus() : ProductStatus.ACTIVE)
                .location(request.getLocation().trim())
                .district(request.getDistrict().trim())
                .state(request.getState().trim())
                .imageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null)
                .active(true)
                .build();

        Product saved = productRepository.save(product);
        return ProductResponse.fromEntity(saved);
    }

    @Transactional
    public ProductResponse updateProduct(String sellerEmail, Long id, ProductUpdateRequest request, boolean isAdmin) {
        Product product = productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        if (!isAdmin && !product.getSeller().getEmail().equalsIgnoreCase(sellerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to update this product listing.");
        }

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            product.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            product.setDescription(request.getDescription().trim());
        }
        if (request.getCategory() != null) {
            product.setCategory(request.getCategory());
        }
        if (request.getSubcategory() != null) {
            product.setSubcategory(request.getSubcategory().trim());
        }
        if (request.getBrand() != null) {
            product.setBrand(request.getBrand().trim());
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getUnit() != null) {
            product.setUnit(request.getUnit().trim());
        }
        if (request.getStockQuantity() != null) {
            product.setStockQuantity(request.getStockQuantity());
            if (request.getStockQuantity() == 0) {
                product.setAvailabilityStatus(ProductStatus.OUT_OF_STOCK);
            }
        }
        if (request.getAvailabilityStatus() != null) {
            product.setAvailabilityStatus(request.getAvailabilityStatus());
        }
        if (request.getLocation() != null) {
            product.setLocation(request.getLocation().trim());
        }
        if (request.getDistrict() != null) {
            product.setDistrict(request.getDistrict().trim());
        }
        if (request.getState() != null) {
            product.setState(request.getState().trim());
        }
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl().trim());
        }

        Product updated = productRepository.save(product);
        return ProductResponse.fromEntity(updated);
    }

    @Transactional
    public void deleteProduct(String sellerEmail, Long id, boolean isAdmin) {
        Product product = productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        if (!isAdmin && !product.getSeller().getEmail().equalsIgnoreCase(sellerEmail.trim())) {
            throw new AccessDeniedException("You do not have permission to delete this product listing.");
        }

        product.setActive(false);
        product.setAvailabilityStatus(ProductStatus.INACTIVE);
        productRepository.save(product);
    }
}
