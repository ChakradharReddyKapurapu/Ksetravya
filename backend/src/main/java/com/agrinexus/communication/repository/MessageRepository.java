package com.agrinexus.communication.repository;

import com.agrinexus.communication.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m JOIN FETCH m.sender WHERE m.conversation.id = :conversationId ORDER BY m.createdAt ASC, m.id ASC")
    Page<Message> findByConversationId(@Param("conversationId") Long conversationId, Pageable pageable);

    @Query("SELECT m FROM Message m JOIN FETCH m.sender WHERE m.conversation.id = :conversationId ORDER BY m.createdAt DESC, m.id DESC")
    Page<Message> findLatestByConversationId(@Param("conversationId") Long conversationId, Pageable pageable);

    @Query("SELECT COUNT(m) FROM Message m " +
           "WHERE m.conversation.id = :conversationId " +
           "AND m.sender.id <> :userId " +
           "AND m.createdAt > :lastReadAt " +
           "AND m.deletedAt IS NULL")
    long countUnreadMessagesInConversation(
            @Param("conversationId") Long conversationId,
            @Param("userId") Long userId,
            @Param("lastReadAt") LocalDateTime lastReadAt);

    @Query("SELECT COUNT(m) FROM Message m " +
           "JOIN m.conversation c " +
           "JOIN c.participants p " +
           "WHERE p.user.id = :userId " +
           "AND p.active = true " +
           "AND c.active = true " +
           "AND m.sender.id <> :userId " +
           "AND m.createdAt > p.lastReadAt " +
           "AND m.deletedAt IS NULL")
    long countTotalUnreadMessagesForUser(@Param("userId") Long userId);

    Optional<Message> findTopByConversationIdOrderByCreatedAtDesc(Long conversationId);

    Optional<Message> findByConversationIdAndSenderIdAndClientMessageId(Long conversationId, Long senderId, String clientMessageId);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.sender.id = :userId AND m.createdAt > :since")
    long countMessagesBySenderSince(@Param("userId") Long userId, @Param("since") LocalDateTime since);
}
