# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | citext | False | — | False |
| password_hash | text | False | — | False |
| created_at | timestamptz | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | text | False | — | False |
| created_at | timestamptz | False | — | False |
| last_used_at | timestamptz | False | — | False |
| expires_at | timestamptz | False | — | False |

### password_reset_tokens

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | text | False | — | False |
| expires_at | timestamptz | False | — | False |
| used_at | timestamptz | False | — | True |
| created_at | timestamptz | False | — | False |

### folders

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| name | text | False | — | False |
| created_at | timestamptz | False | — | False |

### notes

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| folder_id | uuid | False | folders.id | True |
| title | text | False | — | True |
| content_html | text | False | — | True |
| content_text | text | False | — | True |
| search_vector | tsvector | False | — | True |
| is_trashed | boolean | False | — | False |
| trashed_at | timestamptz | False | — | True |
| last_edited_at | timestamptz | False | — | False |
| created_at | timestamptz | False | — | False |

### tags

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| name | text | False | — | False |

### note_tags

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| note_id | uuid | True | notes.id | False |
| tag_id | uuid | True | tags.id | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | sessions | one-to-many |
| users | password_reset_tokens | one-to-many |
| users | folders | one-to-many |
| users | notes | one-to-many |
| users | tags | one-to-many |
| folders | notes | one-to-many |
| notes | note_tags | one-to-many |
| tags | note_tags | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    citext email
    text password_hash
    timestamptz created_at
  }
  sessions {
    uuid id PK
    uuid user_id FK
    text token_hash
    timestamptz created_at
    timestamptz last_used_at
    timestamptz expires_at
  }
  password_reset_tokens {
    uuid id PK
    uuid user_id FK
    text token_hash
    timestamptz expires_at
    timestamptz used_at
    timestamptz created_at
  }
  folders {
    uuid id PK
    uuid user_id FK
    text name
    timestamptz created_at
  }
  notes {
    uuid id PK
    uuid user_id FK
    uuid folder_id FK
    text title
    text content_html
    text content_text
    tsvector search_vector
    boolean is_trashed
    timestamptz trashed_at
    timestamptz last_edited_at
    timestamptz created_at
  }
  tags {
    uuid id PK
    uuid user_id FK
    text name
  }
  note_tags {
    uuid note_id PK,FK
    uuid tag_id PK,FK
  }
  users ||--o{ sessions : "one-to-many"
  users ||--o{ password_reset_tokens : "one-to-many"
  users ||--o{ folders : "one-to-many"
  users ||--o{ notes : "one-to-many"
  users ||--o{ tags : "one-to-many"
  folders ||--o{ notes : "one-to-many"
  notes ||--o{ note_tags : "one-to-many"
  tags ||--o{ note_tags : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
