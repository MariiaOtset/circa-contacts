# CIRCA — Your people, beautifully organised

A modern personal contact manager with account-based authentication, cloud-backed contact CRUD, thoughtful search and a polished responsive interface. Redesigned as a portfolio-quality product based on an original React assignment.

**Original deployed URL:** https://goit-react-hw-08-tau-ecru.vercel.app/  
**Working branch:** `feat/portfolio-redesign-v1`

## What changed

- New CIRCA identity and responsive editorial landing with an illustrative contact-manager preview
- Professional login and registration experience with validation, loading feedback and password visibility controls
- Authenticated dashboard with responsive contact cards, contact count and favourites count
- Add, view, edit and delete contacts, including a deliberate deletion confirmation
- Search across name and phone number; sort contacts alphabetically or by API order
- Save favourite **contact IDs** locally per signed-in account (favourites are **not synced** across devices)
- Export all contacts as a UTF-8 CSV, with spreadsheet formula injection precautions
- Polished loading, empty and error states, accessible button labels, and mobile navigation
- Fixed incorrect contact-loading selector and improved auth error handling

## Technologies

React 18 · Vite · React Router · Redux Toolkit · Redux Persist (auth only) · Axios · Formik · Yup · React Hot Toast · CSS Modules · GoIT Connections API

## Local setup

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
npm run lint
```

The app uses the external GoIT Connections API (`https://connections-api.goit.global`). User data, login and contacts are managed by that service. No custom authentication or backend is included.

## Data and portfolio notes

- **Never use the illustrative landing-preview contacts as real data:** they are design-only samples.
- Contacts are re-fetched for the authenticated account. The address book is **not persisted to shared localStorage**, reducing the risk of stale data showing across accounts.
- Only the existing authentication token is persisted as part of the original session mechanism.
- Do not merge this branch until desktop/mobile QA and backend integration checks are complete; the original production site remains unchanged.
- No paid APIs or subscriptions added.

Designed and implemented by [Mariia Otset](https://github.com/MariiaOtset).

## V2 — richer CIRCA contacts experience

- Shorter, denser landing page with a genuinely interactive fictional-contact preview (search and favourite sample contacts without an account).
- Browser-only groups (Friends, Family, Work, Other), filter by group, and switch between spacious cards and compact list rows.
- One-click phone-number copying.
- CSV import with a local file preview, basic validation, duplicate detection and an explicit confirmation step. Supports a header with `Name` and `Phone number` and up to 200 rows per file.
- Better documentation of data boundaries: contact data is stored with the authenticated API, while starred IDs and group labels are browser-only and not synced to other devices.

**Important:** importing sends confirmed contacts to the existing external GoIT API using the signed-in session. No third-party upload service was introduced. Always review the preview before importing.

## Responsive dashboard refinement

The authenticated address book prioritises contacts above decorative content:
- Compact directory header and inline contact/favourites counters replace a tall promotional-style hero.
- Full-width responsive contacts grid displays more people without requiring excessive scrolling.
- **Add contact** opens a native accessible dialog instead of occupying a permanent right-hand sidebar.
- The privacy notice is a short line beneath the directory, preventing empty full-height columns on tablet and laptop widths.
- Filters, CSV import/export, favourites, groups, edit and delete remain available.

## Compact workspace and native contact export

- The desktop login/register layouts fit inside standard laptop viewport heights without a full-page scroll; short screens may scroll within the form panel for accessibility.
- The contacts list now has one compact row per person on desktop and a structured two-row layout on phones. Nonessential labels have been removed, but favourite toggles, groups, copy, edit and delete still work.
- CIRCA now remembers the selected contact layout on the current device, defaulting to list view.
- **Export vCard (.vcf)** downloads the signed-in address book in an importable vCard 3.0 format (names and telephone numbers). Existing CSV export/import still work.
- Footer copy uses normal brand copyright, without presentation-only portfolio labels.
