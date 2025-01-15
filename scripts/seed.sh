echo "Seeding database..."
docker-compose exec db psql -U user -d clicker_game -f /app/db/seed_db.sql

echo "Database seeded successfully!"