FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

# Copy only what we need to run the built NestJS app
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "run", "start:prod"]

