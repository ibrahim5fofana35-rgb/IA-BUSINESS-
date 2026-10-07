# IA-BUSINESS

## Overview
A Vite + React + TypeScript single-page app showing a project status dashboard.

## Stack
- **Frontend**: Vite 6, React 18, TypeScript 5
- **No backend** — mock project data in `src/data/projects.ts`
- **No database** — no persistence layer

## Development
```bash
docker compose -f docker-compose.base44.yml up -d
```
App runs on port 3000 (mapped to container port 5173). Vite dev server with HMR.

## Structure
- `src/App.tsx` — entry component
- `src/components/Dashboard.tsx` — main dashboard with summary cards, filter bar, project grid
- `src/components/ProjectCard.tsx` — individual project card with progress, blockers, deadline
- `src/components/SummaryCards.tsx` — aggregate status counts
- `src/components/StatusBadge.tsx` — status pill
- `src/data/projects.ts` — mock project data
- `src/types.ts` — shared types and status config

## Key Details
- Project statuses: on-track, at-risk, delayed, completed
- "Needs Attention" filter shows at-risk + delayed projects
- Cards with blockers are highlighted with a red border and warning section
- Deadlines within 7 days show in yellow; overdue shows in red
