# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-EPIC-001 · approved · source: planning:EPIC-001

Account registration, sign-in and lifecycle: self-registration and sign-in to a private account, cross-device persistent sessions, password reset via email, and self-service account/data deletion.

Assumptions stated: sign-in is email/password with sessions persisting across devices; password reset and account deletion rely on a transactional email service configured via an API key placeholder (no real credential stored); no special regulatory constraints beyond standard data protection apply.

**Related:** US-001, US-002, US-003, US-004, US-005

### PLAN-EPIC-002 · approved · source: planning:EPIC-002

Writing and editing notes: create and edit rich-text notes (bold, lists, headings) with auto-save and a last-edited timestamp.

Assumptions stated: standard note CRUD with auto-save and last-edited timestamp; file and image attachments are out of scope; notes are entirely private and never shared.

**Related:** US-006, US-007, US-008

### PLAN-EPIC-003 · approved · source: planning:EPIC-003

Organising, listing and searching notes: a private dashboard of the user's own notes, organisation via folders and/or tags, and full-text search.

Assumptions stated: notes are organised via folders and/or tags and are findable through full-text search; each user sees only their own notes.

**Related:** US-009, US-010, US-011, US-012

### PLAN-EPIC-004 · approved · source: planning:EPIC-004

Deleting notes and trash: deleted notes move to a trash area before permanent removal, allowing recovery.

Assumption stated: deleted notes go to a trash/recycle area before permanent deletion.

**Related:** US-013, US-014, US-015

### PLAN-EPIC-005 · approved · source: planning:EPIC-005

Platform delivery and access model: a responsive web app for desktop and mobile browsers, free to use with no payments or tiers, no native app.

Assumptions stated: delivered as a responsive web app with no native mobile/desktop app; free to use with no payments or tiers in the first version; expected scale is modest (thousands of individual consumers).

**Related:** US-016, US-017
<!-- sdlc:auto:end narrative -->
