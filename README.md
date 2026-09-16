# maravillahomesforsale.com

Maravilla / North Las Vegas Family Homes site for Dr. Jan Duffy.

## Cloudflare Images (live vault)

Git copies under `public/images/` are the backup. Cloudflare [hosted Images](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/) is the live store. Delivery URLs:

`https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/<IMAGE_ID>/<VARIANT>`

The Vercel hostname stays DNS-only — do not orange-cloud this site. `imagedelivery.net` is separate from site DNS.

`SiteImage` uses the hosted URL first and swaps to the Git file if Cloudflare returns 403/404 (image not uploaded yet).

### 1. Hosted originals

Upload Git backups with custom IDs from `src/data/cloudflare-image-catalog.json` (for example `maravilla/dr-jan-duffy`).

**Dashboard:** Images → Hosted images → Quick Upload, then set the custom ID.

**API:** token with Account → Cloudflare Images → Edit:

```bash
CLOUDFLARE_ACCOUNT_ID=2cc579c1ec9e426ed585e933ebf4753b \
CLOUDFLARE_API_TOKEN=your_token \
npm run cf:images
```

Pass `--force` to replace existing custom IDs, or `--dry-run` to print the plan.

### 2. Predefined variants

Dashboard: **Hosted images** → **Delivery** → **Create variant**, or run the sync script. This repo expects:

| Variant | Size | Fit | Use |
| --- | --- | --- | --- |
| `public` | 1920×1920 | scale-down | Cloudflare default / flexible fallback |
| `thumbnail` | 128×128 | cover | Nav avatars |
| `nav` | 256×256 | contain | Header / footer |
| `portrait` | 800×800 | contain | On-page agent photo |
| `schema` | 512×512 | contain | JSON-LD / logo |
| `hero` | 1920×1080 | cover | Page banners |
| `og` | 1200×630 | cover | Open Graph |

Cloudflare transcodes to AVIF/WebP from the variant when the browser supports it.

### 3. Public hash

The account hash `byE6BTe9lNqo21V57n4aPQ` is compiled in as the default. Override with `NEXT_PUBLIC_CF_IMAGES_HASH` on Vercel if the Images account changes.

## Optional: Star ratings in search (Google Business Profile)

To show star ratings in search results, set these env vars to match your GBP (Vercel: Project → Settings → Environment Variables):

- `NEXT_PUBLIC_GBP_RATING` – average rating, e.g. `4.9`
- `NEXT_PUBLIC_GBP_REVIEW_COUNT` – total review count, e.g. `127`

Only real values from your Google Business Profile should be used.
