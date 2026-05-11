import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ResultsPanel } from '../../src/components/results/ResultsPanel.jsx';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('ResultsPanel', () => {
  beforeEach(() => {
    useSimulationStore.setState({
      results: {
        n: 1e16,
        p: 2.25e4,
        ni: 1.5e10,
        Ef: 0.1,
        Eg: 1.12,
        Nc: 2.8e19,
        Nv: 1.04e19
      }
    });
  });

  it('renders results with proper formatting', () => {
    render(<ResultsPanel />);
    expect(screen.getByText(/Electron Conc/i)).toBeInTheDocument();
    expect(screen.getByText(/1\.00×10\^16/i)).toBeInTheDocument();
  });
});
