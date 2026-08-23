package com.agrinexus;

import com.agrinexus.auth.JwtUtils;
import com.agrinexus.auth.UserPrincipal;
import com.agrinexus.communication.controller.AttachmentController;
import com.agrinexus.communication.dto.MessageResponse;
import com.agrinexus.communication.entity.Conversation;
import com.agrinexus.communication.entity.ConversationParticipant;
import com.agrinexus.communication.entity.ConversationType;
import com.agrinexus.communication.entity.MessageType;
import com.agrinexus.communication.repository.ConversationParticipantRepository;
import com.agrinexus.communication.repository.ConversationRepository;
import com.agrinexus.communication.repository.MessageAttachmentRepository;
import com.agrinexus.communication.repository.MessageRepository;
import com.agrinexus.communication.service.MessageService;
import com.agrinexus.exception.BadRequestException;
import com.agrinexus.user.Role;
import com.agrinexus.user.User;
import com.agrinexus.user.UserRepository;
import com.agrinexus.user.UserStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@SpringBootTest
public class AttachmentCommunicationIntegrationTest {

    @Autowired
    private MessageService messageService;

    @Autowired
    private AttachmentController attachmentController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationParticipantRepository participantRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageAttachmentRepository attachmentRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User farmerUser;
    private User workerUser;
    private User unrelatedUser;

    private Conversation conversation;

    @BeforeEach
    void setUp() {
        attachmentRepository.deleteAll();
        messageRepository.deleteAll();
        participantRepository.deleteAll();
        conversationRepository.deleteAll();

        farmerUser = getOrCreateUser("Ramesh", "Farmer", "att.farmer@agrinexus.com", "9848099001", Role.FARMER);
        workerUser = getOrCreateUser("Suri", "Worker", "att.worker@agrinexus.com", "9848099002", Role.WORKER);
        unrelatedUser = getOrCreateUser("Kalyan", "Unrelated", "att.unrelated@agrinexus.com", "9848099003", Role.WORKER);

        conversation = new Conversation(ConversationType.JOB, null);
        conversation = conversationRepository.save(conversation);

        ConversationParticipant p1 = new ConversationParticipant(conversation, farmerUser);
        ConversationParticipant p2 = new ConversationParticipant(conversation, workerUser);
        participantRepository.save(p1);
        participantRepository.save(p2);
    }

    private User getOrCreateUser(String first, String last, String email, String phone, Role role) {
        return userRepository.findByEmail(email).orElseGet(() -> {
            User u = User.builder()
                    .firstName(first)
                    .lastName(last)
                    .email(email)
                    .password(passwordEncoder.encode("Password123!"))
                    .phone(phone)
                    .role(role)
                    .enabled(true)
                    .build();
            u.setStatus(UserStatus.ACTIVE);
            return userRepository.save(u);
        });
    }

    @Test
    @DisplayName("Test Valid JPEG Crop Image Upload & Magic Bytes Validation")
    void testValidImageUpload() {
        // Valid JPEG Header Signature: FF D8 FF E0 00 10 4A 46 49 46
        byte[] jpegBytes = new byte[] { (byte)0xFF, (byte)0xD8, (byte)0xFF, (byte)0xE0, 0x00, 0x10, 'J', 'F', 'I', 'F' };
        MockMultipartFile imageFile = new MockMultipartFile("files", "crop_field.jpg", "image/jpeg", jpegBytes);

        MessageResponse response = messageService.sendAttachmentMessage(
                farmerUser.getEmail(),
                conversation.getId(),
                "Here is the Paddy crop photo",
                "client-img-101",
                List.of(imageFile)
        );

        Assertions.assertNotNull(response);
        Assertions.assertEquals(MessageType.IMAGE, response.getMessageType());
        Assertions.assertEquals("Here is the Paddy crop photo", response.getContent());
        Assertions.assertEquals(1, response.getAttachments().size());
        Assertions.assertEquals("crop_field.jpg", response.getAttachments().get(0).getFileName());
        Assertions.assertEquals("image/jpeg", response.getAttachments().get(0).getContentType());
    }

