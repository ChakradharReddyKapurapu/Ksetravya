package com.agrinexus.tools.repository;

import com.agrinexus.tools.entity.Tool;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToolRepository extends JpaRepository<Tool, Long>, JpaSpecificationExecutor<Tool> {

    Optional<Tool> findByIdAndActiveTrue(Long id);

    List<Tool> findByOwnerIdAndActiveTrueOrderByCreatedAtDesc(Long ownerId);

    Page<Tool> findByOwnerIdAndActiveTrue(Long ownerId, Pageable pageable);
}
