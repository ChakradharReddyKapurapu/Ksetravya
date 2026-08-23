package com.agrinexus.jobs.repository;

import com.agrinexus.jobs.entity.Job;
import com.agrinexus.jobs.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {

    Optional<Job> findByIdAndActiveTrue(Long id);

    List<Job> findByCreatedByIdAndActiveTrueOrderByCreatedAtDesc(Long createdById);

    Page<Job> findByActiveTrueAndStatus(JobStatus status, Pageable pageable);

    List<Job> findByActiveTrueAndStatus(JobStatus status);

    long countByCreatedById(Long createdById);

    long countByStatus(JobStatus status);
}
