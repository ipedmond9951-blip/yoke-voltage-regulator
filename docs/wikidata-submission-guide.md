# WikiData YOKE Entity Submission Guide

## Status: PREPARED, AWAITING USER REVIEW
The QuickStatements batch is in `docs/wikidata-quickstatements.txt`.
**Do not submit until user has confirmed independent sources are documented.**

## Why not auto-submit?
1. **WP:Notability check required**: WikiData items backed by self-references alone are routinely deleted.
2. **Independent reliable sources needed**: News articles, industry publications, government registrations, etc.
3. **Submitter identity matters**: First-time submitters with low edit history have submissions flagged for review.
4. **YOKE brand migration from TradeGo**: Old TradeGo WikiData entries exist that may conflict.

## Pre-Submission Checklist

### Independent sources (minimum 3-5 needed)
- [ ] China Customs export data (中国海关总署) showing YOKE exports to Africa
- [ ] IEC/CE/CB certification database entries (YOKE products with cert numbers)
- [ ] China Patent Office (CNIPA) — search "yoke 稳压器" for granted patents
- [ ] Industry publications (e.g., IEEE Power & Energy Society, China Electrical Equipment Industry Association)
- [ ] Customer logos on YOKE website referencing public companies
- [ ] Press releases / news articles in African B2B publications (e.g., ESI Africa, Engineering News)
- [ ] LinkedIn company page with employee count and operations
- [ ] Crunchbase profile with funding/registration info

### Identity verification
- [ ] Verify "ipedmond9951" is current WikiData user with edit history
- [ ] If new user, build edit history first (suggested: 50+ edits to other items)
- [ ] If user is conflicted (paid by YOKE), disclose per WikiData conflict of interest policy

## QuickStatements file location
`docs/wikidata-quickstatements.txt`

## Submission tool
https://quickstatements.toolforge.org/#/v1
1. Login with WikiData account
2. Paste contents of `docs/wikidata-quickstatements.txt`
3. Click "Run" → review → confirm

## After Submission
- New Q-ID will be assigned (e.g., Q12345678)
- Add to OrganizationSchema sameAs:
  ```typescript
  'https://www.wikidata.org/wiki/Q12345678'
  ```
- Re-deploy with new Q-ID
- Cross-link YOKE articles to WikiData Q-ID
