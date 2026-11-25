# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run. **Tests** counts the tests written for the story, and **Result** how many last passed, how many failed and when, as of this page's generation; the Documentation tab shows them live.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Test step | Tests | Result | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Self-register with email and password | US-001 | 1 | POST /auth/register, api_backend, database, users, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Sign in with email and password | US-002 | 1 | POST /auth/login, api_backend, database, sessions, users, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Stay signed in across devices and sign out | US-003 | 1 | POST /auth/logout, api_backend, database, sessions, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-001 | Reset a forgotten password via email | US-004, US-004-T1, US-004-T2, US-004-T3 | 2 | POST /auth/reset/confirm, POST /auth/reset/request, api_backend, database, email_service, password_reset_tokens, sessions, users, web_frontend | — | — | not started | not run | 0 | No tests | 0/4 tested · 0/4 passing | — |
| US-005 | EPIC-001 | Delete my own account and data | US-005 | 3 | DELETE /account, api_backend, database, folders, note_tags, notes, sessions, tags, users, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-002 | Create a new note | US-006 | 1 | POST /notes, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Edit note content as rich text | US-007, US-007-T1, US-007-T2, US-007-T3 | 2 | GET /notes/{id}, PATCH /notes/{id}, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Auto-save with last-edited timestamp | US-008 | 3 | PATCH /notes/{id}, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-003 | View my note list dashboard | US-009 | 2 | GET /notes, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-003 | Organise notes with folders | US-010 | 3 | DELETE /folders/{id}, GET /folders, PATCH /notes/{id}, POST /folders, api_backend, database, folders, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-003 | Organise notes with tags | US-011 | 3 | DELETE /notes/{id}/tags/{tag_id}, GET /tags, POST /notes/{id}/tags, api_backend, database, note_tags, notes, tags, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-003 | Full-text search across my notes | US-012, US-012-T1, US-012-T2, US-012-T3 | 4 | GET /notes/search, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-013 | EPIC-004 | Move a note to trash | US-013 | 4 | POST /notes/{id}/trash, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-004 | Restore a note from trash | US-014 | 4 | POST /notes/{id}/restore, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/1 tested · 0/1 passing | — |
| US-015 | EPIC-004 | Permanently delete notes from trash | US-015 | 4 | DELETE /notes/{id}, DELETE /trash, GET /trash, api_backend, database, notes, web_frontend | — | — | not started | not run | 0 | No tests | 0/1 tested · 0/1 passing | — |
| US-016 | EPIC-005 | Use the app responsively on desktop and mobile browsers | US-016 | 5 | web_frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-005 | Use the service free of charge | US-017 | 1 | web_frontend | — | — | not started | not run | 0 | No tests | 0/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
