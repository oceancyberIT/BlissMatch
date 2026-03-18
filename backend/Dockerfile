FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=4000

# Build the NestJS app for production
RUN npm run build

EXPOSE 4000

# Ensure the entrypoint script is executable
RUN chmod +x docker-entrypoint.sh

# Run migrations + seed before starting the app
CMD ["sh", "./docker-entrypoint.sh"]

