#!/bin/sh
docker compose --env-file .env.local -f docker/production/docker-compose.yml up -d --build