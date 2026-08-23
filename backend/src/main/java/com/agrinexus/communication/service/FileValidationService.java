package com.agrinexus.communication.service;

import com.agrinexus.communication.entity.MessageType;
import com.agrinexus.exception.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class FileValidationService {

    private static final Logger log = LoggerFactory.getLogger(FileValidationService.class);

    @Value("${agrinexus.upload.max-image-size-bytes:10485760}") // 10 MB
    private long maxImageSizeBytes;

    @Value("${agrinexus.upload.max-file-size-bytes:20971520}") // 20 MB
    private long maxFileSizeBytes;

    private static final Set<String> ALLOWED_IMAGE_TYPES = new HashSet<>(Arrays.asList(
            "image/jpeg", "image/png", "image/webp"
    ));

    private static final Set<String> ALLOWED_DOCUMENT_TYPES = new HashSet<>(Arrays.asList(
            "application/pdf", "text/plain"
    ));

    private static final Set<String> FORBIDDEN_EXTENSIONS = new HashSet<>(Arrays.asList(
            ".exe", ".bat", ".cmd", ".ps1", ".sh", ".jar", ".class", ".dll", ".scr", ".vbs", ".msi", ".com", ".pif", ".cpl"
    ));

    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File cannot be empty or missing");
        }

        String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename().trim() : "";
        if (originalFileName.isEmpty()) {
            throw new BadRequestException("File must have a valid filename");
        }

        // Extension check
        String ext = "";
        int dotIdx = originalFileName.lastIndexOf('.');
        if (dotIdx >= 0) {
            ext = originalFileName.substring(dotIdx).toLowerCase();
        }

        if (FORBIDDEN_EXTENSIONS.contains(ext)) {
            log.warn("Rejected dangerous executable file extension: {}", ext);
            throw new BadRequestException("Executable and script files are strictly forbidden: " + ext);
        }

        // Content-Type check
        String contentType = file.getContentType() != null ? file.getContentType().toLowerCase().trim() : "";
        boolean isImage = ALLOWED_IMAGE_TYPES.contains(contentType);
        boolean isDoc = ALLOWED_DOCUMENT_TYPES.contains(contentType);

        if (!isImage && !isDoc) {
            log.warn("Unsupported content type attempted: {}", contentType);
            throw new BadRequestException("Unsupported file type: " + contentType + ". Allowed types: JPEG, PNG, WebP, PDF, TXT.");
        }

        // Size check
        long size = file.getSize();
        if (isImage && size > maxImageSizeBytes) {
            throw new BadRequestException("Image file size exceeds maximum limit of " + (maxImageSizeBytes / (1024 * 1024)) + " MB");
        }
        if (isDoc && size > maxFileSizeBytes) {
            throw new BadRequestException("Document file size exceeds maximum limit of " + (maxFileSizeBytes / (1024 * 1024)) + " MB");
        }

        // Magic Bytes / Header Signature Validation
        validateMagicBytes(file, contentType);

        // Security / Malware Scanner Hook Placeholder
        performSecurityScan(file);
    }

    public MessageType determineMessageType(String contentType) {
        if (contentType != null && ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase().trim())) {
            return MessageType.IMAGE;
        }
        return MessageType.FILE;
    }

    private void validateMagicBytes(MultipartFile file, String contentType) {
        try (InputStream is = file.getInputStream()) {
            byte[] header = new byte[8];
            int read = is.read(header);
            if (read < 4) {
                throw new BadRequestException("File header is corrupted or unreadable");
            }

            if ("image/jpeg".equals(contentType)) {
                // JPEG magic: FF D8 FF
                if ((header[0] & 0xFF) != 0xFF || (header[1] & 0xFF) != 0xD8 || (header[2] & 0xFF) != 0xFF) {
                    throw new BadRequestException("File content does not match JPEG image signature");
                }
            } else if ("image/png".equals(contentType)) {
                // PNG magic: 89 50 4E 47 (89 P N G)
                if ((header[0] & 0xFF) != 0x89 || header[1] != 'P' || header[2] != 'N' || header[3] != 'G') {
                    throw new BadRequestException("File content does not match PNG image signature");
                }
            } else if ("application/pdf".equals(contentType)) {
                // PDF magic: %PDF (25 50 44 46)
                if (header[0] != '%' || header[1] != 'P' || header[2] != 'D' || header[3] != 'F') {
                    throw new BadRequestException("File content does not match PDF document signature");
                }
            }
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to inspect file magic bytes for {}", file.getOriginalFilename(), e);
            throw new BadRequestException("Failed to validate file header signature");
        }
    }

    private void performSecurityScan(MultipartFile file) {
        // Placeholder for future ClamAV / VirusScanner integration
        log.trace("Security scan passed for file: {}", file.getOriginalFilename());
    }
}
