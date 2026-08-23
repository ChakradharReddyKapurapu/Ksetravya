-- ============================================================
-- AGRI NEXUS — Master Database Initialization Script
-- Engine: MySQL 8.0+
-- Database: agrinexus
-- Charset: utf8mb4 / utf8mb4_unicode_ci
-- ============================================================

CREATE DATABASE IF NOT EXISTS agrinexus
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agrinexus;

-- Initial Database Structure Documentation
-- Domain Tables will be automatically managed via Hibernate JPA (ddl-auto: update)
-- Roles supported: FARMER, WORKER, LAND_OWNER, SELLER, COORDINATOR, ADMIN
