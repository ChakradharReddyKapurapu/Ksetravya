package com.agrinexus.communication.repository;

import com.agrinexus.communication.entity.MessageAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageAttachmentRepository extends JpaRepository<MessageAttachment, Long> {

    List<MessageAttachment> findByMessageId(Long messageId);

    @Query("SELECT a FROM MessageAttachment a JOIN FETCH a.message m JOIN FETCH m.conversation WHERE a.id = :id")
    Optional<MessageAttachment> findByIdWithConversation(@Param("id") Long id);
}
