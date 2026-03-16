# BlissMatch Monorepo (Web, API, Mobile)

This repo is a **world-class fullstack template** based on your stack:

- **Web**: Next.js 16 (App Router, React 19, Tailwind 4), mobile-first, modern UI
- **API**: NestJS 10 (Node.js backend)
- **Mobile**: Expo tabs app (React Native 0.73+)
- **Database**: PostgreSQL 16 (with init script)
- **Cache**: Redis 7
- **Infra**: Docker Compose for local dev; ready for Coolify/VPS deploy

---

## Project Structure

```text
BlissMatch/
├── docker-compose.yml
├── .env.example
├── README.md
├── backend/          # NestJS API
├── web/              # Next.js web app (Tailwind, App Router, SSR)
├── mobile/           # Expo app (tabs template)
├── database/
│   └── init/         # Postgres init SQL
└── packages/
    └── shared-types/ # Shared TS types (to be used later)
```

---

## Local Development (Docker Desktop)

### 1. Copy and adjust environment variables

```bash
cd BlissMatch
cp .env.example .env
```

Update any secrets (e.g. `JWT_SECRET`) in `.env` for your local machine.

### 2. Start the full stack

```bash
docker compose up --build
```

Services and local preview ports:

- **Web (Next.js)**: `http://localhost:4001` (mobile-first UI, SSR)
- **API (NestJS)**: `http://localhost:4000`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

The database will be initialized using `database/init/001_init.sql` when the `db` container is first created.

---

## Development without Docker (optional)

You can also run each app directly for faster feedback loops:

```bash
# Web (Next.js)
cd web
npm run dev

# API (NestJS)
cd backend
npm run start:dev

# Mobile (Expo)
cd mobile
npm run start
```

Ensure your `.env` points `NEXT_PUBLIC_API_URL` to `http://localhost:4000` for local API usage.

---

## Coolify / VPS Deployment Notes

When you are ready to deploy to a VPS with **Coolify**:

- **Option 1 — Per-service apps**: Point Coolify at `web/` and `backend/` with individual Dockerfiles and a managed Postgres/Redis instance.
- **Option 2 — Compose app**: Configure Coolify to run `docker-compose.yml` from the repo root.

Key points:

- Use **strong production secrets** (override everything from `.env.example`).
- Use `NODE_ENV=production` and appropriate `API_PORT`, `WEB_PORT`.
- Lock down Postgres and Redis to internal networks only (no public ports in production).

We will refine API routes, DB schema, mobile flows, and production Dockerfiles once you share your specific project content and requirements.

