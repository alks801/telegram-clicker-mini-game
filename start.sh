#!/bin/bash

# Run containers
docker-compose up -d

# DB init
./init.sh

echo "Project is running!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"