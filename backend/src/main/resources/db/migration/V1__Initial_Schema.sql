-- =============================================================================
-- AGRI NEXUS - PRODUCTION FLYWAY MIGRATION V1 INITIAL SCHEMA
-- =============================================================================

-- 1. USERS & SECURITY
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. FARMS & AGRICULTURAL PROFILES
CREATE TABLE IF NOT EXISTS farms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    farm_name VARCHAR(120),
    location VARCHAR(200) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    area DOUBLE NOT NULL,
    area_unit VARCHAR(30) DEFAULT 'Acres',
    soil_type VARCHAR(80),
    water_availability VARCHAR(60),
    irrigation_type VARCHAR(60),
    current_crop VARCHAR(100),
    season VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_farm_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_farm_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. SEED VARIETIES CATALOG
CREATE TABLE IF NOT EXISTS seeds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    crop VARCHAR(100) NOT NULL,
    variety_name VARCHAR(120) NOT NULL,
    season VARCHAR(50),
    soil_type VARCHAR(80),
    duration_days INT,
    expected_yield VARCHAR(100),
    water_requirement VARCHAR(60),
    description VARCHAR(2000),
    supplier VARCHAR(120),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_seed_crop (crop),
    INDEX idx_seed_season (season)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. CROP PROTECTION & PEST ADVISORIES
CREATE TABLE IF NOT EXISTS crop_protections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    crop VARCHAR(100) NOT NULL,
    problem_type VARCHAR(50) NOT NULL,
    problem_name VARCHAR(120) NOT NULL,
    symptoms VARCHAR(2000),
    organic_solution VARCHAR(2000),
    chemical_solution VARCHAR(2000),
    preventive_measures VARCHAR(2000),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cp_crop (crop),
    INDEX idx_cp_type (problem_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. MARKETPLACE PRODUCTS & ORDERS
CREATE TABLE IF NOT EXISTS marketplace_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seller_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(3000),
    price DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit VARCHAR(30) DEFAULT 'kg',
    location VARCHAR(200),
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_mp_seller FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_mp_seller (seller_id),
    INDEX idx_mp_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. AGRICULTURAL JOBS & WORKER APPLICATIONS
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_by_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(3000),
    category VARCHAR(50) NOT NULL,
    crop VARCHAR(100),
    location VARCHAR(200) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    estimated_days INT,
    workers_required INT NOT NULL DEFAULT 1,
    workers_selected INT NOT NULL DEFAULT 0,
    wage DECIMAL(12, 2) NOT NULL,
    wage_type VARCHAR(30) NOT NULL DEFAULT 'PER_DAY',
    accommodation_provided BOOLEAN NOT NULL DEFAULT FALSE,
    food_provided BOOLEAN NOT NULL DEFAULT FALSE,
    transport_provided BOOLEAN NOT NULL DEFAULT FALSE,
    tools_provided VARCHAR(500),
    experience_required VARCHAR(500),
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_job_creator FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_job_status (status),
    INDEX idx_job_category (category),
    INDEX idx_job_created_by (created_by_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    worker_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    cover_note VARCHAR(1000),
    applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ja_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_ja_worker FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ja_job (job_id),
    INDEX idx_ja_worker (worker_id),
    INDEX idx_ja_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. CHAT CONVERSATIONS, MESSAGES & ATTACHMENTS
CREATE TABLE IF NOT EXISTS conversations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_conv_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS conversation_participants (
    conversation_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (conversation_id, user_id),
    CONSTRAINT fk_cp_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    content VARCHAR(4000),
    message_type VARCHAR(30) NOT NULL DEFAULT 'TEXT',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_msg_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_msg_conv (conversation_id),
    INDEX idx_msg_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS message_attachments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    checksum VARCHAR(100),
    width INT,
    height INT,
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_att_msg FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    INDEX idx_att_msg (message_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. NOTIFICATIONS & PREFERENCES
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recipient_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    type VARCHAR(50) NOT NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    reference_type VARCHAR(50),
    reference_id BIGINT,
    action_url VARCHAR(500),
    read_status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user (recipient_id),
    INDEX idx_notif_read (read_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. PAYMENTS & TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    payer_id BIGINT NOT NULL,
    payee_id BIGINT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    gross_amount DECIMAL(12, 2),
    platform_fee DECIMAL(12, 2),
    net_worker_amount DECIMAL(12, 2),
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status VARCHAR(30) NOT NULL DEFAULT 'CREATED',
    provider VARCHAR(50) NOT NULL,
    provider_order_id VARCHAR(100),
    provider_payment_id VARCHAR(100),
    provider_signature VARCHAR(255),
    provider_event_id VARCHAR(100),
    idempotency_key VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tx_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_tx_payer FOREIGN KEY (payer_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tx_payee FOREIGN KEY (payee_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_tx_payer (payer_id),
    INDEX idx_tx_payee (payee_id),
    INDEX idx_tx_job (job_id),
    INDEX idx_tx_status (status),
    INDEX idx_tx_provider_order (provider_order_id),
    INDEX idx_tx_idempotency (idempotency_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
