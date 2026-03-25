# DevScout

An IT job aggregation platform that fetches and displays tech job listings across six domains — behind a secure authenticated dashboard.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT via httpOnly cookies (7-day sessions)
- **Jobs:** JSearch API (RapidAPI) · auto-refreshed twice daily via `node-cron`

## Project Structure
```
DevScout/
├── client/          # React + Vite frontend
│   └── src/
│       ├── pages/   # Login, Register, Dashboard
│       ├── components/  # Navbar, JobCard, SearchFilters, Loader, ProtectedRoute
│       ├── context/ # AuthContext (login / register / logout)
│       └── api/     # Axios instance
└── server/          # Express backend
    ├── routes/      # /api/auth, /api/jobs
    ├── models/      # User, Job (Mongoose schemas)
    ├── middleware/  # JWT auth guard
    ├── cron/        # Job fetcher + seed script
    └── config/      # MongoDB connection
```

## Getting Started

### Prerequisites
- Node.js ≥ 18, MongoDB (local or Atlas)

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment

```bash
cd server
cp .env.example .env
```

```env
MONGO_URI=mongodb://localhost:27017/devscout
JWT_SECRET=your_strong_secret
PORT=5000
CLIENT_URL=http://localhost:5173
RAPIDAPI_KEY=your_rapidapi_key   # optional — only needed for live fetching
RAPIDAPI_HOST=jsearch.p.rapidapi.com
```

### 3. Seed the database (no API key needed)

```bash
cd server && npm run seed
```

### 4. Run

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```
Open [http://localhost:5173](http://localhost:5173), register an account, and start browsing.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | — | Create account |
| `POST` | `/api/auth/login` | — | Login, sets cookie |
| `POST` | `/api/auth/logout` | — | Clears cookie |
| `GET`  | `/api/auth/me` | ✅ | Current user |
| `GET`  | `/api/jobs` | ✅ | Filtered, paginated jobs |
| `GET`  | `/api/health` | — | Health check |

**Job filters** (`GET /api/jobs`): `domain`, `type`, `remote`, `page`, `limit`

**Domains:** `SDE` · `Data Science` · `ML` · `AI` · `Cloud Computing` · `Cybersecurity`

## Scripts

| Directory | Command | Description |
|-----------|---------|-------------|
| `server/` | `npm run dev` | Start with hot-reload |
| `server/` | `npm run seed` | Seed sample job data |
| `client/` | `npm run dev` | Start Vite dev server |
| `client/` | `npm run build` | Production build |

## License
[MIT](LICENSE)
