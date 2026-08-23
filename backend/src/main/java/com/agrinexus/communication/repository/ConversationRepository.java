package com.agrinexus.communication.repository;

import com.agrinexus.communication.entity.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT DISTINCT c FROM Conversation c " +
           "JOIN c.participants p " +
           "WHERE p.user.id = :userId AND p.active = true AND c.active = true " +
           "ORDER BY c.lastMessageAt DESC")
    Page<Conversation> findUserConversations(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT c FROM Conversation c " +
           "JOIN c.participants p1 " +
           "JOIN c.participants p2 " +
           "WHERE c.job.id = :jobId " +
           "AND c.active = true " +
           "AND p1.user.id = :userId1 " +
           "AND p2.user.id = :userId2")
    Optional<Conversation> findExistingJobConversation(
            @Param("jobId") Long jobId,
            @Param("userId1") Long userId1,
            @Param("userId2") Long userId2);

    @Query("SELECT DISTINCT c FROM Conversation c " +
           "LEFT JOIN FETCH c.participants p " +
           "LEFT JOIN FETCH p.user " +
           "LEFT JOIN FETCH c.job " +
           "WHERE c.id = :id")
    Optional<Conversation> findByIdWithDetails(@Param("id") Long id);
}
