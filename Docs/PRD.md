# Product Requirements Document (PRD)
## Quantum Statistical Analysis of Carrier Concentration and Fermi Level Variation in Silicon

---

## 1. Product Overview

**Product Name:** SiliconQ — Quantum Statistical Simulator  
**Type:** Web-based interactive simulation application  
**Target Users:** Semiconductor physics students, researchers, chip design engineers, educators  
**Goal:** Provide an accurate, interactive simulation to visualize and analyze carrier concentration and Fermi level variation in Silicon across temperature, doping, and bias conditions — grounded in quantum statistical mechanics (Fermi-Dirac statistics).

---

## 2. Problem Statement

Understanding carrier concentration and Fermi level behavior in Silicon is fundamental to modern chip design. Traditional textbook approaches are static. Engineers and students lack a fast, interactive tool that:
- Computes carrier concentrations using Fermi-Dirac statistics in real time
- Visualizes intrinsic/extrinsic behavior across temperature ranges
- Shows Fermi level shifts with doping concentration
- Bridges quantum theory and practical chip-design intuition

---

## 3. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Physics accuracy | Results match published Si data within ±1% |
| Interactivity | Parameter changes reflect in <200ms |
| Usability | First-time user can run a simulation in <2 min |
| Education value | Covers all key semiconductor physics concepts |

---

## 4. Core Features (MVP)

### F1 — Fermi-Dirac Distribution Visualizer
- Plot f(E) vs Energy at user-defined temperatures
- Overlay multiple temperatures on same chart
- Show Fermi level marker

### F2 — Carrier Concentration Calculator
- Compute n, p, ni for Silicon
- Inputs: Temperature (T), donor concentration (Nd), acceptor concentration (Na)
- Display: electron density, hole density, intrinsic carrier density

### F3 — Fermi Level vs Temperature
- Plot Ef vs T from 100K to 700K
- Show intrinsic, n-type, p-type regimes
- Mark freeze-out, extrinsic, intrinsic regions

### F4 — Fermi Level vs Doping Concentration
- Sweep Nd or Na from 1e12 to 1e20 cm⁻³
- Show Ef shift relative to midgap

### F5 — Band Diagram View
- Simplified conduction band (Ec), valence band (Ev), Fermi level (Ef) diagram
- Dynamic update with parameter changes

### F6 — Parameter Control Panel
- Temperature slider: 100K – 700K
- Doping type toggle: N-type / P-type / Intrinsic
- Doping concentration: log slider 1e12 – 1e20 cm⁻³
- Display units: SI or semiconductor-standard

### F7 — Export
- Export charts as PNG
- Export computed values as CSV

---

## 5. Physics Scope

| Quantity | Formula Used |
|----------|-------------|
| Fermi-Dirac distribution | f(E) = 1 / (1 + exp((E-Ef)/kT)) |
| Intrinsic carrier density | ni = sqrt(Nc·Nv)·exp(-Eg/2kT) |
| Effective DOS (Nc, Nv) | Nc = 2(2π·me*·kT/h²)^(3/2) |
| Charge neutrality | n - p = Nd - Na |
| Fermi level (extrinsic) | Ef = Ei ± kT·ln(N/ni) |

Silicon constants used:
- Eg = 1.12 eV (300K), temperature-corrected via Varshni equation
- me* = 1.08 m0, mh* = 0.81 m0

---

## 6. Non-Functional Requirements

- **Performance:** All computations client-side (JS/WASM); no backend needed for core physics
- **Responsiveness:** Works on desktop and tablet
- **Accuracy:** IEEE-standard floating point; validated against Sze & Ng "Physics of Semiconductor Devices"
- **Accessibility:** WCAG 2.1 AA minimum

---

## 7. Out of Scope (v1)

- Multi-material support (Ge, GaAs)
- 2D/3D device simulation
- Quantum confinement effects
- Non-equilibrium carrier transport

---

## 8. Milestones

| Milestone | Deliverable | ETA |
|-----------|-------------|-----|
| M1 | Architecture + Tech stack finalized | Week 1 |
| M2 | Core physics engine (JS) | Week 2 |
| M3 | All charts + UI | Week 3 |
| M4 | Testing + validation | Week 4 |
| M5 | Launch | Week 5 |
