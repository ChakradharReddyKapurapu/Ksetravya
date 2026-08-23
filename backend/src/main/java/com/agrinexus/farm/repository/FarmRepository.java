package com.agrinexus.farm.repository;

import com.agrinexus.farm.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {

    Optional<Farm> findByUserId(Long userId);

    @Query("SELECT f FROM Farm f JOIN FETCH f.user u WHERE u.email = :email")
    Optional<Farm> findByUserEmail(@Param("email") String email);

    boolean existsByUserId(Long userId);
}
