<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-25

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Approved stack. Handles auth/sessions, note CRUD with auto-save, full-text search, trash lifecycle, password reset and account deletion for thousands of users, enforcing per-user isolation in every query.

## Consequences

Minimal batteries-included scaffolding compared with Django, but a small readable codebase keeps this free product cheap to run and easy to maintain.
<!-- sdlc:auto:end adr -->