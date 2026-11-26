# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `8df2c55` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Note pad 9 is a generated scaffold consisting of two independent apps in one repo: a React 19 + Vite SPA (frontend/) with approved, reviewed screens that currently render seeded sample data, and a FastAPI backend (backend/) that has no approved architecture yet beyond a health check. The backend uses SQLAlchemy with a SQLite database by default (swappable via DATABASE_URL, e.g. to the PostgreSQL 16 service defined in docker-compose.yml) and is structured for routers/models/schemas to be added later. The frontend has a lib/api.ts seam ready to connect screens to real endpoints, bearer-token auth support, and Playwright/Vitest test setups.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / React 19 frontend tooling)
- Python 3.12
- pip
- Docker and Docker Compose (optional, for the Postgres 16 service)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (Optional) Copy .env.example to .env and adjust values such as DATABASE_URL / ALLOWED_ORIGINS
5. (Optional) docker compose up -d to start a local PostgreSQL 16 instance
6. Start the backend: cd backend && uvicorn app.main:app --reload
7. Start the frontend: cd frontend && npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the SPA |
| frontend build | `npm run build` | Bundles the app for production (does not typecheck) |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI backend with auto-reload |
| docker compose | `docker compose up -d` | Starts the PostgreSQL 16 database container |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | React 19 + Vite SPA; approved screens running on seeded sample data |
| `frontend/src/screens/` | One module per approved screen (SignIn, Notes, Note, Trash, Account, ResetPassword) |
| `frontend/src/lib/` | Shared API client, UI components, icons, brand tokens, navigation helpers |
| `frontend/e2e/` | Playwright acceptance tests |
| `backend/` | FastAPI service scaffold with only a health check implemented |
| `backend/app/` | Application package: main.py entrypoint, database.py engine/session setup, models.py, schemas.py, routers/ |
| `backend/tests/` | Unit and integration tests (pytest) |
| `.devcontainer/` | Dev container configuration |
| `.quorq/` | Platform handoff metadata |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component, one route per spec endpoint; unimplemented routes return a typed StubResponse rather than raising
- Backend models live in app/models.py, all inheriting SQLAlchemy's Base from app/database.py
- Database prepared at app startup (lifespan), not at import time, so importing the app never opens a connection
- Frontend screens live one-per-file in src/screens/, matching the approved design
- Frontend API access is centralized in src/lib/api.ts (apiFetch, bearer auth, session token in localStorage); screens do not call fetch directly
- CORS origins configured via ALLOWED_ORIGINS env var, defaulting to the Vite dev server origins
- Ruff used for backend linting/formatting; ESLint + Prettier for frontend
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `pytest` | Runs unit and integration tests (pytest.ini sets pythonpath=.) |
| backend lint | `ruff check .` | Lints the backend code |
| backend format | `ruff format .` | Formats the backend code |
| frontend unit tests | `npm run test` | Runs Vitest component tests |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit |
| frontend lint | `npm run lint` | Runs ESLint over the app |
| frontend e2e install | `npm run test:e2e:install` | Installs the Chromium browser for Playwright |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/, booting backend and frontend locally unless E2E_BASE_URL is set |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend cannot reach the backend / CORS errors in the browser console | Ensure the backend is running on http://localhost:8000 and, if customized, set ALLOWED_ORIGINS to include the frontend's dev server origin |
| `npm run build` succeeds but the app is broken | Build does not typecheck; run `npm run typecheck` to catch type errors before shipping |
| `pytest` fails with ModuleNotFoundError: app | Run pytest from the backend/ directory so pytest.ini's pythonpath=. setting applies |
| Playwright e2e tests fail to start the backend | Ensure backend dependencies are installed (the config expects a backend/.venv with packages installed) or set E2E_BASE_URL to point at an already-running deployment |
| Backend has no database tables | Tables are created from app/models.py on startup via create_all; add SQLAlchemy models there, or configure Alembic migrations if alembic.ini is present |
<!-- sdlc:auto:end troubleshooting -->
