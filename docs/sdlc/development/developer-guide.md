# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `ae3ee1a` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
Note Pad 9 is a two-part generated repository: a Vite + React 19 single-page app (frontend/) whose approved screens currently render seeded sample data, and a FastAPI 0.115 service (backend/) that has only a health-check endpoint implemented, with every other route scaffolded as a typed stub until a data model and handlers are built. The backend defaults to a local SQLite file so it runs without any database server, while docker-compose.yml provisions a Postgres 16 container for when DATABASE_URL is pointed at it. The frontend's src/lib/api.ts is the prepared seam for wiring screens to the backend, including bearer-token handling, but no screen calls it yet.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for the frontend, Vite 6 / React 19 toolchain)
- Python 3.12 (matches backend/Dockerfile)
- pip
- Docker and Docker Compose (optional, for the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository.
2. Copy .env.example to .env and fill in values as needed (the code reads DATABASE_URL, ALLOWED_ORIGINS on the backend, and VITE_API_BASE_URL / VITE_API_PROJECT_ID on the frontend).
3. cd backend && pip install -r requirements.txt
4. (Optional) docker compose up -d db -- starts the Postgres 16 container if you want to use Postgres instead of the default SQLite file.
5. cd backend && uvicorn app.main:app --reload -- starts the API; on startup it creates tables from app/models.py against DATABASE_URL (SQLite by default: sqlite:///./app.db).
6. cd frontend && npm install
7. cd frontend && npm run dev -- starts the SPA on the Vite dev server.
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev server | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload; serves /health and the OpenAPI docs. |
| frontend dev server | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA. |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck). |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally. |
| start Postgres | `docker compose up -d db` | Starts the Postgres 16 container defined in docker-compose.yml for local use with DATABASE_URL. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | FastAPI service: app package, tests, Dockerfile, requirements. |
| `backend/app` | Application code: main.py (entrypoint, CORS, lifespan, /health), database.py (engine/session), models.py (SQLAlchemy Base, currently empty), schemas.py (Pydantic schemas, StubResponse), routers/ (one router per architecture component). |
| `backend/tests` | Pytest suite split into unit/ and integration/ (e.g. test_health.py); conftest.py provides fixtures. |
| `frontend/` | Vite + React SPA: source, e2e tests, config files, README describing the approved screens. |
| `frontend/src` | Application source: main.tsx entry, index.css, lib/ (api.ts client, icons.tsx, navigate.ts, ui.tsx component vocabulary), test-setup.ts for Vitest. |
| `frontend/e2e` | Playwright acceptance tests and support helpers (e.g. admin.ts), run against a locally booted backend+frontend or a deployed URL via E2E_BASE_URL. |
| `.devcontainer/` | Devcontainer configuration for a consistent development environment. |
| `docker-compose.yml` | Defines the Postgres 16 database service used when DATABASE_URL targets it instead of the default SQLite file. |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are organized one router per architecture component (backend/app/routers), each stub endpoint returning the typed StubResponse schema until implemented.
- SQLAlchemy models inherit the shared DeclarativeBase in app/database.py; models.py is imported in main.py before create_all so tables register.
- Database access is request-scoped via the get_db dependency, one session per request, closed in a finally block.
- Frontend screens live one module per approved screen (per frontend/README), with shared UI/icon vocabulary in src/lib/ui.tsx and src/lib/icons.tsx.
- All API calls are intended to go through the single apiFetch helper in src/lib/api.ts, which attaches a bearer token (session token if set, otherwise the project id) and normalizes the base URL.
- Code style is enforced by ESLint + Prettier on the frontend and ruff (check and format) on the backend.
- Tests are colocated with what they cover: frontend unit tests beside components (Vitest), Playwright specs under e2e/, and backend tests split into tests/unit and tests/integration.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `cd backend && pytest` | Runs the unit and integration test suite (pythonpath=. set in pytest.ini). |
| backend lint | `cd backend && ruff check .` | Lints the backend code with ruff. |
| backend format | `cd backend && ruff format .` | Formats backend code with ruff. |
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests under jsdom. |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint across the frontend app. |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit (not run as part of build). |
| frontend format check | `cd frontend && npm run format:check` | Checks formatting with Prettier. |
| e2e install browser | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs. |
| e2e tests | `cd frontend && npm run test:e2e` | Runs Playwright specs from e2e/; without E2E_BASE_URL it boots the backend (via .venv) and the built+previewed frontend itself. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend requests to the backend are blocked by CORS. | Set ALLOWED_ORIGINS on the backend to a comma-separated list including the frontend's origin; in development the defaults already cover http://localhost:5173 and http://127.0.0.1:5173. |
| `pytest` fails with an import error for `app` when run from an unexpected directory. | Run pytest from the backend/ directory so pytest.ini's pythonpath = . takes effect, or set PYTHONPATH to backend/ explicitly. |
| Playwright e2e run fails because Chromium is missing. | Run `npm run test:e2e:install` once before `npm run test:e2e`. |
| Backend can't connect to Postgres when DATABASE_URL points at docker-compose's db service. | Ensure `docker compose up -d db` has been run and the container is healthy (pg_isready) before starting uvicorn; use the credentials configured in docker-compose.yml's environment block, replacing the placeholder values there with your own in a real deployment rather than the committed example. |
| `npm run build` succeeds but `tsc` reports type errors. | Run `npm run typecheck` separately and fix reported issues, since build does not typecheck per the frontend README. |
<!-- sdlc:auto:end troubleshooting -->
