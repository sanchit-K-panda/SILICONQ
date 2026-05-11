# PM & Dev Lead Plan
## Project: Quantum Statistical Analysis of Carrier Concentration and Fermi Level Variation in Silicon

---

## Project Overview
A simulation web application that visualizes carrier concentration and Fermi level variation in Silicon using quantum statistical models. Users can interactively tune parameters and observe real-time physics-based simulation outputs.

---

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Recharts / D3.js
- **Math/Physics Engine**: math.js, custom JS physics modules
- **State Management**: Zustand
- **Hosting**: Vercel / Netlify (static)

---

## Core Features (MVP)
1. **Parameter Input Panel** — Temperature (T), Doping concentration (Nd, Na), Band gap (Eg)
2. **Fermi Level Calculator** — Real-time computation using Fermi-Dirac distribution
3. **Carrier Concentration Plots** — n, p vs Temperature graphs
4. **Fermi Level vs Temperature Graph**
5. **Band Diagram Visualizer** — Conduction/valence band, Fermi level overlay
6. **Presets** — Intrinsic Si, n-type, p-type quick-load

---

## Milestones

| # | Milestone | Owner | Duration |
|---|-----------|-------|----------|
| 1 | Physics engine (Fermi-Dirac, carrier eqns) | Dev | 3 days |
| 2 | UI layout + parameter panel | Frontend | 2 days |
| 3 | Recharts integration + live plots | Frontend | 2 days |
| 4 | Band diagram SVG visualizer | Frontend | 2 days |
| 5 | Presets + export (PNG/CSV) | Dev | 1 day |
| 6 | QA + polish | All | 1 day |

**Total: ~11 days**

---

## Physics Equations to Implement

```
ni = sqrt(Nc * Nv) * exp(-Eg / 2kT)
n = Nc * exp(-(Ec - Ef) / kT)
p = Nv * exp(-(Ef - Ev) / kT)
np = ni^2
Ef (n-type) ≈ Ec - kT * ln(Nc / Nd)
Ef (p-type) ≈ Ev + kT * ln(Nv / Na)
```

Constants: Nc = 2.8e19 cm⁻³, Nv = 1.04e19 cm⁻³, Eg(Si) = 1.12 eV

---

## Deliverables
- [ ] Working simulation app (deployed URL)
- [ ] Source code (GitHub repo)
- [ ] README with physics background
- [ ] Optional: PDF report export

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Numerical instability at extreme T | Clamp T range: 100K–1000K |
| Incorrect physics constants | Cite NIST/Sze references |
| Slow rendering for large sweeps | Web Worker for heavy computation |

---

## Success Criteria
- Fermi level output matches known Si values at 300K (Ef ≈ 0.56 eV from midgap)
- Smooth real-time plot updates on parameter change
- Mobile-responsive UI
