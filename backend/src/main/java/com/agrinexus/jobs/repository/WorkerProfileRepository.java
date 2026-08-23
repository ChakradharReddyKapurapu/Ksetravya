package com.agrinexus.jobs.repository;

import com.agrinexus.jobs.entity.WorkerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkerProfileRepository extends JpaRepository<WorkerProfile, Long> {

    Optional<WorkerProfile> findByUserId(Long userId);

    Optional<WorkerProfile> findByUserEmail(String email);
}
