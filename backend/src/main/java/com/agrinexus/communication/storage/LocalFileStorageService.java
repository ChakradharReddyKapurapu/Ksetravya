package com.agrinexus.communication.storage;

import com.agrinexus.exception.BadRequestException;
import com.agrinexus.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(LocalFileStorageService.class);

    private final Path rootLocation;

    public LocalFileStorageService(@Value("${agrinexus.upload.dir:uploads/chat}") String uploadDir) {
        this.rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        init();
    }

    private void init() {
        try {
            Files.createDirectories(this.rootLocation);
            log.info("Initialized LocalFileStorageService at location: {}", this.rootLocation);
        } catch (IOException e) {
            log.error("Could not initialize storage directory at {}", this.rootLocation, e);
            throw new RuntimeException("Could not initialize file storage directory", e);
        }
    }

    @Override
    public String store(InputStream inputStream, String originalFilename, String contentType) {
        if (originalFilename == null || originalFilename.trim().isEmpty()) {
            throw new BadRequestException("Original filename cannot be empty");
        }

        // Extract clean extension safely
        String ext = "";
        int dotIdx = originalFilename.lastIndexOf('.');
        if (dotIdx >= 0 && dotIdx < originalFilename.length() - 1) {
            ext = originalFilename.substring(dotIdx).toLowerCase();
        }

        // Enforce UUID filename generation
        String storedFileName = UUID.randomUUID().toString() + ext;
        Path destinationFile = this.rootLocation.resolve(storedFileName).normalize();

        // Path Traversal Security Check
        if (!destinationFile.startsWith(this.rootLocation)) {
            log.warn("Path traversal security violation attempt: {}", originalFilename);
            throw new BadRequestException("Cannot store file outside designated upload directory");
        }

        try {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            log.info("Successfully stored file {} as {}", originalFilename, storedFileName);
            return storedFileName;
        } catch (IOException e) {
            log.error("Failed to store file {}", originalFilename, e);
            throw new RuntimeException("Failed to store file " + originalFilename, e);
        }
    }

    @Override
    public Resource loadAsResource(String storageKey) {
        try {
            Path file = this.rootLocation.resolve(storageKey).normalize();

            // Security Path Traversal Guard
            if (!file.startsWith(this.rootLocation)) {
                throw new BadRequestException("Access denied: Invalid file path");
            }

            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found or unreadable: " + storageKey);
            }
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not read file: " + storageKey);
        }
    }

    @Override
    public boolean delete(String storageKey) {
        try {
            Path file = this.rootLocation.resolve(storageKey).normalize();

            // Security Path Traversal Guard
            if (!file.startsWith(this.rootLocation)) {
                return false;
            }

            return Files.deleteIfExists(file);
        } catch (IOException e) {
            log.error("Failed to delete file {}", storageKey, e);
            return false;
        }
    }

    @Override
    public boolean exists(String storageKey) {
        try {
            Path file = this.rootLocation.resolve(storageKey).normalize();
            return file.startsWith(this.rootLocation) && Files.exists(file);
        } catch (Exception e) {
            return false;
        }
    }
}
