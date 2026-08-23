package com.agrinexus.crop.repository;

import com.agrinexus.crop.entity.CropProtection;
import com.agrinexus.seeds.entity.CropType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CropProtectionRepository extends JpaRepository<CropProtection, Long>, JpaSpecificationExecutor<CropProtection> {

    Optional<CropProtection> findByIdAndActiveTrue(Long id);

    List<CropProtection> findByCropAndActiveTrue(CropType crop);

    List<CropProtection> findByActiveTrue();
}
