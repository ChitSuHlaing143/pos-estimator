# POS Studio — Static POS cost estimator

HTML + custom CSS + Bootstrap 5.3.3 CSS + vanilla JavaScript. No build required.

## First open
Open index.html. Four questions, optional add-ons, live price range, text download, print/PDF, optional contact form. No contact data is stored in localStorage. Fonts and Bootstrap use CDNs; custom CSS retains usable layout if CDNs are unavailable.

## Important: DEMO prices
All prices are illustrative, NOT a recommended market quotation. Edit assets/config.js before publishing, and mirror the pricing tables/version in backend/Code.gs. The server calculates its own estimate; it does not trust browser totals. Branch and counter surcharges are planning ranges, not per-counter/per-branch invoices. 4+ branches/counters, other shop types, offline and integrations require manual review. Base includes single-store/single-counter sales, basic stock, receipt, return, customer list and basic reports. Complete adds purchasing, suppliers, debt, expenses and estimated profit. Optional add-ons apply to either package without duplicating these included features. Hosting/hardware/support are excluded.

## GitHub Pages hosting
1. Create your GitHub repository.
2. Upload index.html and assets/ at repository root. No personal customer records or credentials in Git.
3. Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. Visit the URL shown by GitHub Pages. Relative asset paths also work under /repository-name/.
5. Keep backend/Code.gs as a template; it is executed in Apps Script, not GitHub Pages. It contains no spreadsheet ID or credentials.

## Save customer enquiries to a private Google Sheet
1. Create a Google Spreadsheet; keep sharing Restricted. Copy ID between /d/ and /edit in its URL.
2. Open script.google.com → New project. Paste backend/Code.gs into Code.gs.
3. Project Settings → Script Properties → add SPREADSHEET_ID with that ID. Never put private credentials into front-end JavaScript.
4. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone (if your account/admin allows anonymous access). Authorize requested permissions.
5. Copy deployed /exec URL into endpoint in assets/config.js and upload the changed file to GitHub.
6. Submit a test lead. A NEW TAB displays the server result. Only its success page confirms a stored row. Frontend deliberately does not claim success based on an opaque no-cors response.
7. Check Leads tab. Headers and sheet are created automatically. Test by submitting the same request twice: only one row should exist. Every distinct new enquiry receives a UUID.
8. After changing Apps Script, Deploy → Manage deployments → Edit → New version → Deploy.

Sheet columns: time, request ID, name, phone, address, shop, branch range, counter range, package, add-on IDs, server estimate min/max, pricing version, status, consent. Customer details and selections are collected only when the visitor consents and submits. All enquiries are preliminary; review before confirming scope/quote.

## Operational notes
- Public Apps Script URL is not a secret. This starter includes field validation, payload limits, honeypot, formula protection, locking and duplicate-ID protection. It does NOT include verified CAPTCHA or robust abuse rate limits. For a public advertising campaign, add a server-verified CAPTCHA/rate-limited endpoint before accepting traffic at scale. A frontend API key is not protection.
- Do not publish the spreadsheet. Limit staff access, choose a contact-data retention period and delete old leads. Replace generic privacy/contact wording with your business identity before launch.
- Free-service quotas and organization policies can affect submissions. Failed saves show failure, never success. No live backend has been provisioned with this download.
- Native form POST avoids cross-origin fetch/CORS ambiguity. Browser opens a result tab; returning to the original page preserves the form. Browser/network failure may leave an unknown result: retrying unchanged uses the same UUID to avoid duplicates.

## Validation checklist before launch
Test phone and consent validation; all four steps/back navigation; each package and extra; print/download; narrow mobile widths; actual anonymous submission; duplicate submission; missing/invalid spreadsheet ID; deployment permission failure; and agreement between browser and server prices.

Official references:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
https://developers.google.com/apps-script/guides/web
