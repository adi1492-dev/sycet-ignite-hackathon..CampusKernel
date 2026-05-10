# CampusKernel Development Roadmap

## Phase 1: Infrastructure & Core Identity
- [x] Initialize project monorepo structure (`backend/`, `frontend/`)
- [x] Initialize Go Fiber backend and install dependencies
- [x] Setup local PostgreSQL and Redis environment
- [x] Implement Database connection logic and basic models
- [x] Implement JWT-based Identity API (Login/Register)

## Phase 2: Academic Ledger & Grade Tracking
- [x] Create Academic models (Grade, Assignment, Attendance)
- [x] Build API endpoints for Teachers to manage grades
- [x] Build API endpoints for Students to view marks
- [x] Integrate Redis Pub/Sub for real-time updates

## Phase 3: Kernel Sync & Offline Support
- [x] Setup Next.js Frontend with PWA support (Bootstrap + next-pwa)
- [/] Implement Service Worker for asset caching (Automatic via next-pwa)
- [/] Build offline request queue in IndexedDB
- [/] Implement background sync logic

## Phase 4: Code Sandbox & Broadcast Engine
- [x] Implement Native Execution Engine (C, Go, Rust)
- [x] Build code execution pipeline (Backend logic implemented)
- [ ] Setup MinIO or Local File Server for LAN broadcast
- [x] Implement high-speed file delivery API (Implemented in backend)

## Phase 5: Glassmorphic UI & Polish
- [x] Design and build Student Dashboard
- [x] Design and build Teacher Dashboard
- [x] Implement mobile-responsive glassmorphic UI (Landing Page)
- [ ] Final stress testing and documentation polish

## Current Focus: Fixing Docker Environment & Phase 3 Sync Logic
- [ ] Resolve Redis image pull error in `docker-compose.yml`
- [ ] Implement Phase 3 (IndexedDB Sync)
