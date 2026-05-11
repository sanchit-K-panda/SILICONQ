import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PresetSelector } from '../../src/components/controls/PresetSelector.jsx';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('PresetSelector', () => {
  it('updates state correctly on preset selection', () => {
    render(<PresetSelector />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } }); // P-type preset
    const state = useSimulationStore.getState();
    expect(state.dopingType).toBe('p-type');
    expect(state.acceptorConc).toBe(1e16);
  });
});
