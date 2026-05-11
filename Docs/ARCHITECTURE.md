# Architecture Document
## SiliconQ — Quantum Statistical Simulator

---

## 1. Architecture Style

**Single-Page Application (SPA)** — fully client-side, no backend required for core simulation.  
All physics computations run in the browser. No user data leaves the client.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│                                                     │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────┐ │
│  │  UI Layer │──▶│ State Manager│──▶│ Physics     │ │
│  │ (React)  │   │  (Zustand)   │   │ Engine (JS) │ │
│  └──────────┘   └──────────────┘   └─────────────┘ │
│       │                                   │         │
│  ┌──────────┐                   ┌─────────────────┐ │
│  │  Charts  │                   │ Constants Store  │ │
│  │(Recharts)│                   │  (Si parameters) │ │
│  └──────────┘                   └─────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | React 18 | Component model, fast re-renders |
| State | Zustand | Lightweight, no boilerplate |
| Charts | Recharts + D3.js | Scientific plotting, custom axes |
| Math | mathjs | Arbitrary precision, physics formulas |
| Styling | Tailwind CSS | Utility-first, rapid UI |
| Build | Vite | Fast HMR, ESM native |
| Export | html2canvas + PapaParse | PNG and CSV export |
| Testing | Vitest + React Testing Library | Unit + integration |

---

## 4. Module Breakdown

### 4.1 Physics Engine (`/src/physics/`)

```
physics/
├── constants.js        # Si physical constants (Eg, me*, mh*, k, h)
├── fermiDirac.js       # f(E) = 1/(1+exp((E-Ef)/kT))
├── carrierDensity.js   # ni, n, p calculations
├── fermiLevel.js       # Ef vs T, Ef vs doping
├── effectiveDOS.js     # Nc(T), Nv(T)
└── varshni.js          # Eg(T) temperature correction
```

### 4.2 UI Components (`/src/components/`)

```
components/
├── ControlPanel/       # Parameter sliders and toggles
├── Charts/
│   ├── FermiDiracPlot.jsx      # f(E) vs E
│   ├── CarrierDensityPlot.jsx  # n,p,ni vs T
│   ├── FermiLevelTempPlot.jsx  # Ef vs T
│   ├── FermiLevelDopingPlot.jsx# Ef vs Nd/Na
│   └── BandDiagram.jsx         # Ec, Ev, Ef visual
├── ResultsPanel/       # Computed values display
└── ExportButton/       # PNG + CSV export
```

### 4.3 State (`/src/store/`)

```
store/
└── simulationStore.js  # Zustand store: T, dopingType, Nd, Na, results
```

---

## 5. Data Flow

```
User adjusts slider
      │
      ▼
Zustand store updates (T, Nd, Na, dopingType)
      │
      ▼
Physics Engine computes (n, p, ni, Ef, f(E) arrays)
      │
      ▼
Chart components re-render with new data arrays
      │
      ▼
ResultsPanel displays computed scalar values
```

---

## 6. Physics Computation Pipeline

```
Input: T, Nd, Na
  │
  ├─▶ varshni(T) ──▶ Eg(T)
  ├─▶ effectiveDOS(T) ──▶ Nc(T), Nv(T)
  ├─▶ ni = sqrt(Nc·Nv)·exp(-Eg/2kT)
  ├─▶ chargeNeutrality(Nd, Na, ni) ──▶ n, p
  └─▶ fermiLevel(n, ni, T) ──▶ Ef
```

---

## 7. File Structure

```
siliconq/
├── public/
├── src/
│   ├── physics/
│   ├── components/
│   ├── store/
│   ├── utils/
│   │   ├── exportPNG.js
│   │   └── exportCSV.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 8. Performance Considerations

- All physics loops run synchronously (arrays ≤ 1000 points); no Web Worker needed for MVP
- Memoize expensive computations with `useMemo` keyed on input params
- Charts use `isAnimationActive={false}` for large datasets to maintain <200ms render

---

## 9. Security & Privacy

- No backend, no user data stored or transmitted
- No authentication required
- Static hosting compatible (GitHub Pages, Vercel, Netlify)
