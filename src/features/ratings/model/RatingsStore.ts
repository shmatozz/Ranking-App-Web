'use client';

import { create } from "zustand/react";
import {getRating, UserRating} from "@/features/ratings";

type FiltersState = {
  gender?: { id: "MALE" | "FEMALE" | "RESET", name: string },
  category?: { id: string, name: string },
  startFrom?: number
}

type FiltersActions = {
  setGender: (item: { id: "MALE" | "FEMALE" | "RESET", name: string }) => void,
  setCategory: (item: { id: string, name: string }) => void,
  setStartFrom: (item: number) => void,
}

type RatingsState = {
  rating: UserRating[];
  filters: FiltersState,
  page: number, pageSize: number, totalPages: number, totalResults: number,
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type RatingsActions = {
  getRatings: () => void,
  filtersActions: FiltersActions,
  setPage: (page: number) => void,
  clearFilters: () => void,
}

const initialState: RatingsState = {
  rating: [],
  filters: {},
  page: 0, pageSize: 20, totalPages: 0, totalResults: 0,
  isLoading: false,
  hasError: false,
}

export const useRatingsStore = create<RatingsState & RatingsActions>((set, get) => ({
  ...initialState,

  getRatings: () => {
    set({ isLoading: true, hasError: false })

    const filters = get().filters;

    getRating({
      gender: filters.gender && filters.gender.id != "RESET" ? filters.gender.id : undefined,
      categoryEnum: filters.category && filters.category.id != "RESET" ? filters.category.id : undefined,
      startsCountFrom: filters.startFrom ? filters.startFrom : undefined,
      page: get().page,
      size: get().pageSize,
    })
      .then((response) => {
        if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else if (response.data) {
          set({ rating: response.data.content, totalPages: response.data.totalPages, totalResults: response.data.totalElements })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isLoading: false }))
  },

  filtersActions: {
    setCategory: (category: { id: string, name: string }) => {
      if (category.id == "RESET") {
        set((state) => ({ filters: {...state.filters, category: undefined} }))
      } else {
        set((state) => ({ filters: {...state.filters, category} }))
      }
    },
    setGender: (gender: { id: "MALE" | "FEMALE" | "RESET", name: string }) => {
      if (gender.id == "RESET") {
        set((state) => ({ filters: {...state.filters, gender: undefined} }))
      } else {
        set((state) => ({ filters: {...state.filters, gender} }))
      }
    },
    setStartFrom: (startFrom) => set((state) => ({ filters: {...state.filters, startFrom} })),
  },

  setPage: (page: number) => set({ page }),

  clearFilters: () => {
    set({ filters: {} })
  }
}))
