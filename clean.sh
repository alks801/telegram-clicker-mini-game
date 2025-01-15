#!/bin/bash

# Stop and delete containers
docker-compose down

echo "Dropping database..."
docker-compose exec db psql -U user -d postgres -f /app/db/drop_db.sql

# Delete all docker images
docker rmi $(docker images -q)

# Delete all docker volumes
docker volume rm $(docker volume ls -q)

echo "Project cleaned up!"