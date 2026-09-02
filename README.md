# maravillahomesforsale.com

Maravilla / North Las Vegas Family Homes site for Dr. Jan Duffy.

## Cloudflare Images (live vault)

Git copies under `public/images/` are the backup. Cloudflare Images is the live store and delivery layer (`imagedelivery.net`). The Vercel hostname stays DNS-only — do not orange-cloud this site.

Until `NEXT_PUBLIC_CF_IMAGES_HASH` is set, pages keep serving the Git files.

### 1. Enable Cloudflare Images

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Open **Images**.
3. Subscribe to the Images plan (storage + delivery; Cloudflare publishes current pricing on the Images page).

### 2. Create predefined variants

Use the dashboard (**Hosted images** → **Delivery** → **Create variant**) or run the sync script below. This repo expects these names:

| Variant | Size | Fit | Use |
| --- | --- | --- | --- |
| `thumbnail` | 128×128 | cover | Nav avatars |
| `nav` | 256×256 | contain | Header / footer |
| `portrait` | 800×800 | contain | On-page agent photo |
| `schema` | 512×512 | contain | JSON-LD / logo |
| `hero` | 1920×1080 | cover | Page banners |
| `og` | 1200×630 | cover | Open Graph |

Delivery URL:

`https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT>`

Cloudflare serves WebP or AVIF from that variant based on the browser.

### 3. Upload originals

**Dashboard:** Hosted images → Quick Upload. Set the custom ID to match `src/data/cloudflare-image-catalog.json` (for example `maravilla/dr-jan-duffy`).

**API:** create a token with Account → Cloudflare Images → Edit, then:

```bash
CLOUDFLARE_ACCOUNT_ID=your_account_id \
CLOUDFLARE_API_TOKEN=your_token \
npm run cf:images
```

Pass `--force` to replace existing custom IDs, or `--dry-run` to print the plan.

The script prints `NEXT_PUBLIC_CF_IMAGES_HASH`. Set that in Vercel (Production + Preview).

### 4. Site integration

`<img>` / `next/image` srcs use the variant name in the delivery URL when the hash is present. Git paths remain the fallback.

Do not proxy this Vercel app through Cloudflare’s orange cloud. Images are stored in Cloudflare Images and delivered from `imagedelivery.net`, which is separate from the site DNS.

## Optional: Star ratings in search (Google Business Profile)

To show star ratings in search results, set these env vars to match your GBP (Vercel: Project → Settings → Environment Variables):

- `NEXT_PUBLIC_GBP_RATING` – average rating, e.g. `4.9`
- `NEXT_PUBLIC_GBP_REVIEW_COUNT` – total review count, e.g. `127`

Only real values from your Google Business Profile should be used.
