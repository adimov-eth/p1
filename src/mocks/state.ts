import { createSeedData, type MockData } from './seed';

type Listener = () => void;

const STORAGE_KEY = 'prime-mock-state';

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function loadPersistedState(): MockData | null {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockData) : null;
  } catch {
    return null;
  }
}

function persistState(data: MockData): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore persistence errors in demo environment
  }
}

const listeners = new Set<Listener>();

export const mockState = {
  data: (loadPersistedState() ?? (createSeedData() as MockData)) as MockData,

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify(): void {
    listeners.forEach((fn) => fn());
  },

  mutate<T>(fn: (data: MockData) => T): T {
    const result = fn(this.data);
    persistState(this.data);
    this.notify(); // ← Critical: triggers all subscribers
    return result;
  },

  reset(): void {
    this.data = createSeedData();
    persistState(this.data);
    this.notify();
  },
};
