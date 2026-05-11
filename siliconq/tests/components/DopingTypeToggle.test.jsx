import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { DopingTypeToggle } from '../../src/components/controls/DopingTypeToggle.jsx';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('DopingTypeToggle', () => {
  beforeEach(() => {
    useSimulationStore.setState({ dopingType: 'n-type' });
  });

  it('renders modes and highlights active', () => {
    render(<DopingTypeToggle />);
    const nTypeBtn = screen.getByText('N-Type');
    expect(nTypeBtn.getAttribute('aria-pressed')).toBe('true');
  });

  it('switches modes on click', () => {
    render(<DopingTypeToggle />);
    const pTypeBtn = screen.getByText('P-Type');
    fireEvent.click(pTypeBtn);
    expect(useSimulationStore.getState().dopingType).toBe('p-type');
  });
});
