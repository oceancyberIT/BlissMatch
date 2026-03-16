-- Initial PostgreSQL setup for BlissMatch
-- This will run automatically when the db container is created

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example table for health checks; replace/extend in project-specific phase
CREATE TABLE IF NOT EXISTS health_checks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  label text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

