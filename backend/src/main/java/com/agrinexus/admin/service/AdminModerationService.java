package com.agrinexus.admin.service;

import com.agrinexus.admin.dto.*;
import com.agrinexus.admin.entity.AuditAction;
import com.agrinexus.exception.ResourceNotFoundException;
import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobCategory;
import com.agrinexus.jobs.entity.JobStatus;
import com.agrinexus.jobs.repository.JobRepository;
import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandStatus;
import com.agrinexus.land.repository.LandParcelRepository;
import com.agrinexus.marketplace.entity.Order;
import com.agrinexus.marketplace.entity.OrderStatus;
import com.agrinexus.marketplace.entity.Product;
import com.agrinexus.marketplace.entity.ProductCategory;
import com.agrinexus.marketplace.entity.ProductStatus;
import com.agrinexus.marketplace.repository.OrderRepository;
import com.agrinexus.marketplace.repository.ProductRepository;
import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.Seed;
import com.agrinexus.seeds.entity.SeedAvailabilityStatus;
import com.agrinexus.seeds.repository.SeedRepository;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminModerationService {

    private final JobRepository jobRepository;
    private final LandParcelRepository landParcelRepository;
    private final ProductRepository productRepository;
    private final SeedRepository seedRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public AdminModerationService(JobRepository jobRepository, LandParcelRepository landParcelRepository, ProductRepository productRepository, SeedRepository seedRepository, OrderRepository orderRepository, UserRepository userRepository, AuditLogService auditLogService) {
        this.jobRepository = jobRepository;
        this.landParcelRepository = landParcelRepository;
        this.productRepository = productRepository;
        this.seedRepository = seedRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    // --- JOBS ---
    @Transactional(readOnly = true)
    public Page<AdminJobResponse> getJobs(int page, int size, JobStatus status, JobCategory category, String search) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (status != null) {
            return jobRepository.findAll((root, query, cb) -> cb.equal(root.get("status"), status), pageable).map(this::mapJob);
        }
        return jobRepository.findAll(pageable).map(this::mapJob);
    }

    @Transactional(readOnly = true)
    public AdminJobResponse getJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job listing not found with ID: " + id));
        return mapJob(job);
    }

    @Transactional
    public AdminJobResponse updateJobStatus(String adminEmail, Long id, JobStatus status, String reason, String ipAddress) {
        User admin = getAdmin(adminEmail);
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job listing not found with ID: " + id));

        JobStatus oldStatus = job.getStatus();
        job.setStatus(status);
        if (status == JobStatus.CANCELLED) {
            job.setActive(false);
        }
        jobRepository.save(job);

        auditLogService.logAction(admin, AuditAction.JOB_MODERATED, "JOB", id, oldStatus != null ? oldStatus.name() : "UNKNOWN", status.name(), reason, ipAddress);
        return mapJob(job);
    }

    // --- LAND ---
    @Transactional(readOnly = true)
    public Page<AdminLandResponse> getLands(int page, int size, LandStatus status, String location, String search) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (status != null) {
            return landParcelRepository.findAll((root, query, cb) -> cb.equal(root.get("status"), status), pageable).map(this::mapLand);
        }
        return landParcelRepository.findAll(pageable).map(this::mapLand);
    }

    @Transactional(readOnly = true)
    public AdminLandResponse getLand(Long id) {
        LandParcel land = landParcelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Land parcel not found with ID: " + id));
        return mapLand(land);
    }

    @Transactional
    public AdminLandResponse updateLandStatus(String adminEmail, Long id, LandStatus status, String reason, String ipAddress) {
        User admin = getAdmin(adminEmail);
        LandParcel land = landParcelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Land parcel not found with ID: " + id));

        LandStatus oldStatus = land.getStatus();
        land.setStatus(status);
        if (status == LandStatus.INACTIVE) {
            land.setActive(false);
        }
        landParcelRepository.save(land);

        auditLogService.logAction(admin, AuditAction.LAND_MODERATED, "LAND_PARCEL", id, oldStatus != null ? oldStatus.name() : "UNKNOWN", status.name(), reason, ipAddress);
        return mapLand(land);
    }

    // --- PRODUCTS ---
    @Transactional(readOnly = true)
    public Page<AdminProductResponse> getProducts(int page, int size, ProductCategory category, ProductStatus status, String search) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (status != null) {
            return productRepository.findAll((root, query, cb) -> cb.equal(root.get("availabilityStatus"), status), pageable).map(this::mapProduct);
        }
        return productRepository.findAll(pageable).map(this::mapProduct);
    }

    @Transactional(readOnly = true)
    public AdminProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marketplace product not found with ID: " + id));
        return mapProduct(product);
    }

    @Transactional
    public AdminProductResponse updateProductStatus(String adminEmail, Long id, ProductStatus status, String reason, String ipAddress) {
        User admin = getAdmin(adminEmail);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marketplace product not found with ID: " + id));

        ProductStatus oldStatus = product.getAvailabilityStatus();
        product.setAvailabilityStatus(status);
        if (status == ProductStatus.INACTIVE) {
            product.setActive(false);
        }
        productRepository.save(product);

        auditLogService.logAction(admin, AuditAction.PRODUCT_MODERATED, "MARKETPLACE_PRODUCT", id, oldStatus != null ? oldStatus.name() : "UNKNOWN", status.name(), reason, ipAddress);
        return mapProduct(product);
    }

    // --- SEEDS ---
    @Transactional(readOnly = true)
    public Page<AdminSeedResponse> getSeeds(int page, int size, CropType crop, SeedAvailabilityStatus status, String search) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (status != null) {
            return seedRepository.findAll((root, query, cb) -> cb.equal(root.get("availabilityStatus"), status), pageable).map(this::mapSeed);
        }
        return seedRepository.findAll(pageable).map(this::mapSeed);
    }

    @Transactional(readOnly = true)
    public AdminSeedResponse getSeed(Long id) {
        Seed seed = seedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seed variety not found with ID: " + id));
        return mapSeed(seed);
    }

    @Transactional
    public AdminSeedResponse updateSeedStatus(String adminEmail, Long id, SeedAvailabilityStatus status, String reason, String ipAddress) {
        User admin = getAdmin(adminEmail);
        Seed seed = seedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seed variety not found with ID: " + id));

        SeedAvailabilityStatus oldStatus = seed.getAvailabilityStatus();
        seed.setAvailabilityStatus(status);
        if (status == SeedAvailabilityStatus.UNAVAILABLE) {
            seed.setActive(false);
        }
        seedRepository.save(seed);

        auditLogService.logAction(admin, AuditAction.SEED_MODERATED, "SEED", id, oldStatus != null ? oldStatus.name() : "UNKNOWN", status.name(), reason, ipAddress);
        return mapSeed(seed);
    }

    // --- ORDERS (Read-Only) ---
    @Transactional(readOnly = true)
    public Page<AdminOrderResponse> getOrders(int page, int size, OrderStatus status) {
        int pageNumber = Math.max(0, page);
        int pageSize = Math.min(100, Math.max(1, size));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (status != null) {
            return orderRepository.findAll((root, query, cb) -> cb.equal(root.get("status"), status), pageable).map(this::mapOrder);
        }
        return orderRepository.findAll(pageable).map(this::mapOrder);
    }

    @Transactional(readOnly = true)
    public AdminOrderResponse getOrder(Long id) {
        Order order = orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
        return mapOrder(order);
    }

    // --- MAPPERS ---
    private User getAdmin(String adminEmail) {
        return userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));
    }

    private AdminJobResponse mapJob(Job job) {
        return new AdminJobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getCategory(),
                job.getCrop(),
                job.getLocation(),
                job.getDistrict(),
                job.getState(),
                job.getWage(),
                job.getWageType(),
                job.getWorkersRequired(),
                job.getWorkersSelected(),
                job.getStatus(),
                Boolean.TRUE.equals(job.getActive()),
                job.getCreatedBy() != null ? job.getCreatedBy().getId() : null,
                job.getCreatedBy() != null ? job.getCreatedBy().getFullName() : null,
                job.getCreatedBy() != null ? job.getCreatedBy().getEmail() : null,
                job.getCreatedAt()
        );
    }

    private AdminLandResponse mapLand(LandParcel land) {
        return new AdminLandResponse(
                land.getId(),
                land.getTitle(),
                land.getDescription(),
                land.getLocation(),
                land.getDistrict(),
                land.getState(),
                land.getAcreage(),
                land.getSoilType(),
                land.getWaterSource(),
                land.getAnnualRentPerAcre(),
                land.getTotalAnnualRent(),
                land.getStatus(),
                Boolean.TRUE.equals(land.getActive()),
                land.getOwner() != null ? land.getOwner().getId() : null,
                land.getOwner() != null ? land.getOwner().getFullName() : null,
                land.getOwner() != null ? land.getOwner().getEmail() : null,
                land.getCreatedAt()
        );
    }

    private AdminProductResponse mapProduct(Product product) {
        return new AdminProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getBrand(),
                product.getPrice(),
                product.getUnit(),
                product.getStockQuantity(),
                product.getAvailabilityStatus(),
                Boolean.TRUE.equals(product.getActive()),
                product.getSeller() != null ? product.getSeller().getId() : null,
                product.getSeller() != null ? product.getSeller().getFullName() : null,
                product.getSeller() != null ? product.getSeller().getEmail() : null,
                product.getLocation(),
                product.getDistrict(),
                product.getState(),
                product.getCreatedAt()
        );
    }

    private AdminSeedResponse mapSeed(Seed seed) {
        return new AdminSeedResponse(
                seed.getId(),
                seed.getName(),
                seed.getDescription(),
                seed.getCrop(),
                seed.getCategory(),
                seed.getVariety(),
                seed.getBrand(),
                seed.getPrice(),
                seed.getPriceUnit(),
                seed.getAvailabilityStatus(),
                Boolean.TRUE.equals(seed.getActive()),
                seed.getSupplier() != null ? seed.getSupplier().getId() : null,
                seed.getSupplier() != null ? seed.getSupplier().getFullName() : null,
                seed.getSupplier() != null ? seed.getSupplier().getEmail() : null,
                seed.getCreatedAt()
        );
    }

    private AdminOrderResponse mapOrder(Order order) {
        return new AdminOrderResponse(
                order.getId(),
                order.getBuyer() != null ? order.getBuyer().getId() : null,
                order.getBuyer() != null ? order.getBuyer().getFullName() : null,
                order.getBuyer() != null ? order.getBuyer().getEmail() : null,
                order.getStatus(),
                order.getSubtotal(),
                order.getTotalAmount(),
                order.getShippingAddress(),
                order.getPhone(),
                order.getItems() != null ? order.getItems().size() : 0,
                order.getCreatedAt()
        );
    }
}
