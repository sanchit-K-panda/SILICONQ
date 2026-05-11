# AI Agent Development Plan
## SiliconQ — Quantum Statistical Simulator

---

## 1. Role of the AI Agent

The AI coding agent is responsible for implementing the full SiliconQ application from the specifications in this repository. The agent must follow the PRD, ARCHITECTURE, HLD, and development plans strictly without inventing features or deviating from the physics.

---

## 2. Agent Task Breakdown

### Phase 1 — Project Scaffolding

**Task 1.1: Initialize Project**
```bash
npm create vite@latest siliconq -- --template react
cd siliconq
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts d3 zustand mathjs html2canvas papaparse
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Task 1.2: Configure Tailwind**
- Edit `tailwind.config.js` with content paths
- Set up custom color tokens from FRONTEND_DEV_PLAN color palette in `index.css`

**Task 1.3: Set up folder structure**
- Create all folders from ARCHITECTURE.md section 7
- Create placeholder `index.js` in each folder

---

### Phase 2 — Physics Engine

**Task 2.1: `src/physics/constants.js`**
```javascript
// Export all Si physical constants from CONTEXT.md section 3
// k, h, m0, me_eff, mh_eff, Nc_300, Nv_300
// Use SI units internally, convert to eV/cm⁻³ as needed
```

**Task 2.2: `src/physics/varshni.js`**
```javascript
// Eg(T) = 1.170 - (4.73e-4 * T^2) / (T + 636)
// Export: function egSilicon(T: number): number (eV)
// Validate: egSilicon(300) ≈ 1.12 eV
```

**Task 2.3: `src/physics/effectiveDOS.js`**
```javascript
// Nc(T) = 2.8e19 * (T/300)^1.5
// Nv(T) = 1.04e19 * (T/300)^1.5
// Export: nc(T), nv(T) in cm⁻³
```

**Task 2.4: `src/physics/carrierDensity.js`**
```javascript
// ni(T) = sqrt(Nc * Nv) * exp(-Eg / (2 * k * T))
// n, p from charge neutrality (see HLD section 3.5)
// Handle degenerate case warning when Ef enters band
// Export: ni(T), computeCarriers(T, Nd, Na)
```

**Task 2.5: `src/physics/fermiLevel.js`**
```javascript
// Ei = midgap with Nv/Nc correction
// Ef from n and ni: kT * ln(n/ni) + Ei
// Export: intrinsicLevel(T), fermiLevel(n, ni, T)
```

**Task 2.6: `src/physics/fermiDirac.js`**
```javascript
// f(E) = 1 / (1 + exp((E - Ef) / (k * T)))
// generateFDArray(Ef, T, Ev, Ec, nPoints=500)
// Returns [{E: number, fE: number}]
```

**Agent validation checkpoints (run after each task):**
- T=300K, Nd=0: ni ≈ 1.5×10¹⁰ cm⁻³
- T=300K, Nd=1e16: n ≈ 1e16, p ≈ 2.25e4, Ef–Ei ≈ 0.347 eV
- f(Ef) = 0.5 at any T

---

### Phase 3 — State Management

**Task 3.1: `src/store/simulationStore.js`**
```javascript
// Zustand store with schema from HLD section 5
// Actions: setTemperature, setDopingType, setDonorConc, setAcceptorConc
// On any action: recompute all results + chart data arrays
// Sweep for carrierVsTemp: T from 100 to 700, step 10K
// Sweep for EfVsTemp: same range
// Sweep for EfVsDoping: log sweep 1e12 to 1e20, 100 points
```

---

### Phase 4 — Control Panel Components

**Task 4.1: `TemperatureSlider.jsx`**
- HTML range input 100–700, step 1
- Display T in K and kT in meV
- Bind to store.setTemperature

**Task 4.2: `DopingSlider.jsx`**
- Log slider: map linear 12–20 → 10^value
- Display in scientific notation (e.g., 1.00×10¹⁶)
- Props: type ('donor' | 'acceptor'), disabled if dopingType mismatch

**Task 4.3: `DopingTypeToggle.jsx`**
- Three segmented buttons: Intrinsic | N-type | P-type
- Bind to store.setDopingType

**Task 4.4: `PresetSelector.jsx`**
- Dropdown with presets defined in FRONTEND_DEV_PLAN section 4.1
- On select: dispatch setTemperature + setDopingType + setDonorConc + setAcceptorConc

---

### Phase 5 — Chart Components

**Task 5.1: `FermiDiracChart.jsx`**
- Recharts LineChart
- Data from store.fermiDiracData
- ReferenceLines for Ec, Ev, Ef
- Tooltip showing E (eV) and f(E)

**Task 5.2: `CarrierVsTempChart.jsx`**
- Recharts ComposedChart
- Y axis: logarithmic, domain [1e4, 1e21]
- Three lines: n (green), p (red), ni (yellow dashed)
- Legend

**Task 5.3: `EfVsTempChart.jsx`**
- Recharts LineChart
- Y: Ef – Ei in eV
- ReferenceArea for freeze-out, extrinsic, intrinsic bands
- ReferenceLine at y=0 (midgap)

**Task 5.4: `EfVsDopingChart.jsx`**
- Recharts LineChart, log X axis
- Show both N-type and P-type curves simultaneously
- Mark current doping with dot

**Task 5.5: `BandDiagramSVG.jsx`**
- Pure SVG (D3 for scale calculations)
- Draw: Ec bar, Ev bar, Ef dashed line
- Shade: CB above Ec (cyan tint), VB below Ev (red tint)
- Label: Ec, Ev, Ef, Eg gap arrow
- Animate Ef position on parameter change (CSS transition)

---

### Phase 6 — Results & Export

**Task 6.1: `ResultsPanel.jsx`**
- Read from store.results
- Display: n, p, ni, Ef, Eg, Nc, Nv
- Format with `formatScientific(val, 3)` utility
- Color coding per FRONTEND_DEV_PLAN

**Task 6.2: `ExportButtons.jsx`**
- PNG: use html2canvas on chart container ref
- CSV: use PapaParse to unparse current sweep data
- Filename: `siliconq_T{T}_{dopingType}_{Nd}.csv`

---

### Phase 7 — App Assembly

**Task 7.1: `App.jsx`**
- Layout: Header + Sidebar (controls) + Main (tabbed charts) + ResultsBar
- Tab state: local React useState (not in Zustand)
- Tabs: f(E) | n,p vs T | Ef vs T | Ef vs Doping | Band Diagram

**Task 7.2: Styling**
- Apply dark theme CSS variables from FRONTEND_DEV_PLAN
- Import Google Fonts: Space Mono, JetBrains Mono
- Ensure chart backgrounds transparent (inherit panel bg)

---

### Phase 8 — Testing

**Task 8.1: Physics unit tests**
```javascript
// tests/physics/carrierDensity.test.js
// Test: ni(300) ≈ 1.5e10 within 5%
// Test: n(300, 1e16, 0) ≈ 1e16
// Test: np product = ni² (mass action law)
// Test: Ef(T→large) → Ei (intrinsic limit)
```

**Task 8.2: Component smoke tests**
- FermiDiracChart renders without crash
- ControlPanel sliders update store
- ResultsPanel shows non-NaN values

---

## 3. Agent Rules

1. **Never invent physics constants** — use only values from CONTEXT.md
2. **No hallucinated packages** — only packages listed in FRONTEND_DEV_PLAN tech stack
3. **Validate physics outputs** at each phase checkpoint before proceeding
4. **No backend code** unless Phase 2 (post-MVP) is explicitly requested
5. **All chart axes must be labeled** with units
6. **Scientific notation formatting** required for all carrier concentrations
7. **Do not use `any` type** if TypeScript is used
8. **Comment all physics formulas** in code with equation reference

---

## 4. Definition of Done

- [ ] All 5 charts render correctly with live data
- [ ] Physics validated against 3 known Si reference points
- [ ] All controls update charts in <200ms
- [ ] PNG and CSV export working
- [ ] No console errors in production build
- [ ] `npm run build` succeeds
- [ ] Responsive at 768px and 1200px breakpoints
