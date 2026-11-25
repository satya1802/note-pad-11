<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-25

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because Approved stack. Managed RDS PostgreSQL with backups, Fargate container hosting for the API, S3/CloudFront for the SPA, and Secrets Manager/TLS for credentials — enough to run reliably and cheaply at modest scale.

## Consequences

Operational breadth can be more than a tiny app needs; managed services keep running costs and maintenance low with room to scale later.
<!-- sdlc:auto:end adr -->