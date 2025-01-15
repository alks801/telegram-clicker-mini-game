-- Create DB
CREATE DATABASE clicker_game;

-- Connect to DB
\c clicker_game;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'banned')),
    coins BIGINT DEFAULT 0,
    crystals BIGINT DEFAULT 0,
    energy BIGINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS upgrades (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    upgrade_type VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    cost BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS missions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    mission_type VARCHAR(50) NOT NULL,
    progress INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS promotions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    reward_coins BIGINT NOT NULL,
    reward_crystals BIGINT NOT NULL
    is_active BOOLEAN DEFAULT FALSE
);

-- Payments (Telegram Stars и TON)
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    payment_type VARCHAR(10) CHECK (payment_type IN ('stars', 'ton')),
    amount BIGINT NOT NULL,
    status VARCHAR(10) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);