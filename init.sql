-- init.sql

-- Create the "dmd_user" table
CREATE TABLE IF NOT EXISTS dmd_user (
    user_id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Create the "message" table
CREATE TABLE IF NOT EXISTS message (
    message_id VARCHAR(255) PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    timestamp BIGINT
);

-- Create the "bot" table
CREATE TABLE IF NOT EXISTS bot (
    character_id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    image TEXT,
    description TEXT,
    id_fine_tuning VARCHAR(255)
);
