<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-25

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Approved stack. Drives the responsive SPA with the rich-text editor, auto-save, folders/tags, search and trash; served from its own origin and reads VITE_API_BASE_URL for the API URL, sending the opaque session token as a Bearer header.

## Consequences

A SPA needs client-side routing and token storage handled explicitly; its large ecosystem (e.g. TipTap) makes the rich-text editor a well-trodden path.
<!-- sdlc:auto:end adr -->