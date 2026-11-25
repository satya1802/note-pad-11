# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Covers self-registration, sign-in, cross-device session persistence/sign-out, password reset via email, and self-service account deletion for a private personal account.

Goal: users self-register and sign in to a private account with email and password; sessions persist across devices; signing out ends the session; forgotten passwords can be reset via email; users can delete their own account and all associated data. Assumptions stated: sign-in is email/password with cross-device session persistence; password reset and account deletion rely on a transactional email service (e.g. SendGrid) configured with an API key placeholder (no real credential stored); no special regulatory constraints beyond standard data protection apply.

**Related:** US-001, US-002, US-003, US-004, US-005

### EPIC-002 · approved · source: planning:EPIC-002

Covers creating and rich-text editing of notes, with automatic saving and a visible last-edited timestamp.

Goal: users create and edit rich-text notes (bold, lists, headings); notes auto-save as the user types and display a last-edited timestamp. Assumptions stated: standard note CRUD with auto-save and last-edited timestamp; file and image attachments are out of scope; notes are entirely private and never shared.

**Related:** US-006, US-007, US-008

### EPIC-003 · approved · source: planning:EPIC-003

Covers the personal note-list dashboard, organisation via folders and tags, and full-text search across a user's own notes.

Goal: users see a dashboard listing only their own notes, organise them with folders and/or tags, and find notes through full-text search. Assumptions stated: notes are organised via folders and/or tags and are findable through full-text search; each user sees only their own notes.

**Related:** US-009, US-010, US-011, US-012

### EPIC-004 · approved · source: planning:EPIC-004

Covers moving notes to a trash/recycle area, restoring them, and permanently deleting them.

Goal: deleted notes move to a trash/recycle area before permanent removal, allowing recovery. Assumption stated: deleted notes go to a trash/recycle area before permanent deletion.

**Related:** US-013, US-014, US-015

### EPIC-005 · approved · source: planning:EPIC-005

Covers delivery of the product as a free, responsive web application usable on desktop and mobile browsers with no native app and no payment tiers.

Goal: the product is delivered as a responsive web application usable on desktop and mobile browsers, with no native app, and is free to use with no payments or subscription tiers. Assumptions stated: delivered as a responsive web app with no native mobile/desktop app; free to use with no payments or tiers in the first version; expected scale is modest (thousands of individual consumers).

**Related:** US-016, US-017

### Sprint 1 · approved · source: planning:Sprint 1

First sprint of the approved version-1 plan (capacity 20) stands up authentication and basic note creation.

Goal: stand up authentication (registration, login, session persistence/logout) and basic note creation; confirm the app requires no payment. Capacity: 20 points. Story linkage inferred from goal wording: registration (US-001), login (US-002), session persistence/logout (US-003), basic note creation (US-006), no-payment confirmation (US-017).

**Related:** US-001, US-002, US-003, US-006, US-017

### Sprint 2 · approved · source: planning:Sprint 2

Second sprint (capacity 20) adds password reset via email, rich-text note formatting, and the note list dashboard.

Goal: add password reset via email, rich-text formatting for notes, and the note list dashboard. Capacity: 20 points. Story linkage inferred from goal wording: password reset (US-004, with tasks US-004-T1 request/confirm endpoints, US-004-T2 SMTP integration, US-004-T3 frontend screens), rich-text formatting (US-007, with tasks US-007-T1 editor integration, US-007-T2 API persistence, US-007-T3 round-trip tests), note list dashboard (US-009).

**Related:** US-004, US-007, US-009

### Sprint 3 · approved · source: planning:Sprint 3

Third sprint (capacity 20) delivers auto-save with timestamps, folders/tags organisation, and self-service account deletion.

Goal: deliver auto-save with last-edited timestamps, folders and tags organisation, and self-service account deletion. Capacity: 20 points. Story linkage inferred from goal wording: auto-save/timestamp (US-008), folders (US-010), tags (US-011), account deletion (US-005).

**Related:** US-008, US-010, US-011, US-005

### Sprint 4 · approved · source: planning:Sprint 4

Fourth sprint (capacity 20) delivers the full trash lifecycle and full-text search across notes.

Goal: deliver the trash lifecycle (move, restore, permanent delete) and full-text search across notes. Capacity: 20 points. Story linkage inferred from goal wording: move to trash (US-013), restore (US-014), permanent delete (US-015), full-text search (US-012, with tasks US-012-T1 search index migration, US-012-T2 search endpoint, US-012-T3 frontend search bar/no-results state).

**Related:** US-013, US-014, US-015, US-012

### Sprint 5 · approved · source: planning:Sprint 5

Fifth sprint (capacity 20) polishes the responsive layout so all note features work on desktop and mobile browsers.

Goal: polish the responsive layout so all note features work well on desktop and mobile browsers. Capacity: 20 points. Story linkage inferred from goal wording: responsive desktop/mobile usability (US-016).

**Related:** US-016
<!-- sdlc:auto:end narrative -->
