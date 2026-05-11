# Agent Rules
## Project: Silicon Quantum Statistical Simulation App

---

## Absolute Rules

1. **No hallucinated physics** — Every equation, constant, and formula must be physically correct. Reference: Sze "Physics of Semiconductor Devices", NIST.
2. **No placeholder code** — Never write `// TODO` or stub functions. Implement fully or skip.
3. **No external physics APIs** — All computation happens client-side in JS.
4. **Single-page app** — No backend, no database, no auth.
5. **React + Vite only** — Do not switch frameworks mid-build.

---

## Physics Constants (Hard-coded, Do Not Change)

```js
const CONSTANTS = {
  k: 8.617e-5,       // Boltzmann constant (eV/K)
  Eg: 1.12,          // Silicon band gap (eV) at 300K
  Nc: 2.8e19,        // Effective DOS conduction band (cm⁻³)
  Nv: 1.04e19,       // Effective DOS valence band (cm⁻³)
  ni_300: 1.5e10,    // Intrinsic carrier concentration at 300K (cm⁻³)
};
```

---

## Code Rules

- All physics logic goes in `/src/physics/` — never inline in components
- All charts use Recharts — no mixed charting libraries
- Use Zustand for global simulation state
- Temperature range: **100K to 1000K only** — clamp inputs
- Doping range: **1e12 to 1e20 cm⁻³** — clamp inputs
- All values displayed in scientific notation where > 1e4

---

## UI Rules

- Dark theme only (semiconductor/chip aesthetic)
- Parameter panel on left, plots on right (desktop); stacked on mobile
- Real-time update on every input change (debounce 100ms)
- Show units on every axis label and input field
- Color scheme: use distinct colors for n (blue), p (red), ni (green), Ef (yellow)

---

## File Structure (Strict)

```
src/
  physics/
    fermiDirac.js      # Fermi-Dirac distribution function
    carrierConc.js     # n, p, ni calculations
    fermiLevel.js      # Ef vs T calculations
  components/
    ParameterPanel.jsx
    CarrierPlot.jsx
    FermiPlot.jsx
    BandDiagram.jsx
  store/
    simStore.js        # Zustand store
  App.jsx
  main.jsx
```

---

## What Agent Must NOT Do

- Do not add animations that block simulation updates
- Do not use `useState` for simulation values — use Zustand store
- Do not render more than 500 data points per plot (performance)
- Do not use `alert()` or `console.log` in production code
- Do not install packages not listed in tech stack without PM approval

---

## Definition of Done (per feature)

- [ ] Equation implemented correctly and matches known values at 300K
- [ ] Input validation with user-visible error messages
- [ ] Plot renders without crash across full T range
- [ ] Code is in correct file per structure above
