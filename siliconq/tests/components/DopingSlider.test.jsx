import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { DopingSlider } from '../../src/components/controls/DopingSlider.jsx';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('DopingSlider', () => {
  beforeEach(() => {
    useSimulationStore.setState({ donorConc: 1e16, acceptorConc: 0 });
  });

  it('renders and displays concentration in scientific format', () => {
    render(<DopingSlider type="donor" />);
    expect(screen.getByText(/1.*e16 cm⁻³/i)).toBeInTheDocument();
  });

  it('updates store with linear exponent conversion', () => {
    render(<DopingSlider type="donor" />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '18' } });
    expect(useSimulationStore.getState().donorConc).toBe(1e18);
  });
});
