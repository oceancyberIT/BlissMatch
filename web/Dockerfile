FROM node:20-slim AS base

WORKDIR /app

ENV NODE_ENV=production

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS builder
COPY package.json package-lock.json ./
RUN rm package-lock.json && npm install && npm install \
  lightningcss-linux-x64-gnu \
  @tailwindcss/oxide-linux-x64-gnu \
  --no-save
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]

