# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Account registration, sign-in and lifecycle: users self-register and sign in to a private account with email/password; sessions persist per device; users can reset a forgotten password via email and delete their own account and data.

Assumptions: sign-in is email/password with sessions persisting across devices; password reset and account deletion rely on a transactional email service configured with an API key placeholder <your-smtp-api-key> (no real credential stored in requirements); no special regulatory constraints beyond standard data protection apply.

**Related:** US-001, US-002, US-003, US-004, US-005

### EPIC-002 · approved · source: planning:EPIC-002

Writing and editing notes: users create and edit rich-text notes (bold, lists, headings) that auto-save and display a last-edited timestamp.

Assumptions: standard note CRUD with auto-save and last-edited timestamp; file and image attachments are out of scope; notes are entirely private and never shared.

**Related:** US-006, US-007, US-008

### EPIC-003 · approved · source: planning:EPIC-003

Organising, listing and searching notes: users see a dashboard of only their own notes, organise with folders and/or tags, and find notes via full-text search.

Assumptions: notes are organised via folders and/or tags and findable through full-text search; each user sees only their own notes.

**Related:** US-009, US-010, US-011, US-012

### EPIC-004 · approved · source: planning:EPIC-004

Deleting notes and trash: deleted notes move to a trash/recycle area before permanent removal, allowing recovery.

Assumption: deleted notes go to a trash/recycle area before permanent deletion.

**Related:** US-013, US-014, US-015

### EPIC-005 · approved · source: planning:EPIC-005

Platform delivery and access model: delivered as a responsive web app for desktop and mobile browsers, no native app, free to use with no payments or tiers.

Assumptions: responsive web app only, no native mobile/desktop app; free to use with no payments or tiers in the first version; expected scale is modest (thousands of individual consumers).

**Related:** US-016, US-017

### PLAN-SPRINT-1 · approved · source: planning:Sprint 1

Sprint 1 goal: stand up authentication (registration, login, session persistence/logout) and basic note creation; confirm the app requires no payment.

Capacity: 20 points.

**Related:** EPIC-001, EPIC-002, EPIC-005

### PLAN-SPRINT-2 · approved · source: planning:Sprint 2

Sprint 2 goal: add password reset via email, rich-text formatting for notes, and the note list dashboard.

Capacity: 20 points.

**Related:** EPIC-001, EPIC-002, EPIC-003

### PLAN-SPRINT-3 · approved · source: planning:Sprint 3

Sprint 3 goal: deliver auto-save with last-edited timestamps, folders and tags organisation, and self-service account deletion.

Capacity: 20 points.

**Related:** EPIC-001, EPIC-002, EPIC-003

### PLAN-SPRINT-4 · approved · source: planning:Sprint 4

Sprint 4 goal: deliver the trash lifecycle (move, restore, permanent delete) and full-text search across notes.

Capacity: 20 points.

**Related:** EPIC-003, EPIC-004

### PLAN-SPRINT-5 · approved · source: planning:Sprint 5

Sprint 5 goal: polish the responsive layout so all note features work well on desktop and mobile browsers.

Capacity: 20 points.

**Related:** EPIC-005

### PLAN-BACKLOG · approved · source: planning:plan

Backlog item assignments (role and point estimates) as approved in the plan; the plan does not state which sprint each item was assigned to.

- US-001 (story): 5 pts, backend-agent
- US-002 (story): 5 pts, backend-agent
- US-003 (story): 5 pts, backend-agent
- US-004 (story): 8 pts, backend-agent
  - US-004-T1 (task): Implement password reset request and confirm endpoints, backend-agent
  - US-004-T2 (task): Integrate SMTP email service for reset link delivery, integration-agent
  - US-004-T3 (task): Build frontend reset-request and set-new-password screens, frontend-agent
- US-005 (story): 5 pts, backend-agent
- US-006 (story): 3 pts, frontend-agent
- US-007 (story): 8 pts, frontend-agent
  - US-007-T1 (task): Integrate rich-text editor with bold, list and heading controls, frontend-agent
  - US-007-T2 (task): Persist formatted note content via the notes API, backend-agent
  - US-007-T3 (task): Add formatting round-trip test coverage, qa-agent
- US-008 (story): 5 pts, backend-agent
- US-009 (story): 3 pts, frontend-agent
- US-010 (story): 5 pts, backend-agent
- US-011 (story): 5 pts, backend-agent
- US-012 (story): 8 pts, backend-agent
  - US-012-T1 (task): Add full-text search index migration on notes, backend-agent
  - US-012-T2 (task): Implement the notes search endpoint, backend-agent
  - US-012-T3 (task): Build frontend search bar and no-results state, frontend-agent
- US-013 (story): 3 pts, backend-agent
- US-014 (story): 2 pts, backend-agent
- US-015 (story): 3 pts, backend-agent
- US-016 (story): 5 pts, frontend-agent
- US-017 (story): 1 pt, frontend-agent

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005
<!-- sdlc:auto:end narrative -->
