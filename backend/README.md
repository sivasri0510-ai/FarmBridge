# FarmBridge Backend

Node.js · Express 5 · MongoDB (Mongoose 9) REST API for the FarmBridge React frontend.

## Quick start

```bash
npm install
cp .env.example .env        # then edit MONGO_URI and JWT_SECRET
npm run seed                # optional: loads the sample data the frontend hard-codes today
npm run dev                 # http://localhost:5000   (nodemon)
npm test                    # 18 smoke tests – no database required
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | start with nodemon (auto-restart) |
| `npm start` | production start |
| `npm run seed` / `seed:reset` | insert sample data / wipe + insert (blocked when `NODE_ENV=production`) |
| `npm test` | Jest + Supertest |

## Environment variables

| Key | Required | Example | Notes |
|---|---|---|---|
| `PORT` | no (5000) | `5000` | |
| `NODE_ENV` | no | `development` | `production` hides internal error details |
| `MONGO_URI` | **yes** | `mongodb://127.0.0.1:27017/farmbridge` | or an Atlas `mongodb+srv://…` URI |
| `FRONTEND_URL` | **yes** | `http://localhost:5173` | CORS allow-list; comma-separate several origins |
| `JWT_SECRET` | **yes** | 48+ random bytes | server refuses to start if < 16 chars |
| `JWT_EXPIRES_IN` | no (7d) | `7d` | |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | seed only | | |

## Response format

```jsonc
// success
{ "success": true, "data": { … } }
{ "success": true, "count": 3, "total": 3, "page": 1, "pages": 1, "data": [ … ] }   // lists
// failure
{ "success": false, "message": "Validation failed", "errors": [{ "field": "price", "message": "…" }] }
```

Status codes: `200` OK · `201` Created · `400` validation · `401` not logged in / bad token · `403` wrong role or not owner ·
`404` not found · `409` duplicate (email) · `429` rate-limited · `500` unexpected.

## Endpoints (all under `/api/v1`)

| Method | Path | Auth | Frontend page |
|---|---|---|---|
| POST | `/auth/register` `{name,email,password,role}` | – | Register |
| POST | `/auth/login` `{email,password}` | – | Login |
| GET | `/auth/me` · POST `/auth/logout` | token | – |
| POST | `/produce` `{farmerName,crop,quantity,quality,price,location,variety?,harvestDate?}` | Farmer | SellProduce |
| GET | `/produce?crop=&variety=&quality=&location=` | – | (buyers browsing lots) |
| GET | `/produce/mine` | Farmer | – |
| GET/PATCH/DELETE | `/produce/:id` | GET public; write = owner/Admin | – |
| GET | `/buyers?search=&crop=&location=` | – | FindBuyers |
| GET | `/buyers/:id` | – | BuyerDetails |
| POST | `/buyers` · PATCH/DELETE `/buyers/:id` | Buyer · owner/Admin | – |
| POST | `/buyers/:id/inquiries` `{message}` | token | ContactBuyer |
| GET | `/inquiries` · `/inquiries/received` | token · Buyer | – |
| POST | `/aggregation/match` `{crop,variety,quality,location,quantity?}` | – | SmartAggregation |
| GET | `/market-prices?crop=&market=` | – | MarketPrices |
| POST/PATCH/DELETE | `/market-prices[/:id]` | Admin | – |
| POST | `/net-realization/calculate` | – | NetRealization |
| GET | `/services` | – | Services |
| GET | `/services/:category?search=&location=` | – | Seeds … Processing, CollectionCenter |
| GET | `/services/:category/:id` | – | Collection centre "View Details" |
| POST | `/services/:category` · PATCH/DELETE `/:category/:id` | Service Provider · owner/Admin | – |
| POST | `/contact` `{name,email,message}` | – | Contact |
| GET | `/contact` | Admin | – |

`:category` ∈ `seeds, fertilizers, irrigation, machinery, labour, logistics, collection-centers, pack-houses, processing`.
Roles: `Farmer`, `Buyer`, `Service Provider` (self-registered) and `Admin` (created by the seed script only).

## Frontend changes required

Copy `frontend-api-client/api.js` into `src/api.js`, set `VITE_API_URL`, then:

1. **Login / Register** – call `login()` / `register()` instead of `localStorage.setItem('isLoggedIn')`. Passwords must be ≥ 8 chars.
2. **BuyerDetails / ContactBuyer** – read the buyer with `getBuyer(useParams().id)` (new routes `/buyers/:id`, `/buyers/:id/contact`) – router `state` is lost on refresh. Use `isLoggedIn()` for the contact gate.
3. **SellProduce** – `submitProduce(form)`; optionally add `variety` and `harvestDate` inputs so lots can be matched by SmartAggregation.
4. **SmartAggregation** – `findMatches(form)` → `{ matches, totalQuantity }`.
5. **FindBuyers, MarketPrices, service pages, Contact** – swap hard-coded arrays / local state for the matching helper.

## Design notes

- Express 5: rejected promises in async handlers reach the error middleware automatically.
- Aggregation matching = case-insensitive **exact** match on crop, variety, quality, location (same as the frontend); only available lots are returned and farmer contact details are never exposed.
- `Buyer.requirement` is a virtual (`"1000 kg"`) so the existing JSON shape is preserved.
- Not included yet (good next steps): refresh tokens, email notifications for inquiries, image uploads, Swagger docs, integration tests against `mongodb-memory-server`.
