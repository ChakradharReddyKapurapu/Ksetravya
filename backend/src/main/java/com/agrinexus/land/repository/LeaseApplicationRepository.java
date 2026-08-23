package com.agrinexus.land.repository;

import com.agrinexus.land.entity.LeaseApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseApplicationRepository extends JpaRepository<LeaseApplication, Long> {

    List<LeaseApplication> findByFarmerIdOrderByAppliedAtDesc(Long farmerId);

    List<LeaseApplication> findByParcelIdOrderByAppliedAtDesc(Long parcelId);

    Optional<LeaseApplication> findByParcelIdAndFarmerId(Long parcelId, Long farmerId);

    @Query("SELECT la FROM LeaseApplication la JOIN FETCH la.farmer JOIN FETCH la.parcel WHERE la.id = :id")
    Optional<LeaseApplication> findByIdWithDetails(@Param("id") Long id);
}
