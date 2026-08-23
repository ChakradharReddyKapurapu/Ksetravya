-- =============================================================================
-- AGRI NEXUS / KṢETRAVYA - PRODUCTION FLYWAY MIGRATION V3 COMPLETE SCHEMA (MYSQL 5.5 COMPATIBLE)
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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_farm_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_farm_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    INDEX idx_seed_crop (crop),
    INDEX idx_seed_season (season)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    INDEX idx_cp_crop (crop),
    INDEX idx_cp_type (problem_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_mp_seller FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_mp_seller (seller_id),
    INDEX idx_mp_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS shopping_carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    CONSTRAINT fk_ci_cart FOREIGN KEY (cart_id) REFERENCES shopping_carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_ci_prod FOREIGN KEY (product_id) REFERENCES marketplace_products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_job_creator FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_job_status (status),
    INDEX idx_job_category (category),
    INDEX idx_job_created_by (created_by_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    worker_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    message VARCHAR(1000),
    applied_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ja_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_ja_worker FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ja_job (job_id),
    INDEX idx_ja_worker (worker_id),
    INDEX idx_ja_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 7. CHAT CONVERSATIONS, MESSAGES & ATTACHMENTS
CREATE TABLE IF NOT EXISTS conversations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_conv_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS conversation_participants (
    conversation_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (conversation_id, user_id),
    CONSTRAINT fk_cp_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    content VARCHAR(4000),
    message_type VARCHAR(30) NOT NULL DEFAULT 'TEXT',
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    CONSTRAINT fk_msg_conv FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_msg_conv (conversation_id),
    INDEX idx_msg_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    uploaded_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    CONSTRAINT fk_att_msg FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    INDEX idx_att_msg (message_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 8. NOTIFICATIONS & PREFERENCES
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    reference_type VARCHAR(50),
    reference_id BIGINT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at DATETIME,
    expires_at DATETIME,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at DATETIME,
    idempotency_key VARCHAR(150),
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user_read_del (user_id, is_read, is_deleted, created_at),
    INDEX idx_notif_user_idemp (user_id, idempotency_key),
    INDEX idx_notif_type (type),
    INDEX idx_notif_priority (priority),
    INDEX idx_notif_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 10. EQUIPMENT / TOOLS & RENTALS
CREATE TABLE IF NOT EXISTS equipment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(2000),
    rental_rate_per_day DECIMAL(10, 2) NOT NULL,
    location VARCHAR(200) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_eq_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS equipment_rentals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    equipment_id BIGINT NOT NULL,
    renter_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_er_eq FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
    CONSTRAINT fk_er_renter FOREIGN KEY (renter_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 11. LAND & LEASE LISTINGS
CREATE TABLE IF NOT EXISTS lands (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    area_acres DOUBLE NOT NULL,
    location VARCHAR(200) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100) NOT NULL,
    lease_rate_per_year DECIMAL(12, 2) NOT NULL,
    description VARCHAR(2000),
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_land_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 12. MARKET PRICES & WEATHER ADVISORIES
CREATE TABLE IF NOT EXISTS market_prices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    commodity VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    market VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100) NOT NULL,
    minimum_price DECIMAL(10, 2),
    maximum_price DECIMAL(10, 2),
    modal_price DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'Quintal',
    price_date DATE NOT NULL,
    source VARCHAR(100),
    volume DOUBLE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_mp_comm (commodity),
    INDEX idx_mp_date (price_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS weather_advisories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    condition_text VARCHAR(100) NOT NULL,
    temperature_c DOUBLE,
    humidity_percent INT,
    rainfall_mm DOUBLE,
    advisory_text VARCHAR(2000) NOT NULL,
    advisory_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    INDEX idx_wa_region (region),
    INDEX idx_wa_date (advisory_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 13. ADMIN ANNOUNCEMENTS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(4000) NOT NULL,
    target_role VARCHAR(30) DEFAULT 'ALL',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_user_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    old_value VARCHAR(500),
    new_value VARCHAR(500),
    reason VARCHAR(1000),
    ip_address VARCHAR(45),
    created_at DATETIME NOT NULL DEFAULT '2026-01-01 00:00:00',
    CONSTRAINT fk_aal_admin FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
