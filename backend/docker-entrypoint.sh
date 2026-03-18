#!/bin/sh
set -eu

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running Prisma seed..."
npx prisma db seed || echo "Prisma seed skipped or failed, continuing startup."

echo "Building NestJS application (if needed)..."
npm run build

echo "Listing dist contents..."
ls -R dist || echo "No dist folder found."

echo "Starting NestJS application..."
node dist/src/main.js

