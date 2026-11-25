<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-25

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack. Stores all structured, relational data (users, sessions, notes, folders, tags, trash state) and provides built-in full-text search via tsvector/GIN, so no separate search engine is added.

## Consequences

Full-text ranking is less feature-rich than a dedicated search engine, but ample for personal note search at this scale and removes an entire moving part.
<!-- sdlc:auto:end adr -->