    @Test
    @DisplayName("Test Valid Agricultural PDF Document Upload")
    void testValidPDFUpload() {
        // Valid PDF Header Signature: %PDF-1.5
        byte[] pdfBytes = "%PDF-1.5 Sample Agricultural Soil Report Content".getBytes();
        MockMultipartFile pdfFile = new MockMultipartFile("files", "soil_analysis.pdf", "application/pdf", pdfBytes);

        MessageResponse response = messageService.sendAttachmentMessage(
                workerUser.getEmail(),
                conversation.getId(),
                "Attached soil report",
                "client-pdf-102",
                List.of(pdfFile)
        );

        Assertions.assertNotNull(response);
        Assertions.assertEquals(MessageType.FILE, response.getMessageType());
        Assertions.assertEquals(1, response.getAttachments().size());
        Assertions.assertEquals("soil_analysis.pdf", response.getAttachments().get(0).getFileName());
        Assertions.assertEquals("application/pdf", response.getAttachments().get(0).getContentType());
    }

    @Test
    @DisplayName("Test Executable File Rejection Security Guard")
    void testExecutableFileRejection() {
        byte[] exeBytes = "MZ...Executable file".getBytes();
        MockMultipartFile exeFile = new MockMultipartFile("files", "malware.exe", "application/octet-stream", exeBytes);

        Assertions.assertThrows(BadRequestException.class, () ->
                messageService.sendAttachmentMessage(
                        farmerUser.getEmail(),
                        conversation.getId(),
                        "Check this tool",
                        "client-exe-103",
                        List.of(exeFile)
                )
        );
    }

    @Test
    @DisplayName("Test Fake Extension Header Signature Rejection")
    void testFakeExtensionMagicBytesRejection() {
        // Fake PDF with invalid text header bytes
        byte[] fakePdfBytes = "INVALID_NOT_A_PDF_HEADER".getBytes();
        MockMultipartFile fakePdfFile = new MockMultipartFile("files", "fake.pdf", "application/pdf", fakePdfBytes);

        Assertions.assertThrows(BadRequestException.class, () ->
                messageService.sendAttachmentMessage(
                        farmerUser.getEmail(),
                        conversation.getId(),
                        "Fake PDF test",
                        "client-fake-104",
                        List.of(fakePdfFile)
                )
        );
    }

    @Test
    @DisplayName("Test Attachment Download Authorization Guard")
    void testAttachmentDownloadAuthorization() {
        byte[] pdfBytes = "%PDF-1.4 Official Farm Invoice".getBytes();
        MockMultipartFile pdfFile = new MockMultipartFile("files", "invoice.pdf", "application/pdf", pdfBytes);

        MessageResponse msgRes = messageService.sendAttachmentMessage(
                farmerUser.getEmail(),
                conversation.getId(),
                "Invoice attached",
                "client-inv-105",
                List.of(pdfFile)
        );

        Long attId = msgRes.getAttachments().get(0).getId();

        // 1. Authorized Participant (Farmer) Download -> Success 200
        UserPrincipal farmerPrincipal = UserPrincipal.create(farmerUser);
        ResponseEntity<Resource> farmerDownload = attachmentController.downloadAttachment(farmerPrincipal, attId);
        Assertions.assertEquals(200, farmerDownload.getStatusCode().value());
        Assertions.assertNotNull(farmerDownload.getBody());

        // 2. Unauthorized User (Unrelated User B) Download -> 403 Forbidden
        UserPrincipal unrelatedPrincipal = UserPrincipal.create(unrelatedUser);
        Assertions.assertThrows(AccessDeniedException.class, () ->
                attachmentController.downloadAttachment(unrelatedPrincipal, attId)
        );
    }
}
