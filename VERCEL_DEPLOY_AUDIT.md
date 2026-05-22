# Vercel Deploy Audit – Git Push Not Triggering Deployment

**Audit date:** May 22, 2026  
**Repository:** `LetMeHelpYouREALTY/maravillahomesforsale.com`  
**Latest GBP commit:** `f24a40e` on branch `cursor/gbp-profile-update-b0bb`  
**Production branch on GitHub (`origin/main`):** `9f354ef` (does **not** include GBP changes)

---

## Executive summary

The git push **succeeded** to GitHub. Vercel did not deploy your GBP work to production because:

1. **You pushed a feature branch, not `main`** — Vercel production almost always tracks `main` only.
2. **The connected Vercel project may not be on the MCP-linked team** — `maravillahomesforsale.com` was **not found** under team `Janet Duffy's projects` (404 via API).
3. **Docs reference the wrong GitHub org** — older notes say `DrJanDuffy/maravillahomesforsale.com`; this repo is `LetMeHelpYouREALTY/maravillahomesforsale.com`.

---

## Verified facts (this environment)

| Check | Result |
|-------|--------|
| `git push` to `cursor/gbp-profile-update-b0bb` | OK — remote has `f24a40e` |
| `origin/main` includes GBP commit | **No** — main still at `9f354ef` |
| Commits only on feature branch | `f24a40e` (1 commit ahead of main) |
| `.vercel/project.json` in repo | **Missing** — CLI not linked here |
| `.github/workflows` | **None** — no CI fallback deploy |
| Vercel project `maravillahomesforsale.com` on team | **404 Not Found** |
| `list_projects` (50 projects) | No `maravillahomesforsale` entry |

---

## Root causes (ranked)

### 1. Production branch mismatch (most likely)

Vercel auto-deploys **production** when you push to the branch set under **Settings → Git → Production Branch** (default: `main`).

You pushed:

```bash
git push -u origin cursor/gbp-profile-update-b0bb
```

That triggers a **preview** deployment only if:

- Git integration is connected to this repo, and
- Preview deployments are enabled, and
- The branch is not in **Ignored Build Step** / **Ignored Branches**

It does **not** update `https://www.maravillahomesforsale.com` until changes are on `main` (or you promote a preview).

**Fix (production):**

```bash
git checkout main
git pull origin main
git merge cursor/gbp-profile-update-b0bb
git push origin main
```

Or merge [PR #1](https://github.com/LetMeHelpYouREALTY/maravillahomesforsale.com/pull/1) on GitHub.

---

### 2. Vercel Git repo / org mismatch

`VERCEL_DEPLOY_AUDIT.md` (older) referenced:

- `DrJanDuffy/maravillahomesforsale.com`

Actual remote:

- `LetMeHelpYouREALTY/maravillahomesforsale.com`

If the Vercel project is still linked to the old org/repo, pushes to `LetMeHelpYouREALTY/...` will **never** trigger a build.

**Fix:** Vercel Dashboard → Project → **Settings → Git** → confirm repository is `LetMeHelpYouREALTY/maravillahomesforsale.com` and reconnect if needed.

---

### 3. Project not on expected Vercel team (or disconnected)

API lookup for project slug `maravillahomesforsale.com` on team `team_EIbjFXaDDtGMTweb5Hvo3CG3` returned **404**. The site may live under:

- Another Vercel team / personal account
- A renamed project (e.g. `maravillahomesforsale` without `.com`)
- A disconnected or deleted Git link

**Fix:** In [Vercel Dashboard](https://vercel.com/dashboard), search **maravilla** → open project → **Deployments** tab → confirm latest commit SHA matches your push.

---

### 4. Preview deployments disabled or branch ignored

If you expected a **preview URL** from the feature-branch push, check:

- **Settings → Git** → “Automatically expose Preview Deployments”
- **Settings → Git** → “Ignored Build Step” (e.g. only build `main`)
- **Settings → Git** → branch patterns that skip `cursor/*`

---

### 5. Build failure (secondary — check after trigger works)

If a deployment **starts** but fails, production stays on the last good deploy.

**Local check (this repo):**

```bash
npm ci
npm run lint    # passed in audit
npm run build   # run before merging to main
```

**Vercel:** Deployments → latest → **Building** / **Error** → read build logs.

---

## Cloudflare note (separate from Vercel trigger)

`www.maravillahomesforsale.com` sits behind **Cloudflare** (challenge/403 for automated curl). That affects bots and CLI curls, not whether Vercel receives the Git webhook. Keep DNS **DNS only (gray cloud)** on the Vercel target per project rules to avoid SSL/proxy issues.

---

## Checklist — do these in order

1. [ ] **Merge GBP work to `main`** (merge PR #1 or merge branch locally and push).
2. [ ] **Vercel → Project → Deployments** — new deployment appears within ~1–2 min of `main` push.
3. [ ] **Vercel → Settings → Git** — repo = `LetMeHelpYouREALTY/maravillahomesforsale.com`, production branch = `main`.
4. [ ] **Compare commit SHA** on latest deployment vs `git rev-parse origin/main`.
5. [ ] If no deployment appears — **Disconnect and reconnect** Git integration; confirm GitHub App has access to `LetMeHelpYouREALTY`.
6. [ ] If deployment **errors** — fix build from logs; re-push `main`.

---

## Quick commands

```bash
# See what production is missing
git log origin/main..origin/cursor/gbp-profile-update-b0bb --oneline

# Deploy to production (after review)
git checkout main
git pull origin main
git merge cursor/gbp-profile-update-b0bb
git push origin main
```

---

## What did *not* cause the issue

- Empty working tree / failed push — push to `cursor/gbp-profile-update-b0bb` completed successfully.
- Uncommitted GBP changes — commit `f24a40e` is on the remote feature branch.

---

## Recommended next step

**Merge PR #1 to `main` and push** — that is the standard path to trigger a production Vercel deploy for this setup. Then confirm in the Vercel dashboard that the new deployment’s Git commit is `f24a40e` (or the merge commit on `main`).
