'use client';

import { create } from "zustand/react";

type FiltersState = {
  ageCategory?: { id: string, name: string },
  competitionsType?: { id: string, name: string },
}

type FiltersActions = {
  setAgeCategory: (item: { id: string, name: string }) => void,
  setCompetitionsType: (item: { id: string, name: string }) => void,
}

type RatingsState = {
  filters: FiltersState,
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type RatingsActions = {
  getRatings: () => void,
  filtersActions: FiltersActions,
  clearFilters: () => void,
}

const initialState: RatingsState = {
  filters: {},
  isLoading: false,
  hasError: false,
}

export const useRatingsStore = create<RatingsState & RatingsActions>((set, get) => ({
  ...initialState,

  getRatings: () => {

  },

  filtersActions: {
    setAgeCategory: (ageCategory) => set((state) => ({ filters: {...state.filters, ageCategory } })),
    setCompetitionsType: (competitionsType) => set((state) => ({ filters: {...state.filters, competitionsType} })),
  },

  clearFilters: () => {
    set({ filters: {} })
  }
}))
