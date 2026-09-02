# Vercel Deploy Audit – Git Push Did Not Auto-Deploy Production

**Audit date:** September 2, 2026  
**Repository (this agent):** `LetMeHelpYouREALTY/maravillahomesforsale.com`  
**Vercel project:** `maravillahomesforsale.com` (`prj_qNbmEbpEf2HedmMTS2NSqtoo4Pph`)  
**Team:** Janet Duffy's projects (`team_EIbjFXaDDtGMTweb5Hvo3CG3`)

---

## Executive summary

`git add` / `git commit` / `git push` **succeeded**. Vercel **did not** ship a new production build because of two independent failures:

1. **Git integration is stale after the GitHub org transfer.** The live Vercel project still records the GitHub owner as `DrJanDuffy`, while all current pushes go to `LetMeHelpYouREALTY`. Same GitHub repo id (`1115596353`), different owner string. Webhooks stopped creating deployments for new SHAs.
2. **This session pushed a feature branch, not `main`.** Even with a healthy Git link, Vercel production only builds the production branch (`main`). `cursor/add-jan-duffy-favicon-9a68` would be a **preview**, not `www.maravillahomesforsale.com`.

Live `https://www.maravillahomesforsale.com` still serves the March 5, 2026 commit `9f354ef` (old house `favicon.svg`, no Dr. Jan Duffy portrait files). GBP commits already on `origin/main` (`f24a40e`, `05a81b5`) also never reached production.

---

## Verified facts

| Check | Result |
| --- | --- |
| Last `git push` from this agent | OK — `70b4864` on `origin/cursor/add-jan-duffy-favicon-9a68` |
| `origin/main` | `05a81b5` (GBP + deploy-audit docs) — **does not** include favicon/portrait/Cloudflare Images |
| Latest Vercel **production** deployment | `dpl_9QHLPDX5sdd7pGJMo9fLzViifVTi` — **READY** — **Aug 8, 2026** |
| SHA on that deployment | `9f354ef` (`llms.txt`) |
| How it was created | `meta.action = redeploy` (manual redeploy of an old git deploy, not a new push) |
| Last **git-triggered** new SHA | `dpl_EgawL3yAhdQhj3iqjWemQFJ1tZUH` — **Mar 5, 2026** — `9f354ef` from `DrJanDuffy` |
| Vercel `link.org` | **`DrJanDuffy`** |
| GitHub `full_name` (same repo id) | **`LetMeHelpYouREALTY/maravillahomesforsale.com`** |
| `DrJanDuffy/maravillahomesforsale.com` | Resolves to the LetMeHelpYouREALTY repo (transfer alias) |
| Feature-branch deployments for `70b4864` / `5e087e7` / `7adf5bc` | **None** |
| `main` deployments for `f24a40e` / `05a81b5` | **None** |
| `.vercel/project.json` in this checkout | Missing (CLI not linked) |
| `.github/workflows` | None — no Actions fallback |
| `vercel.json` `git.deploymentEnabled` | Not set (defaults to enabled; **not** the blocker) |
| `create_git_project` to relink | **409** — `Project "maravillahomesforsale.com" already exists` (API will not reconnect it) |
| `VERCEL_TOKEN` in this environment | Not set — cannot `vercel --prod` from here |
| Live HTML | Still contains `favicon.svg`; **no** `dr-jan-duffy` / `imagedelivery.net` |

Inspector for the live production deploy:  
https://vercel.com/janet-duffys-projects/maravillahomesforsale.com/9QHLPDX5sdd7pGJMo9fLzViifVTi

---

## Root causes (ranked)

### 1. Stale GitHub owner on the Vercel project (blocks auto-deploy)

Vercel Git still says:

```text
org:  DrJanDuffy
repo: maravillahomesforsale.com
```

GitHub transferred that repository to `LetMeHelpYouREALTY`. Repo id `1115596353` is unchanged. After a transfer, the Vercel GitHub App webhook often keeps the old owner and **stops firing on new pushes**.

That matches the timeline:

- Mar 5, 2026 — last git deploy of a **new** SHA (`9f354ef`)
- Jun 25 and Aug 8, 2026 — **redeploys** of that same SHA
- May–Sep 2026 — `f24a40e`, `05a81b5`, and this PR’s commits never appear in Vercel

Pushing `main` on LetMeHelpYouREALTY will **not** fix production until Git is disconnected and reconnected in the dashboard.

**Fix (required, dashboard):**

1. Open [Vercel → maravillahomesforsale.com → Settings → Git](https://vercel.com/janet-duffys-projects/maravillahomesforsale.com/settings/git).
2. Confirm Connected Git Repository is `LetMeHelpYouREALTY/maravillahomesforsale.com` (not `DrJanDuffy/...`).
3. If it still shows `DrJanDuffy`: **Disconnect**, then **Connect Git Repository** → `LetMeHelpYouREALTY/maravillahomesforsale.com`.
4. Production Branch = `main`.
5. Confirm the GitHub App for Vercel can access the `LetMeHelpYouREALTY` org (GitHub → Settings → Applications → Vercel → Organization access).

### 2. Feature branch is not the production branch

This agent pushed:

```bash
git push -u origin cursor/add-jan-duffy-favicon-9a68
```

Vercel production tracks **`main`**. A healthy Git link would create a **preview** URL for `cursor/*`, not update `www.maravillahomesforsale.com`.

Draft PR: https://github.com/LetMeHelpYouREALTY/maravillahomesforsale.com/pull/3 (`MERGEABLE`).

**Fix (after Git is reconnected):** merge PR #3 into `main`, or:

```bash
git checkout main
git pull origin main
git merge cursor/add-jan-duffy-favicon-9a68
git push origin main
```

Do not force-push `main`.

### 3. No CI fallback

There is no GitHub Action calling `vercel deploy --prod`. If the GitHub App webhook is dead, **nothing else deploys**.

---

## What did *not* cause this

- Failed `git push` — remote has `70b4864`.
- Uncommitted work — portrait + Cloudflare Images commits are on the feature branch.
- A failed Vercel **build** of this PR — no deployment was created, so there are no build logs to fix.
- `vercel.json` disabling Git deploys.
- Cloudflare orange-cloud — live HTML is served by Vercel (`x-vercel-cache: HIT`). DNS is not the auto-deploy trigger.

---

## Checklist

1. [ ] Vercel → Settings → Git → reconnect `LetMeHelpYouREALTY/maravillahomesforsale.com`.
2. [ ] GitHub App org access includes `LetMeHelpYouREALTY`.
3. [ ] Merge PR #3 (or merge the feature branch) to `main` and push.
4. [ ] Deployments tab: new deployment within 1–2 minutes; SHA = `70b4864` or the merge commit.
5. [ ] Live check: `https://www.maravillahomesforsale.com/favicon.ico` is the portrait, HTML includes `dr-jan-duffy`.
6. [ ] Optional: add a `main`-only GitHub Action `vercel deploy --prebuilt --prod` so a webhook outage cannot stall production again.

---

## What this agent cannot do from here

- Reconnect Git (Vercel API 409 on the existing project name).
- `vercel --prod` (no `VERCEL_TOKEN` in this environment).
- Promote a preview that does not exist (no preview was created for `70b4864`).
