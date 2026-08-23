package com.agrinexus.tools.repository;

import com.agrinexus.tools.entity.ToolRentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ToolRentalRequestRepository extends JpaRepository<ToolRentalRequest, Long> {

    @Query("SELECT r FROM ToolRentalRequest r JOIN FETCH r.tool t JOIN FETCH r.renter u JOIN FETCH r.owner o WHERE r.renter.id = :renterId ORDER BY r.createdAt DESC")
    List<ToolRentalRequest> findByRenterIdWithDetails(@Param("renterId") Long renterId);

    @Query("SELECT r FROM ToolRentalRequest r JOIN FETCH r.tool t JOIN FETCH r.renter u JOIN FETCH r.owner o WHERE r.owner.id = :ownerId ORDER BY r.createdAt DESC")
    List<ToolRentalRequest> findByOwnerIdWithDetails(@Param("ownerId") Long ownerId);

    @Query("SELECT r FROM ToolRentalRequest r JOIN FETCH r.tool t JOIN FETCH r.renter u JOIN FETCH r.owner o WHERE r.tool.id = :toolId ORDER BY r.createdAt DESC")
    List<ToolRentalRequest> findByToolIdWithDetails(@Param("toolId") Long toolId);

    @Query("SELECT COUNT(r) > 0 FROM ToolRentalRequest r " +
           "WHERE r.tool.id = :toolId " +
           "AND r.id <> :excludeRequestId " +
           "AND r.status IN (com.agrinexus.tools.entity.RentalRequestStatus.APPROVED, com.agrinexus.tools.entity.RentalRequestStatus.ACTIVE) " +
           "AND r.startDate <= :endDate AND r.endDate >= :startDate")
    boolean hasConflictingApprovedRental(
            @Param("toolId") Long toolId,
            @Param("excludeRequestId") Long excludeRequestId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
