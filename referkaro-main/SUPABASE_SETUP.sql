-- Run this in Supabase Dashboard -> SQL Editor -> New query.
-- This table stores ReferKaro's existing application state as one JSONB document.
create table if not exists public.app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Keep direct client access disabled. The Node.js backend uses the service-role key.
alter table public.app_state enable row level security;
