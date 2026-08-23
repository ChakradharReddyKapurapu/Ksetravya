package com.agrinexus.jobs.repository;

import com.agrinexus.jobs.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByWorkerIdOrderByAppliedAtDesc(Long workerId);

    List<JobApplication> findByJobIdOrderByAppliedAtDesc(Long jobId);

    Optional<JobApplication> findByJobIdAndWorkerId(Long jobId, Long workerId);

    @Query("SELECT ja FROM JobApplication ja JOIN FETCH ja.worker JOIN FETCH ja.job WHERE ja.id = :id")
    Optional<JobApplication> findByIdWithDetails(@Param("id") Long id);
}
