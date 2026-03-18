#!/bin/sh
set -eu

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running Prisma seed..."
npx prisma db seed || echo "Prisma seed skipped or failed, continuing startup."

echo "Starting NestJS application..."
node dist/main

