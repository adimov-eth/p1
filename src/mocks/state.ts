import { createSeedData, type MockData } from './seed';

type Listener = () => void;

const listeners = new Set<Listener>();

export const mockState = {
  data: createSeedData() as MockData,

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify(): void {
    listeners.forEach((fn) => fn());
  },

  mutate<T>(fn: (data: MockData) => T): T {
    const result = fn(this.data);
    this.notify(); // ← Critical: triggers all subscribers
    return result;
  },

  reset(): void {
    this.data = createSeedData();
    this.notify();
  },
};
