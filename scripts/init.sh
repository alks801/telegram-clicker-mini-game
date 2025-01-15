#!/bin/bash

# Run DB container
docker-compose up -d db

echo "Waiting for the database to start..."
sleep 10

# DB init
echo "Initializing database..."
docker-compose exec db psql -U user -d clicker_game -f /app/db/init_db.sql

echo "Database initialized successfully!"