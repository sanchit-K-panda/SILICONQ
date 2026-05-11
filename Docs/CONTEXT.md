# Project Context
## SiliconQ — Quantum Statistical Simulator

---

## 1. Academic & Technical Background

### Why This Problem Matters

Silicon is the dominant semiconductor material in modern integrated circuits. Every MOSFET, BJT, and diode in a chip depends on precise carrier concentration and Fermi level engineering. Understanding these at a quantum statistical level is not optional — it is the foundation.

**Key physical phenomenon:** At thermal equilibrium, electrons in a solid obey Fermi-Dirac statistics — not classical Maxwell-Boltzmann statistics. The distinction matters dramatically near and below room temperature, in heavily doped regions, and in nanoscale devices where quantum effects dominate.

### Fermi Level — Physical Meaning

The Fermi level (Ef) is the electrochemical potential of electrons. It represents the energy at which the probability of finding an electron is exactly 50% (per Fermi-Dirac). In a semiconductor:

- **Intrinsic Si:** Ef sits near midgap (~0.56 eV above Ev)
- **N-type doping:** Ef shifts toward conduction band (Ec)
- **P-type doping:** Ef shifts toward valence band (Ev)
- **Heavy doping:** Ef can enter the band (degenerate semiconductor)
- **Temperature:** As T → ∞, Ef → midgap regardless of doping (intrinsic behavior dominates)

### Carrier Concentration — Physical Meaning

- **Intrinsic carrier density (ni):** ~1.5×10¹⁰ cm⁻³ at 300K for Si. Doubles approximately every 11°C
- **Extrinsic region:** Carrier density ≈ doping concentration (freeze-in complete, intrinsic not yet dominant)
- **Freeze-out region:** Below ~100K, carriers freeze back onto dopant atoms
- **Intrinsic region:** Above ~500K for typical doping, thermally generated carriers overwhelm doping

---

## 2. Key Equations Reference

### Varshni Equation (Si bandgap vs Temperature)
```
Eg(T) = 1.170 − (4.73×10⁻⁴ · T²) / (T + 636)   eV
```

### Fermi-Dirac Distribution
```
f(E) = 1 / [1 + exp((E − Ef) / kT)]
```

### Effective Density of States
```
Nc(T) = 2.8×10¹⁹ × (T/300)^(3/2)   cm⁻³
Nv(T) = 1.04×10¹⁹ × (T/300)^(3/2)  cm⁻³
```
(Standard approximation valid for non-degenerate Si)

### Intrinsic Carrier Density
```
ni²  = Nc·Nv·exp(−Eg/kT)
ni   = √(Nc·Nv) · exp(−Eg/2kT)
```

### Charge Neutrality
```
n + Na⁻ = p + Nd⁺
→ n − p = Nd − Na   (fully ionized assumption, valid T > 150K)
→ np = ni²
```

### Fermi Level Position
```
n  = ni·exp((Ef − Ei)/kT)
p  = ni·exp((Ei − Ef)/kT)
Ei = midgap ≈ (Ec + Ev)/2 + (3kT/4)·ln(Nv/Nc)
```

---

## 3. Silicon Physical Constants Used

| Parameter | Symbol | Value | Unit |
|-----------|--------|-------|------|
| Bandgap (300K) | Eg | 1.12 | eV |
| Electron eff. mass | me* | 1.08 m₀ | kg |
| Hole eff. mass | mh* | 0.81 m₀ | kg |
| Intrinsic conc. (300K) | ni | 1.5×10¹⁰ | cm⁻³ |
| Relative permittivity | εr | 11.7 | — |
| Nc (300K) | Nc | 2.8×10¹⁹ | cm⁻³ |
| Nv (300K) | Nv | 1.04×10¹⁹ | cm⁻³ |

---

## 4. Simulation Regimes

| Regime | Temperature | Characteristic |
|--------|-------------|----------------|
| Freeze-out | < 150K | Carriers frozen on dopants; n << Nd |
| Extrinsic | 150K – 450K | n ≈ Nd (for N-type); Ef stable |
| Intrinsic | > 450K (typical doping) | ni dominates; Ef → Ei |
| Degenerate | Any T, Nd > 10¹⁸ cm⁻³ | Ef enters band; Boltzmann fails |

---

## 5. Chip Design Relevance

| Application | Physics connection |
|-------------|-------------------|
| MOSFET threshold voltage | Depends on Ef − Ei in channel |
| Leakage current | Exponential in ni(T); chip heating critical |
| Dopant activation | Ionization depends on T and Fermi level |
| PN junction built-in potential | Vbi = (kT/q)·ln(Nd·Na/ni²) |
| Degenerate source/drain | Ef in band → ohmic contact |

---

## 6. References

1. Sze, S.M. & Ng, K.K. — *Physics of Semiconductor Devices*, 3rd Ed., Wiley
2. Neamen, D.A. — *Semiconductor Physics and Devices*, 4th Ed., McGraw-Hill
3. Streetman, B.G. — *Solid State Electronic Devices*, 7th Ed., Pearson
4. NIST — Silicon material properties database
5. Varshni, Y.P. — "Temperature dependence of the energy gap in semiconductors", Physica, 1967
