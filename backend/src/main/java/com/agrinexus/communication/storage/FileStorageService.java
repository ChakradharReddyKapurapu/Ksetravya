package com.agrinexus.communication.storage;

import org.springframework.core.io.Resource;

import java.io.InputStream;

public interface FileStorageService {

    /**
     * Store file input stream and return unique storage key
     */
    String store(InputStream inputStream, String originalFilename, String contentType);

    /**
     * Load stored file resource by storage key
     */
    Resource loadAsResource(String storageKey);

    /**
     * Delete stored file by storage key
     */
    boolean delete(String storageKey);

    /**
     * Check if storage key exists
     */
    boolean exists(String storageKey);
}
