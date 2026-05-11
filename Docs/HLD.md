# High-Level Design (HLD)
## SiliconQ — Quantum Statistical Simulator

---

## 1. System Overview

SiliconQ is a browser-based simulation tool. It has no server-side computation. The entire physics engine, UI, and data visualization pipeline runs client-side in JavaScript.

---

## 2. Component Architecture Diagram

```
┌────────────────────────────────────────────────────────────────┐
│  App Shell (React SPA)                                         │
│                                                                │
│  ┌─────────────────┐          ┌────────────────────────────┐  │
│  │  Control Panel  │          │     Visualization Area      │  │
│  │                 │          │                            │  │
│  │  [T Slider]     │──State──▶│  [Fermi-Dirac Plot]        │  │
│  │  [Doping Slider]│  Update  │  [Carrier Density Plot]    │  │
│  │  [Type Toggle]  │          │  [Ef vs T Plot]            │  │
│  │  [Preset Modes] │          │  [Ef vs Doping Plot]       │  │
│  └─────────────────┘          │  [Band Diagram]            │  │
│                                └────────────────────────────┘  │
│  ┌─────────────────┐          ┌────────────────────────────┐  │
│  │  Results Panel  │          │     Export Controls         │  │
│  │  n = X cm⁻³    │          │  [Export PNG] [Export CSV] │  │
│  │  p = X cm⁻³    │          └────────────────────────────┘  │
│  │  ni = X cm⁻³   │                                          │
│  │  Ef = X eV      │                                          │
│  └─────────────────┘                                          │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. Physics Engine Design

### 3.1 Silicon Constants

```
k  = 8.617 × 10⁻⁵ eV/K     (Boltzmann constant)
h  = 6.626 × 10⁻³⁴ J·s     (Planck constant)
m0 = 9.109 × 10⁻³¹ kg      (electron rest mass)
me* = 1.08 × m0             (Si electron effective mass)
mh* = 0.81 × m0             (Si hole effective mass)
ε  = 11.7 × ε0              (Si permittivity)
```

### 3.2 Varshni Equation — Eg(T)

```
Eg(T) = 1.17 - (4.73×10⁻⁴ × T²) / (T + 636)   [eV]
```

### 3.3 Effective Density of States

```
Nc(T) = 2 × (2π × me* × kT / h²)^(3/2)
Nv(T) = 2 × (2π × mh* × kT / h²)^(3/2)
```

### 3.4 Intrinsic Carrier Density

```
ni(T) = sqrt(Nc × Nv) × exp(-Eg / 2kT)
```

### 3.5 Charge Neutrality Solution

For N-type (Nd >> Na):
```
n = (Nd-Na)/2 + sqrt(((Nd-Na)/2)² + ni²)
p = ni² / n
```

For P-type (Na >> Nd):
```
p = (Na-Nd)/2 + sqrt(((Na-Nd)/2)² + ni²)
n = ni² / p
```

### 3.6 Fermi Level

```
Ef = Ei + kT × ln(n / ni)    [N-type shifts Ef above midgap]
Ef = Ei - kT × ln(p / ni)    [P-type shifts Ef below midgap]
Ei = (Ec + Ev)/2 + (3/4)kT × ln(mh*/me*)
```

### 3.7 Fermi-Dirac Distribution

```
f(E) = 1 / (1 + exp((E - Ef) / kT))
Energy range: Ev - 0.5 eV  to  Ec + 0.5 eV
```

---

## 4. Chart Specifications

| Chart | X-Axis | Y-Axis | Scale |
|-------|--------|--------|-------|
| Fermi-Dirac Distribution | Energy (eV) | f(E) [0–1] | Linear |
| Carrier Density vs T | Temperature (K) | n, p, ni (cm⁻³) | Log Y |
| Fermi Level vs T | Temperature (K) | Ef (eV) | Linear |
| Fermi Level vs Doping | Nd or Na (cm⁻³) | Ef – Ei (eV) | Log X |
| Band Diagram | Position (arbitrary) | Energy (eV) | Linear |

---

## 5. State Schema (Zustand Store)

```javascript
{
  // Inputs
  temperature: 300,           // K, range 100–700
  dopingType: 'n-type',       // 'intrinsic' | 'n-type' | 'p-type'
  donorConc: 1e16,            // cm⁻³
  acceptorConc: 0,            // cm⁻³

  // Computed outputs (derived from inputs)
  results: {
    ni: null,                 // cm⁻³
    n: null,                  // cm⁻³
    p: null,                  // cm⁻³
    Ef: null,                 // eV
    Eg: null,                 // eV
    Nc: null,                 // cm⁻³
    Nv: null,                 // cm⁻³
  },

  // Chart data arrays
  fermiDiracData: [],         // [{E, fE}]
  carrierVsTempData: [],      // [{T, n, p, ni}]
  EfVsTempData: [],           // [{T, Ef}]
  EfVsDopingData: [],         // [{N, Ef}]
}
```

---

## 6. UI Layout

```
┌─────────────────────────────────────────────┐
│  Header: SiliconQ | Subtitle               │
├─────────────┬───────────────────────────────┤
│             │                               │
│  Control    │   Chart Area (tabbed or grid) │
│  Panel      │                               │
│  (left 25%) │   [Tab: f(E)] [Tab: n,p vs T]│
│             │   [Tab: Ef vs T] [Tab: Band]  │
│             │                               │
├─────────────┴───────────────────────────────┤
│  Results Panel (bottom bar)                │
│  n=... p=... ni=... Ef=... Eg=...          │
└─────────────────────────────────────────────┘
```

---

## 7. Error Handling

| Scenario | Handling |
|----------|----------|
| T = 0 | Clamp to 1K; show warning |
| Nd + Na overflow float | Cap at 1e21; show warning |
| exp() overflow | Use log-space arithmetic |
| NaN in results | Show "–" in results panel; log to console |
