# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-STACK · approved · source: requirements:technology-stack

Approved technology stack for the notepad app, fixed by the product owner and not to be substituted.

- Backend: FastAPI 0.115 -- handles auth, password reset, account deletion, notes CRUD, trash and search; chosen as the platform default, cheap and easy to maintain for a no-revenue product.
- Cloud: AWS -- platform default; managed PostgreSQL (RDS), container hosting, TLS/secrets handling; supports thousands of users reliably and cheaply, with standard data-protection and backup tooling and self-service account/data deletion.
- Database: PostgreSQL 16 -- stores users, notes, folders, tags, trash state and timestamps; built-in full-text search satisfies the 'find notes by text' requirement without a separate search engine; fits a single-tenant, privacy-focused design.
- Frontend: React 19 -- responsive web app with a rich-text editor (bold, lists, headings), auto-save, folders/tags, instant search; largest ecosystem of ready-made rich-text editors (e.g. TipTap/Lexical); one codebase for desktop and mobile browsers, matching the 'no native app' decision.

### REQ-SERVICES · approved · source: requirements:services

One external runtime service is approved: an SMTP email service used for account-related email (e.g. password reset links).

- Email: SMTP server (SaaS), configured via env vars SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.
- Required API keys/secrets: SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER -- values must be set as environment secrets, e.g. SMTP_HOST=<smtp-host>, SMTP_PORT=<smtp-port>, SMTP_USER=<smtp-username>, SMTP_PASSWORD=<smtp-password>.

### REQ-SCOPE · approved · source: requirements:scope

Delivery scope is lightweight (requirements v1). Defines what is explicitly in and out of scope for this build.

In scope: self-registration and email/password sign-in; private account showing only the user's own notes; rich-text note creation/editing (bold, lists, headings); auto-save with last-edited timestamp; note list dashboard; delete to trash before permanent removal; organising notes with folders and tags; full-text search across notes; self-service account and data deletion; sessions persisting across devices; responsive web app for desktop and mobile browsers (no native app); free to use with no payments or subscription tiers.
Out of scope -- not to be designed or built: file and image attachments on notes; sharing notes via link or inviting others to view/edit.

### REQ-FG-SIGNIN · approved · source: requirements:feature-group:Sign-in & accounts

Covers self-registration, sign-in, persistent sessions/sign-out, password reset, and self-service account deletion.

- Self-register with email and password: valid email + password meeting stated rules creates a private account; duplicate email is rejected with 'email already in use'; invalid email/password shows which field to correct.
- Sign in with email and password: correct credentials sign the user in to their note list dashboard; incorrect email or password is refused with a generic error.
- Stay signed in and sign out: sessions persist per device without re-entering a password; sign-out ends that device's session; sessions also end after a period of inactivity.
- Reset a forgotten password: user requests reset, receives a time-limited email link; setting a new password updates it (hashed) and ends existing sessions.
- Delete account and data: signed-in user can permanently delete account and all data (notes, trash, folders, tags, sessions) from account settings after confirming; old credentials stop working.

### REQ-FG-WRITING · approved · source: requirements:feature-group:Writing notes

Covers creating notes, rich-text formatting, and auto-save with last-edited timestamps.

- Create a new note: signed-in user creates a new empty note, ready for editing, belonging only to their account; once content is entered it appears in the note list with a last-edited timestamp.
- Format note text as rich text: bold, lists and headings can be applied while editing; formatting is shown in the editor and preserved on reopen; plain unformatted text is saved and displayed as entered.
- Auto-save with last-edited time: changes save automatically on pause/stop typing with no explicit save action; last-edited timestamp reflects the most recent save; reopening a note (including on another device) shows the latest saved content.

### REQ-FG-ORGANIZE · approved · source: requirements:feature-group:Organising & searching

Covers the note list dashboard, folder and tag organisation, and full-text search.

- View note list dashboard: signed-in user sees only their own notes, each showing a title/preview and last-edited timestamp; an empty state prompts note creation when there are no notes.
- Organise notes with folders: user creates folders, moves notes into them, views a folder's notes by selecting it; a note can be moved or removed from a folder with membership updating accordingly.
- Organise notes with tags: user can add one or more tags to a note while editing or viewing; tags are saved and shown with the note; filtering/selecting by tag shows only that user's notes with that tag.
- Full-text search across notes: user enters a search term to find notes whose title or content matches; a clear no-results state is shown when nothing matches; trashed notes are excluded from active search results.

### REQ-FG-TRASH · approved · source: requirements:feature-group:Trash

