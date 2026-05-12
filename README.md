# SiliconQ — Quantum Statistical Simulator

**SiliconQ** is a premium, modern web-based semiconductor physics simulator designed for researchers, students, and engineers. It provides an interactive, real-time visualization dashboard to explore the quantum statistical mechanics of silicon under varying temperatures and doping profiles.

**Created by: Yagya Sipani **

---

## 🚀 Features

- **Real-Time Physics Engine:** Accurately computes semiconductor properties including intrinsic carrier concentration ($n_i$), Fermi level ($E_f$), bandgap ($E_g$), and carrier densities ($n$, $p$) based on rigorous solid-state physics equations.
- **Dynamic Data Visualization:**
  - **Fermi-Dirac Distribution:** Visualize the probability function $f(E)$ against energy levels.
  - **Carrier Density vs. Temperature:** Observe freeze-out, extrinsic, and intrinsic regimes on a logarithmic scale.
  - **Fermi Level Shift:** Track the movement of $E_f$ relative to the intrinsic level with changes in temperature and doping.
  - **Energy Band Diagram:** A dynamic, spatial representation of the conduction and valence bands.
- **Interactive Controls:** Logarithmic sliders for donor/acceptor concentrations, temperature adjustments, and quick-load presets for real-world chipsets (e.g., Apple A17 Pro, Intel Core i9, NVIDIA H100).
- **Data Export:** Easily export live charts as high-resolution PNG images or raw CSV datasets for external analysis.
- **Modern UI:** Built with a "Premium Dark Scientific" aesthetic, ensuring clarity, responsiveness, and a professional user experience.

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Custom CSS Design System
- **State Management:** Zustand
- **Data Visualization:** Recharts (SVG Charts) & D3.js (Custom Band Diagrams)
- **Utilities:** HTML2Canvas, PapaParse

## ⚙️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd siliconq
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Simulator

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or the port specified in your console).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized static assets will be generated in the `dist` directory, ready to be deployed to any static hosting provider.

## 🧮 Physics Models Implemented

- **Varshni's Equation:** Temperature dependence of the bandgap ($E_g(T)$).
- **Effective Density of States:** Temperature-scaled $N_c$ and $N_v$.
- **Mass Action Law:** $n \cdot p = n_i^2$ for thermal equilibrium.
- **Charge Neutrality Condition:** Precise calculation of the Fermi level ($E_f$) considering complete ionization.
- **Fermi-Dirac Statistics:** Probability distribution function for electrons in thermal equilibrium.

---

*SiliconQ is developed as a tool to bridge the gap between complex semiconductor theory and intuitive visual understanding.*
