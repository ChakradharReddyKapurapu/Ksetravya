package com.agrinexus.seeds.repository;

import com.agrinexus.seeds.entity.CropType;
import com.agrinexus.seeds.entity.SeasonType;
import com.agrinexus.seeds.entity.Seed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeedRepository extends JpaRepository<Seed, Long>, JpaSpecificationExecutor<Seed> {

    Optional<Seed> findByIdAndActiveTrue(Long id);

    Page<Seed> findByCropAndActiveTrue(CropType crop, Pageable pageable);

    Page<Seed> findBySeasonAndActiveTrue(SeasonType season, Pageable pageable);

    List<Seed> findBySupplierIdAndActiveTrueOrderByCreatedAtDesc(Long supplierId);

    List<Seed> findByActiveTrue();
}
