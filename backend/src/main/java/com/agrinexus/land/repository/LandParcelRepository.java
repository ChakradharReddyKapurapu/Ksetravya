package com.agrinexus.land.repository;

import com.agrinexus.land.entity.LandParcel;
import com.agrinexus.land.entity.LandStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandParcelRepository extends JpaRepository<LandParcel, Long>, JpaSpecificationExecutor<LandParcel> {

    Optional<LandParcel> findByIdAndActiveTrue(Long id);

    List<LandParcel> findByOwnerIdAndActiveTrueOrderByCreatedAtDesc(Long ownerId);

    Page<LandParcel> findByActiveTrueAndStatus(LandStatus status, Pageable pageable);

    long countByOwnerId(Long ownerId);

    long countByStatus(LandStatus status);
}
