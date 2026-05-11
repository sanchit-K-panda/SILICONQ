# Frontend Development Plan
## SiliconQ — Quantum Statistical Simulator

---

## 1. Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool / dev server |
| Tailwind CSS | 3.x | Utility styling |
| Recharts | 2.x | Chart library (Fermi-Dirac, carrier plots) |
| D3.js | 7.x | Custom band diagram SVG |
| Zustand | 4.x | Global state |
| mathjs | 12.x | Physics math |
| html2canvas | 1.x | PNG export |
| PapaParse | 5.x | CSV export |

---

## 2. Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ResultsBar.jsx
│   ├── controls/
│   │   ├── TemperatureSlider.jsx
│   │   ├── DopingSlider.jsx
│   │   ├── DopingTypeToggle.jsx
│   │   └── PresetSelector.jsx
│   ├── charts/
│   │   ├── FermiDiracChart.jsx
│   │   ├── CarrierVsTempChart.jsx
│   │   ├── EfVsTempChart.jsx
│   │   ├── EfVsDopingChart.jsx
│   │   └── BandDiagramSVG.jsx
│   ├── results/
│   │   └── ResultsPanel.jsx
│   └── export/
│       └── ExportButtons.jsx
├── physics/
│   ├── constants.js
│   ├── varshni.js
│   ├── effectiveDOS.js
│   ├── fermiDirac.js
│   ├── carrierDensity.js
│   └── fermiLevel.js
├── store/
│   └── simulationStore.js
├── utils/
│   ├── formatNumber.js
│   ├── exportPNG.js
│   └── exportCSV.js
├── hooks/
│   └── useSimulation.js
├── App.jsx
└── main.jsx
```

---

## 3. UI Design Spec

### Color Palette (Dark Scientific Theme)
```css
--bg-primary:    #0a0e1a;   /* deep navy */
--bg-secondary:  #111827;   /* card bg */
--bg-panel:      #1a2234;   /* sidebar */
--accent-cyan:   #00d4ff;   /* primary accent */
--accent-green:  #00ff88;   /* n-type color */
--accent-red:    #ff4d6d;   /* p-type color */
--accent-yellow: #ffd700;   /* intrinsic / Ef color */
--text-primary:  #e8edf5;
--text-muted:    #6b7fa3;
--border:        #1e3050;
```

### Typography
- Display: `'Space Mono'` (Google Fonts) — monospace, scientific feel
- Body: `'Inter'` — clean readability
- Numbers/values: `'JetBrains Mono'` — precise numeric display

### Layout
- Left sidebar: 280px fixed — all controls
- Main area: remaining width — tabbed charts
- Bottom bar: 60px — results readout
- Header: 56px — title + preset buttons

---

## 4. Component Implementation Plan

### 4.1 ControlPanel

**TemperatureSlider**
- Range: 100–700 K
- Step: 1K
- Shows: current value, kT in eV
- Color: gradient cold→hot

**DopingSlider**
- Log scale: 1e12 – 1e20 cm⁻³
- Shows: value in scientific notation
- Separate for Nd and Na

**DopingTypeToggle**
- Three-way: Intrinsic | N-type | P-type
- Disables irrelevant doping slider

**PresetSelector**
- Dropdown presets:
  - "Si at 300K, N-type 1e16"
  - "Si at 300K, Intrinsic"
  - "High-temp intrinsic (500K)"
  - "Freeze-out (100K)"
  - "Degenerate N-type (1e19)"

---

### 4.2 Charts

**FermiDiracChart**
```
- X: Energy (eV), range Ev-0.5 to Ec+0.5
- Y: f(E), 0 to 1
- Lines: f(E) at current T (cyan), optionally overlay T-50, T+50
- Markers: vertical dashed lines for Ec, Ev, Ef
- Recharts LineChart + ReferenceLines
```

**CarrierVsTempChart**
```
- X: Temperature 100K–700K
- Y: Concentration cm⁻³ (log scale, 1e6–1e21)
- Lines: n (green), p (red), ni (yellow dashed)
- Vertical markers: freeze-out edge, intrinsic onset
- Recharts ComposedChart with log Y axis
```

**EfVsTempChart**
```
- X: Temperature 100K–700K
- Y: Ef in eV (relative to Ei)
- Line: single Ef curve
- Shaded bands: freeze-out / extrinsic / intrinsic regions
- D3 or Recharts with custom background
```

**EfVsDopingChart**
```
- X: Nd or Na (log scale, 1e12–1e20)
- Y: Ef – Ei in eV
- Lines: N-type (green), P-type (red)
- Reference: midgap (Ef=Ei) horizontal line
```

**BandDiagramSVG**
```
- Pure D3 / SVG
- Horizontal bands: Ec (top), Ev (bottom), Ef (dashed horizontal)
- Shading: conduction band fill above Ec, valence band fill below Ev
- Arrows: electron transitions (optional, v2)
- Updates: Ef position moves with parameter changes
- Annotations: label Ec, Ev, Ef, Eg gap
```

---

### 4.3 ResultsPanel

Display row of live-computed values:
```
| n = 1.00×10¹⁶ cm⁻³ | p = 2.25×10⁴ cm⁻³ | ni = 1.50×10¹⁰ cm⁻³ | Ef = 0.347 eV | Eg = 1.12 eV |
```
- Color-coded: n in green, p in red, ni in yellow
- Click to copy value

---

## 5. Physics Hook — `useSimulation`

```javascript
// hooks/useSimulation.js
// On every store update, recompute:
// 1. Eg(T) via Varshni
// 2. Nc(T), Nv(T)
// 3. ni(T)
// 4. n, p via charge neutrality
// 5. Ef
// 6. Generate f(E) array (500 points)
// 7. Generate carrier vs T sweep (100–700K, 100 points)
// 8. Generate Ef vs T sweep
// 9. Generate Ef vs Doping sweep
// Update store.results and store.*Data arrays
```

---

## 6. Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| > 1200px | Sidebar left + chart grid 2×2 |
| 768–1200px | Sidebar top collapsed + charts stacked |
| < 768px | Mobile: accordion controls + single chart |

---

## 7. Accessibility

- All sliders have `aria-label` and `aria-valuetext`
- Charts include `<title>` and `<desc>` in SVG
- Color choices pass WCAG AA contrast on dark background
- Keyboard navigation for all controls

---

## 8. Sprint Breakdown

| Sprint | Tasks |
|--------|-------|
| S1 (Days 1–2) | Vite setup, Tailwind, folder structure, routing |
| S2 (Days 3–5) | Physics engine + unit tests |
| S3 (Days 6–8) | Control panel + Zustand store |
| S4 (Days 9–12) | All 5 charts implemented |
| S5 (Days 13–14) | ResultsPanel, BandDiagram, Export |
| S6 (Days 15–16) | Polish, responsive, accessibility |
| S7 (Day 17) | Final QA + deploy |