Covers moving notes to trash, restoring them, and permanent deletion.

- Move a note to trash: user deletes a note into a trash area; it no longer appears in the active note list and is listed in trash with its last-edited timestamp.
- Restore a note from trash: user can restore a note from trash, returning it to the active list with its previous content and organisation.
- Permanently delete from trash: user can permanently remove a note from trash or empty the trash after confirming; permanently deleted notes cannot be restored or found in search.

### REQ-FG-ACCESS · approved · source: requirements:feature-group:App access

Covers responsive, free, cross-device web access with no native app and no payment model.

- Free responsive web access: the app works on desktop and mobile browsers with a layout that adapts to screen size, keeping all note features usable; no native app is provided.
- Every feature is available free of charge, with no payment, billing or subscription tier ever required or presented.

### REQ-NFR-001 · approved · source: requirements:NFR-001

[privacy] Notes are visible only to their owner.

A user can only ever see, open, search and organise their own notes, folders and tags. Another user's notes must never be shown under any circumstances.

### REQ-NFR-002 · approved · source: requirements:NFR-002

[security] Passwords are stored only in hashed form.

Passwords are hashed both at account creation and when changed via password reset; plain-text passwords are never kept or shown.

### REQ-NFR-003 · approved · source: requirements:NFR-003

[security] Sessions expire and can be explicitly ended.

A session persists across a user's devices but ends after a period of inactivity, on sign-out on that device, when the password is reset, and when the account is deleted -- after which the user must sign in again.

### REQ-NFR-004 · approved · source: requirements:NFR-004

[security] Password reset links are time-limited and single-use.

An expired or already-used reset link is refused, prompting the user to request a new one.

### REQ-NFR-005 · approved · source: requirements:NFR-005

[privacy] The system never reveals whether a given email has an account.

Sign-in shows a generic error; password reset shows the same confirmation regardless of whether the account exists; registration reports only 'email already in use' without exposing other account details.

### REQ-NFR-006 · approved · source: requirements:NFR-006

[compliance] Self-service permanent deletion of all user data in one action, in line with standard data-protection expectations.

A user can permanently delete their own account and all associated data (notes including trash, folders, tags) and end their sessions in one self-service action, with no way to recover the data afterwards. Note: this traces to the general 'standard data-protection expectations' stated in requirements; no specific named regulation was provided in the input.

### REQ-NFR-007 · approved · source: requirements:NFR-007

[compatibility] Fully usable responsive web app on desktop and mobile browsers.

All note features are accessible at both desktop and mobile browser screen sizes; no native app is required.

### REQ-NFR-008 · approved · source: requirements:NFR-008

[scalability] Must reliably support thousands of individual consumer users.

Target scale is thousands of individual accounts, each seeing only their own notes, rather than millions.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-25

**Capabilities in scope:** Self-registration and email/password sign-in, Private account showing only the user's own notes, Rich-text note creation and editing (bold, lists, headings), Auto-save with last-edited timestamp, Note list dashboard, Delete to trash before permanent removal, Organising notes with folders and tags, Full-text search across notes, Self-service account and data deletion, Email and password sign-in, with sessions that persist across devices, Responsive web app for desktop and mobile browsers (no native app), Free to use, with no payments or subscription tiers

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The server-side job here is modest and well understood: register/sign-in, save and list notes, move to trash, purge, and run searches. FastAPI (Python) is the platform default and handles this comfortably for thousands of individual users, while keeping auth, password reset and account deletion straightforward. Its small, readable codebase keeps a free, no-revenue product cheap to run and easy to maintain with no deadline pressure. |
| cloud | AWS | AWS is the platform default and gives you managed, backed-up PostgreSQL (RDS), container hosting for the app, and TLS/secrets handling in one account — enough to run a private notes app for thousands of users reliably and cheaply, scaling only if you ever grow. Mature data-protection and backup tooling covers the 'standard data protection' expectation and the self-service account/data deletion you require. |
| database | PostgreSQL | Everything your product stores is structured and relational: users, their notes, folders, tags, and trash state with last-edited timestamps. PostgreSQL holds all of this in one place and — importantly for you — has strong built-in full-text search, so the 'find notes by their text' requirement is met by the database itself without adding a separate search engine. It is the platform default and the right fit for a single-tenant, privacy-focused app where each user only ever sees their own rows. |
| frontend | React | Your product is a responsive web app with a rich-text editor (bold, lists, headings), auto-save, folders/tags and instant search — all highly interactive screen behaviour that runs in the browser. React is the platform's default for this and has the largest ecosystem of ready-made rich-text editors (e.g. TipTap/Lexical), so the editor at the heart of your notepad is a well-trodden path rather than something built from scratch. It serves desktop and mobile browsers from one codebase, which matches your 'no native app' decision. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account registration, sign-in and lifecycle

