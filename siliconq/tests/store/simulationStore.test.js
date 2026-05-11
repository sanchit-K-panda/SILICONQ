import { describe, it, expect, beforeEach } from 'vitest';
import { useSimulationStore } from '../../src/store/simulationStore.js';

describe('Simulation Store', () => {
  beforeEach(() => {
    useSimulationStore.setState({
      temperature: 300,
      dopingType: 'n-type',
      donorConc: 1e16,
      acceptorConc: 0,
      results: null,
      fermiDiracData: [],
      carrierVsTempData: [],
      EfVsTempData: [],
      EfVsDopingData: [],
      warnings: [],
    });
    useSimulationStore.getState().recomputeSimulation();
  });

  it('initializes default state and generates arrays', () => {
    const state = useSimulationStore.getState();
    expect(state.results).not.toBeNull();
    expect(state.results.n).toBeGreaterThan(0);
    expect(state.fermiDiracData.length).toBeGreaterThan(0);
    expect(state.carrierVsTempData.length).toBeGreaterThan(0);
    expect(state.EfVsTempData.length).toBeGreaterThan(0);
    expect(state.EfVsDopingData.length).toBeGreaterThan(0);
  });

  it('updates state and triggers recomputation on setters', () => {
    const store = useSimulationStore.getState();
    store.setTemperature(400);
    
    const newState = useSimulationStore.getState();
    expect(newState.temperature).toBe(400);
    expect(newState.results.ni).toBeGreaterThan(1.5e10);
  });

  it('clamps invalid values safely', () => {
    const store = useSimulationStore.getState();
    store.setTemperature(10);
    expect(useSimulationStore.getState().temperature).toBe(100);
    
    store.setDonorConc(1e25);
    expect(useSimulationStore.getState().donorConc).toBe(1e20);
  });

  it('generates warnings for degenerate approximations', () => {
    useSimulationStore.getState().setDonorConc(1e19);
    expect(useSimulationStore.getState().results.warnings.length).toBeGreaterThan(0);
  });
});
