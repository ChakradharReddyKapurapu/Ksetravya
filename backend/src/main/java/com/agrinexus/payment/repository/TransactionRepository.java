package com.agrinexus.payment.repository;

import com.agrinexus.payment.entity.Transaction;
import com.agrinexus.payment.entity.TransactionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByJobId(Long jobId);

    Page<Transaction> findByPayerId(Long payerId, Pageable pageable);

    Page<Transaction> findByPayeeId(Long payeeId, Pageable pageable);

    Optional<Transaction> findByProviderOrderId(String providerOrderId);

    Optional<Transaction> findByIdempotencyKey(String idempotencyKey);

    Optional<Transaction> findByProviderEventId(String providerEventId);

    List<Transaction> findByJobIdAndStatusIn(Long jobId, List<TransactionStatus> statuses);

    @Query("SELECT COALESCE(SUM(t.netWorkerAmount), 0) FROM Transaction t WHERE t.payee.id = :payeeId AND t.status = :status")
    BigDecimal sumNetWorkerAmountByPayeeIdAndStatus(@Param("payeeId") Long payeeId, @Param("status") TransactionStatus status);
}
