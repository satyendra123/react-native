import { useSyncExternalStore } from "react";

export type PropertyType = "apartment" | "house" | "villa" | "studio" | null;

type FilterState = {
  type: PropertyType;
  bedrooms: number | null;
  minPrice: number | null;
  maxPrice: number | null;
};

const initialState: FilterState = {
  type: null,
  bedrooms: null,
  minPrice: null,
  maxPrice: null,
};

let state: FilterState = initialState;
const listeners = new Set<() => void>();

function setState(next: Partial<FilterState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useFilterStore() {
  const snapshot = useSyncExternalStore(subscribe, () => state, () => state);

  return {
    ...snapshot,
    setType: (type: PropertyType) => setState({ type }),
    setBedrooms: (bedrooms: number | null) => setState({ bedrooms }),
    setMinPrice: (minPrice: number | null) => setState({ minPrice }),
    setMaxPrice: (maxPrice: number | null) => setState({ maxPrice }),
    resetFilters: () => setState(initialState),
  };
}
