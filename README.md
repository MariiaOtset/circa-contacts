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
