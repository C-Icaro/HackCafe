---
name: hackcafe-slice
description: Turn a HackCafe idea into a traceable implementation slice
allowed-tools:
  - read
  - grep
  - glob
  - exec
  - edit
  - write
---

For any HackCafe feature request:

1. State the user outcome and one measurable product metric.
2. Separate facts, assumptions, and decisions.
3. Produce a small story with acceptance criteria.
4. Identify the files/contracts likely to change.
5. Preserve the current HackCafe frontend identity unless the maintainer explicitly requests a redesign.
6. Implement only the smallest slice that proves the decision.
7. Run relevant checks and report evidence.

Keep the traceability chain visible: hypothesis -> evidence -> decision -> story -> acceptance criteria -> metric.
