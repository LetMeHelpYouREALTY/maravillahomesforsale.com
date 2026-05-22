# NAP & Google Business Profile Audit

**Site:** https://www.maravillahomesforsale.com  
**GBP business name:** North Las Vegas Family Homes | Homes by Dr. Jan Duffy  
**Audit date:** May 22, 2026  
**Canonical source:** `src/lib/config/business-info.ts` (`BUSINESS_INFO`, `GBP_NAP`)

---

## Canonical NAP (must match GBP exactly)

| Field | GBP value | Site config |
|-------|-----------|-------------|
| **Name** | North Las Vegas Family Homes \| Homes by Dr. Jan Duffy | `BUSINESS_INFO.name` |
| **Address** | 5135 W Washburn Rd Suite 201, North Las Vegas, NV 89031 | `BUSINESS_INFO.address.full` |
| **Phone** | (702) 500-1953 | `BUSINESS_INFO.phone.display` |
| **SMS / Chat** | sms:+17025001953 | `BUSINESS_INFO.sms.href` |
| **Email** | DrDuffy@MaravillaHomesForSale.com | `BUSINESS_INFO.email` |
| **Website** | https://www.maravillahomesforsale.com/ | `GBP_NAP.website` |
| **Geo** | Office pin (Washburn Rd) | `36.253563, -115.153998` |

---

## Where NAP appears (codebase)

| Location | Status | Notes |
|----------|--------|-------|
| `src/lib/config/business-info.ts` | Pass | Single source of truth |
| `src/lib/siteConfig.ts` | Pass | Re-exports address from `BUSINESS_INFO` |
| `src/components/shared/BusinessNapStrip.tsx` | Pass | Full office NAP on every page (via `PageLayout`) |
| `src/components/sections/footer.tsx` | Pass | Phone, SMS, email, address, GBP links |
| `src/components/StickyContactBar.tsx` | Pass | Mobile call/text uses `BUSINESS_INFO` |
| `src/app/contact/page.tsx` | Pass | Visible address + map at office geo |
| `src/app/about/page.tsx` | Pass | `BUSINESS_INFO.address.full` |
| `src/app/privacy/page.tsx` | Pass | Full NAP block |
| `src/lib/metadata.ts` | Pass | LocalBusiness, Organization, Person, RealEstateAgent schemas |
| `src/app/layout.tsx` | Pass | Site-wide schemas + `geo.position` meta |
| `src/components/AgentSchema.tsx` | Pass | Address + geo + hours |
| `src/app/llms.txt/route.ts` | Pass | Office line for AI crawlers |
| `src/data/page-faqs.ts` | Pass | Contact/about FAQs include office address & hours |

---

## GBP fields mirrored in schema & copy

| GBP field | Site support |
|-----------|----------------|
| Categories (agent, agency, consultant) | `knowsAbout` in LocalBusiness / Agent schema |
| Description | `GBP_DESCRIPTION` in metadata, contact, llms.txt |
| Opening date Sep 20, 2009 | `foundingDate` in schema |
| Hours 6 AM–9 PM daily | `BUSINESS_INFO.hours` + `openingHoursSpecification` |
| Special closures (2026 holidays) | Contact page + `specialOpeningHoursSpecification` |
| Service area North Las Vegas, NV, USA | `serviceArea` + `areaServed` |
| Women-owned, LGBTQ+ friendly, online appointments | Contact attributes list + schema description |
| Social profiles (YouTube, LinkedIn, Facebook) | Footer + `sameAs` |
| Google Business Profile link | Footer, contact, schema `sameAs` |
| Review link | Footer “Leave a Google Review” |

---

## Intentional exceptions (not NAP errors)

- **Maravilla community maps** on neighborhood/community pages use `Maravilla, North Las Vegas, NV 89031` and `communityGeo` — this is the *community* location, not the GBP office.
- **Maravilla `Place` schema** on community/neighborhood pages describes the subdivision, not the brokerage office.

---

## Production check (deploy required)

The live contact page previously showed **4380 W Ann Rd Suite 201** (stale build). After deploying `main` / PR #2, verify:

1. https://www.maravillahomesforsale.com/contact shows **5135 W Washburn Rd Suite 201**
2. Map pin aligns with GBP
3. Google Rich Results Test shows matching `PostalAddress` and `GeoCoordinates`

---

## Maintenance

1. Update **only** `business-info.ts` when GBP changes (address, phone, hours, description).
2. Run `rg "4380|Ann Rd|DrJanSells"` before release — should return no matches.
3. Re-run this audit after any contact/footer/schema edit.
