# Backend Development Plan
## SiliconQ — Quantum Statistical Simulator

---

## 1. Backend Philosophy

The MVP is **fully client-side** — the physics engine runs in JavaScript in the browser. No backend server is required for core simulation functionality.

However, a lightweight backend **is planned** for these extended features:

| Feature | Why backend needed |
|---------|-------------------|
| User saved simulations | Persist user-created configurations |
| Shareable simulation URLs | Generate short links with encoded state |
| Heavy computation (future) | Python/NumPy for advanced NEGF transport |
| Analytics | Track usage for academic reporting |
| PDF report generation | Server-side LaTeX or Puppeteer rendering |

---

## 2. Backend Stack (When Implemented)

| Layer | Technology | Reason |
|-------|-----------|--------|
| Runtime | Node.js 20 (LTS) | JS ecosystem consistency with frontend |
| Framework | Fastify | Fast, low overhead |
| Database | PostgreSQL | Structured simulation configs |
| ORM | Prisma | Type-safe DB access |
| Cache | Redis | Session + rate limiting |
| Auth | JWT (stateless) | Simple, no session store needed |
| Deployment | Docker + Railway / Render | Simple containerized deploy |
| API style | REST | Simple, no graph complexity needed |

---

## 3. API Endpoints

### 3.1 Simulation State — Save & Share

```
POST   /api/simulations          Save simulation config
GET    /api/simulations/:id      Load simulation by ID
GET    /api/simulations/share/:slug  Load by short slug
DELETE /api/simulations/:id      Delete simulation
```

**POST /api/simulations request body:**
```json
{
  "label": "N-type at 300K",
  "params": {
    "temperature": 300,
    "dopingType": "n-type",
    "donorConc": 1e16,
    "acceptorConc": 0
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "slug": "si-300k-nd16",
  "shareUrl": "https://siliconq.app/sim/si-300k-nd16",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### 3.2 Report Generation

```
POST /api/reports/pdf     Generate PDF report of current simulation
```

**Request body:**
```json
{
  "simulationId": "uuid",
  "includeCharts": ["fermiDirac", "carrierVsTemp", "EfVsTemp"],
  "includeFormulas": true
}
```

**Response:** Binary PDF stream

---

### 3.3 Advanced Physics (Future — Python microservice)

```
POST /api/physics/advanced/negf        Non-equilibrium Green's function
POST /api/physics/advanced/quantum-well Quantum well energy levels
```

These will be a separate Python microservice (FastAPI + NumPy/SciPy) proxied through the Node backend.

---

## 4. Database Schema

### Table: `simulations`

```sql
CREATE TABLE simulations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(64) UNIQUE,
  label       VARCHAR(128),
  params      JSONB NOT NULL,
  results     JSONB,
  created_at  TIMESTAMP DEFAULT NOW(),
  expires_at  TIMESTAMP  -- NULL = permanent
);
```

### Table: `analytics_events` (optional)

```sql
CREATE TABLE analytics_events (
  id         BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(64),
  payload    JSONB,
  ts         TIMESTAMP DEFAULT NOW()
);
```

---

## 5. Server Structure

```
server/
├── src/
│   ├── routes/
│   │   ├── simulations.js
│   │   └── reports.js
│   ├── services/
│   │   ├── simulationService.js
│   │   └── reportService.js
│   ├── db/
│   │   ├── prisma.js
│   │   └── schema.prisma
│   ├── middleware/
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── slugGenerator.js
│   └── app.js
├── Dockerfile
├── .env.example
└── package.json
```

---

## 6. Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/siliconq
REDIS_URL=redis://localhost:6379
JWT_SECRET=...
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://siliconq.app
```

---

## 7. Deployment

```
Frontend: Static build → Vercel / Netlify (CDN)
Backend:  Docker container → Railway / Render
Database: Managed PostgreSQL → Supabase / Railway
Cache:    Managed Redis → Upstash
```

CI/CD:
- GitHub Actions: test + build on PR
- Auto-deploy main branch to staging
- Manual promote to production

---

## 8. Security

- Rate limit: 100 req/min per IP (Redis)
- CORS: whitelist frontend domain only
- Input validation: Zod schemas on all POST bodies
- SQL injection: impossible via Prisma parameterized queries
- Simulation params: validate all numeric ranges server-side

---

## 9. MVP Decision

**For the initial release, skip backend entirely.**  
All simulation data lives in browser state. Share via URL query params (base64-encoded state in URL hash). No server required.

Backend development begins in Phase 2 when PDF reports and persistence are needed.
