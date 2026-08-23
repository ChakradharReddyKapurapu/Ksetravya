package com.agrinexus.communication.event;

import com.agrinexus.communication.service.PresenceRegistry;
import com.agrinexus.notification.entity.NotificationPriority;
import com.agrinexus.notification.entity.NotificationType;
import com.agrinexus.notification.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class CommunicationEventListener {

    private static final Logger log = LoggerFactory.getLogger(CommunicationEventListener.class);
    private final NotificationService notificationService;
    private final PresenceRegistry presenceRegistry;
    private final SimpMessagingTemplate messagingTemplate;

    public CommunicationEventListener(
            NotificationService notificationService,
            PresenceRegistry presenceRegistry,
            SimpMessagingTemplate messagingTemplate) {
        this.notificationService = notificationService;
        this.presenceRegistry = presenceRegistry;
        this.messagingTemplate = messagingTemplate;
    }

    @Async
    @EventListener
    public void handleMessageSentEvent(MessageSentEvent event) {
        if (event == null || event.getRecipientIds() == null || event.getRecipientIds().isEmpty()) {
            return;
        }

        String jobText = event.getJobTitle() != null ? " regarding " + event.getJobTitle() : "";
        String title = "New message";
        String messageStr = "You received a new message from " + event.getSenderName() + jobText + ".";

        for (Long recipientId : event.getRecipientIds()) {
            if (recipientId.equals(event.getSenderId())) {
                continue; // Do not notify sender
            }

            String idempotencyKey = "MSG_NOTIF:" + event.getMessageId() + ":" + recipientId;

            try {
                var notifOpt = notificationService.createNotification(
                        recipientId,
                        title,
                        messageStr,
                        NotificationType.MESSAGE_RECEIVED,
                        NotificationPriority.NORMAL,
                        "CONVERSATION",
                        event.getConversationId(),
                        null,
                        idempotencyKey
                );

                if (notifOpt.isPresent() && presenceRegistry.isUserOnline(recipientId)) {
                    messagingTemplate.convertAndSendToUser(
                            recipientId.toString(),
                            "/queue/notifications",
                            notifOpt.get()
                    );
                }
            } catch (Exception e) {
                log.error("Failed to create/deliver message notification for recipient {}", recipientId, e);
            }
        }
    }
}
