import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TemperatureSlider } from '../../src/components/controls/TemperatureSlider.jsx';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('TemperatureSlider', () => {
  beforeEach(() => {
    useSimulationStore.setState({ temperature: 300 });
  });

  it('renders and displays temperature', () => {
    render(<TemperatureSlider />);
    expect(screen.getByText(/300 K/i)).toBeInTheDocument();
  });

  it('updates store on change', () => {
    render(<TemperatureSlider />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '400' } });
    expect(useSimulationStore.getState().temperature).toBe(400);
  });
});
