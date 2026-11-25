# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | health | `backend/app/main.py:84` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- DELETE /account
- DELETE /folders/{id}
- DELETE /notes/{id}
- DELETE /notes/{id}/tags/{tag_id}
- DELETE /trash
- GET /folders
- GET /notes
- GET /notes/search
- GET /notes/{id}
- GET /tags
- GET /trash
- PATCH /notes/{id}
- POST /auth/login
- POST /auth/logout
- POST /auth/register
- POST /auth/reset/confirm
- POST /auth/reset/request
- POST /folders
- POST /notes
- POST /notes/{id}/restore
- POST /notes/{id}/tags
- POST /notes/{id}/trash
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `ae3ee1a`
<!-- sdlc:auto:end source -->
