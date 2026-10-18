---
name: pre-deploy-audit
description: >-
  Use this skill before committing, pushing to main, or preparing a release for Vercel.
  Performs strict verification of ESLint (0 errors, 0 warnings), Next.js production build,
  React 19 hooks compliance, and route integrity.
---

# Pre-Deploy Verification Audit

Use this runbook before any production release or pull request merge.

## Verification Checklist

### Step 1: Run Linter
```bash
npm run lint
```
- Must exit with code 0.
- Verify zero `react-hooks/set-state-in-effect` errors.
- Ensure all ref dependencies and unused variables are cleaned.

### Step 2: Run Production Build
```bash
npm run build
```
- Must successfully compile in Turbopack.
- Must verify that all 18 static and dynamic routes generate without errors (including `/work/[slug]`).

### Step 3: Git Branch & Push Safety
```bash
git status --short
```
- Verify what branch is active (`feat/...` vs `main`).
- If deploying to production Vercel:
  ```bash
  git checkout main
  git merge <feature-branch> --ff-only
  git push origin main
  git checkout <feature-branch>
  ```
- Ensure both local and remote branches are synchronized.
