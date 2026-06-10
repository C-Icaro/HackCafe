---
name: devin-delegate
description: Prepare a high-signal prompt for Devin Cloud or Devin CLI
allowed-tools:
  - read
  - grep
  - glob
  - exec
---

Create a Devin delegation prompt with:

- Objective and branch/base.
- Relevant files and known constraints.
- Role to assume.
- Exact scope and non-goals.
- Verification commands.
- Acceptance criteria.
- Expected output: PR, patch, report, or research memo.

Ask Devin to use the strongest available mode/model for complex work, including ULTRA/mythical when available in the account. Keep secrets out of the prompt unless they are configured through Devin Secrets.
