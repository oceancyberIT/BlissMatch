#!/bin/sh
set -eu

echo "Running Prisma migrations..."
npx prisma migrate deploy || echo "Prisma migrate deploy failed (likely baseline/P3005). Continuing startup."

if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "No Prisma migrations found. Applying schema with prisma db push..."
  npx prisma db push || echo "Prisma db push failed, continuing startup."
fi

echo "Running Prisma seed..."
npx prisma db seed || echo "Prisma seed skipped or failed, continuing startup."

echo "Starting NestJS application..."
node dist/src/main.js

