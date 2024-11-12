#!/usr/bin/env bash
set -e

DATABASE_URL=$1
POSTGRES_USER=$2

# Wait for PostgreSQL to be ready
until pg_isready -h postgresql -U $POSTGRES_USER; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Check if the database has any tables
TABLE_COUNT=$(psql $DATABASE_URL -U $POSTGRES_USER -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';")

if [ "$TABLE_COUNT" -eq "0" ]; then
  echo "No tables found. Running npx prisma migrate dev --name init"
  npx prisma migrate dev --name init

  # Seed the database
  echo "Seeding the database..."
  node dist/prisma/seeder/db-seeder.js
else
  echo "Tables found. Skipping initial migration and seeding."
fi
