# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up authentication (registration, login, session persistence/logout) and basic note creation; confirm the app requires no payment.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Self-register with email and password | 5 | backend-agent | — |
| US-002 | Story | Sign in with email and password | 5 | backend-agent | US-001 |
| US-003 | Story | Stay signed in across devices and sign out | 5 | backend-agent | US-002 |
| US-006 | Story | Create a new note | 3 | frontend-agent | US-002 |
| US-017 | Story | Use the service free of charge | 1 | frontend-agent | — |

## Sprint 2: Sprint 2

Add password reset via email, rich-text formatting for notes, and the note list dashboard.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Reset a forgotten password via email | 8 | backend-agent | US-001, US-003 |
| ↳ US-004-T1 | Task | Implement password reset request and confirm endpoints | — | backend-agent | — |
| ↳ US-004-T2 | Task | Integrate SMTP email service for reset link delivery | — | integration-agent | — |
| ↳ US-004-T3 | Task | Build frontend reset-request and set-new-password screens | — | frontend-agent | — |
| US-007 | Story | Edit note content as rich text | 8 | frontend-agent | US-006 |
| ↳ US-007-T1 | Task | Integrate rich-text editor with bold, list and heading controls | — | frontend-agent | — |
| ↳ US-007-T2 | Task | Persist formatted note content via the notes API | — | backend-agent | — |
| ↳ US-007-T3 | Task | Add formatting round-trip test coverage | — | qa-agent | — |
| US-009 | Story | View my note list dashboard | 3 | frontend-agent | US-006 |

## Sprint 3: Sprint 3

Deliver auto-save with last-edited timestamps, folders and tags organisation, and self-service account deletion.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Delete my own account and data | 5 | backend-agent | US-001, US-003 |
| US-008 | Story | Auto-save with last-edited timestamp | 5 | backend-agent | US-006 |
| US-010 | Story | Organise notes with folders | 5 | backend-agent | US-006 |
| US-011 | Story | Organise notes with tags | 5 | backend-agent | US-006 |

## Sprint 4: Sprint 4

Deliver the trash lifecycle (move, restore, permanent delete) and full-text search across notes.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Full-text search across my notes | 8 | backend-agent | US-006, US-009 |
| ↳ US-012-T1 | Task | Add full-text search index migration on notes | — | backend-agent | — |
| ↳ US-012-T2 | Task | Implement the notes search endpoint | — | backend-agent | — |
| ↳ US-012-T3 | Task | Build frontend search bar and no-results state | — | frontend-agent | — |
| US-013 | Story | Move a note to trash | 3 | backend-agent | US-006 |
| US-014 | Story | Restore a note from trash | 2 | backend-agent | US-013 |
| US-015 | Story | Permanently delete notes from trash | 3 | backend-agent | US-013 |

## Sprint 5: Sprint 5

Polish the responsive layout so all note features work well on desktop and mobile browsers.

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Use the app responsively on desktop and mobile browsers | 5 | frontend-agent | US-006, US-007, US-009, US-010, US-011, US-012, US-013 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