Users self-register and sign in to a private, personal account using email and password. Sessions persist across devices so a user stays signed in on each device they use, and signing out ends the session. Users can reset a forgotten password via email and delete their own account and all associated data. Assumption: sign-in is email/password; sessions persist across devices. Assumption: password reset and account deletion rely on a transactional email service (e.g. SendGrid) configured with an API key such as <your-sendgrid-api-key>; no real credential is stored in requirements. Assumption: no special regulatory constraints beyond standard data protection apply.

### US-001: Self-register with email and password

**Priority:** critical

> As a new visitor, I want to create a private account using my email address and a password, so that I can start keeping my own private notes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the registration screen and no account exists for my email | I submit a valid email address and a password that meets the stated requirements | an account is created, my password is stored only in hashed form, and I am signed in or directed to sign in |
| AC-002 | I am on the registration screen | I submit an email that already has an account | registration is rejected and I am told the email is already in use without revealing other account details |
| AC-003 | I am on the registration screen | I submit an invalid email or a password that does not meet the stated requirements | registration is rejected and I see which field needs correcting |

### US-002: Sign in with email and password

**Priority:** critical

> As a registered user, I want to sign in with my email and password, so that I can access my private notes on any device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a registered account | I submit my correct email and password | I am signed in and taken to my note list dashboard |
| AC-005 | I have a registered account | I submit an incorrect email or password | sign-in is refused and I see a generic error that does not reveal whether the email exists |
| AC-006 | I am signed in on a device | I open the app again on a different device and sign in | both devices have active sessions and show the same notes |

### US-003: Stay signed in across devices and sign out

**Priority:** high

> As a signed-in user, I want my session to persist across devices and to be able to sign out, so that I stay signed in where I work but can end access when I choose.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am signed in on a device | I return to the app on that device before my session has expired | I remain signed in without re-entering my password |
| AC-008 | I am signed in | my session reaches its expiry period of inactivity | the session ends and I am asked to sign in again |
| AC-009 | I am signed in on a device | I choose to sign out | that session ends and I must sign in again to access my notes |

### US-004: Reset a forgotten password via email

**Priority:** high

> As a user who has forgotten my password, I want to request a password reset by email, so that I can regain access to my account.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am on the password reset screen | I submit the email address of an existing account | a time-limited reset link is sent to that address via the transactional email service |
| AC-011 | I am on the password reset screen | I submit an email with no account | I see the same confirmation message so account existence is not revealed, and no reset link is sent |
| AC-012 | I have a valid, unexpired reset link | I open it and set a new password that meets the requirements | my password is updated (stored hashed), existing sessions are ended, and I can sign in with the new password |
| AC-013 | I have a reset link that has expired or already been used | I open it | the reset is refused and I am prompted to request a new link |

### US-005: Delete my own account and data

**Priority:** medium

> As a signed-in user, I want to delete my account and all my notes, so that I can permanently remove my data when I no longer want the service.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | I am signed in and on the account settings screen | I request account deletion and confirm the action | my account, all my notes (including items in trash), folders and tags are permanently removed and my sessions are ended |
| AC-015 | I have deleted my account | I try to sign in with the old credentials | sign-in is refused because the account no longer exists |

## EPIC-002: Writing and editing notes

Users create and edit rich-text notes supporting bold, lists and headings. Notes auto-save as the user types and display a last-edited timestamp. Assumption: standard note CRUD with auto-save and last-edited timestamp. Assumption: file and image attachments are out of scope. Assumption: notes are entirely private and never shared.

### US-006: Create a new note

**Priority:** critical

> As a signed-in user, I want to create a new note, so that I can capture my thoughts.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am signed in on my dashboard | I choose to create a new note | a new empty note opens ready for editing and is associated with my account only |
| AC-017 | I have created a note and entered content | I return to my note list | the new note appears in my list with its last-edited timestamp |

### US-007: Edit note content as rich text

**Priority:** high

> As a signed-in user, I want to format note text with bold, lists and headings, so that I can structure my notes clearly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I am editing a note | I apply bold, a list or a heading to selected text | the formatting is shown in the editor and preserved when I reopen the note |
| AC-019 | I am editing a note | I add plain text without formatting | the text is saved and displayed as entered |

### US-008: Auto-save with last-edited timestamp

**Priority:** critical

> As a signed-in user, I want my note changes to save automatically and show when last edited, so that I never lose work and can see how recent a note is.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am editing a note | I pause or stop typing | the changes are saved automatically without me taking any explicit save action |
| AC-021 | a note has been auto-saved | I view the note or my note list | the note shows a last-edited timestamp reflecting the most recent save |
| AC-022 | I have made edits that auto-saved | I close the note and reopen it, including on another device | the most recent saved content is shown |

## EPIC-003: Organising, listing and searching notes

Users see a dashboard listing only their own notes, organise them with folders and/or tags, and find notes through full-text search. Assumption: notes are organised via folders and/or tags and are findable through full-text search. Assumption: each user sees only their own notes.

### US-009: View my note list dashboard

**Priority:** critical

> As a signed-in user, I want to see a list of my notes, so that I can browse and open them.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am signed in | I open the dashboard | I see a list of only my own notes, each showing a title or preview and its last-edited timestamp |
| AC-024 | another user has notes | I view my dashboard | none of their notes are ever shown to me |
| AC-025 | I have no notes yet | I open the dashboard | I see an empty state prompting me to create my first note |

### US-010: Organise notes with folders

**Priority:** high

> As a signed-in user, I want to group notes into folders, so that I can keep related notes together.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I am signed in | I create a folder and move a note into it | the note appears under that folder and can be viewed by selecting the folder |
| AC-027 | I have a note in a folder | I move it to a different folder or remove it from the folder | the note's folder membership updates accordingly |

### US-011: Organise notes with tags

**Priority:** medium

> As a signed-in user, I want to add tags to notes, so that I can categorise and filter them flexibly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I am editing or viewing a note | I add one or more tags to it | the tags are saved on the note and shown with it |
| AC-029 | I have notes with tags | I filter or select by a tag | I see only my notes carrying that tag |

### US-012: Full-text search across my notes

**Priority:** high

> As a signed-in user, I want to search the text of my notes, so that I can quickly find the note I need.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I have several notes | I enter a search term | I see only my notes whose title or content matches the term |
| AC-031 | I enter a search term that matches no notes | the search completes | I see a clear no-results state |
| AC-032 | a note is in the trash | I run a search of my active notes | trashed notes are not returned among the active results |

## EPIC-004: Deleting notes and trash

Deleted notes move to a trash/recycle area before permanent removal, allowing recovery. Assumption: deleted notes go to a trash/recycle area before permanent deletion.

### US-013: Move a note to trash

**Priority:** high

> As a signed-in user, I want to delete a note into a trash area, so that I can remove clutter without immediately losing the note.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | I am viewing one of my notes | I delete it | the note moves to the trash and no longer appears in my active note list |
| AC-034 | a note has been moved to trash | I view the trash area | the note is listed there with its last-edited timestamp |

### US-014: Restore a note from trash

**Priority:** medium

> As a signed-in user, I want to restore a note from the trash, so that I can recover notes I deleted by mistake.

| ID | Given | When | Then |
|---|---|---|---|
| AC-035 | a note is in the trash | I restore it | the note returns to my active note list with its previous content and organisation |

### US-015: Permanently delete notes from trash

**Priority:** medium

> As a signed-in user, I want to permanently remove notes from the trash, so that I can free up the trash and ensure the content is gone.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | a note is in the trash | I permanently delete it or confirm emptying the trash | the note is permanently removed and can no longer be restored or found in search |

## EPIC-005: Platform delivery and access model

The product is delivered as a responsive web application usable on desktop and mobile browsers, with no native app, and is free to use with no payments or subscription tiers. Assumption: delivered as a responsive web app; no native mobile/desktop app. Assumption: free to use, no payments or tiers in the first version. Assumption: expected scale is modest (thousands of individual consumers).

### US-016: Use the app responsively on desktop and mobile browsers

**Priority:** high

> As a user, I want the app to work well on both desktop and mobile browser screen sizes, so that I can access my notes from whatever device I have.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I open the app in a desktop browser | the page loads | the layout is usable and all note features are accessible at desktop screen widths |
| AC-038 | I open the app in a mobile browser | the page loads | the layout adapts to the smaller screen and all note features remain usable without a native app |

### US-017: Use the service free of charge

**Priority:** medium

> As a user, I want to use all features without payment, so that I can keep notes without a subscription.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | I have a registered account | I use any feature of the first version | no payment, billing or subscription tier is ever required or presented |
<!-- sdlc:auto:end epics -->
