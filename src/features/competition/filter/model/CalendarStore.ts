'use client';

import { create } from "zustand/react";
import { Competition } from "@/entities/competition";
import {getCompetitionsByFilter} from "@/features/competition/filter/api/FilterCompetitionsService";
import {sortCompetitions} from "@/shared/lib";
import {ArrangeFilter} from "@/features/competition/filter";

type FiltersState = {
  name?: string,
  date?: string,
  minParticipants?: number,
  maxParticipants?: number,
}

type FiltersActions = {
  setName: (name: string) => void,
  setDate: (date: string) => void,
  setMinParticipants: (minParticipants: number) => void,
  setMaxParticipants: (maxParticipants: number) => void,
}

type CalendarState = {
  competitions?: Competition[];
  arrange: ArrangeFilter;
  filters: FiltersState;
  isLoading: boolean;
  hasError: boolean;
};

type CalendarActions = {
  setArrange: (item: ArrangeFilter) => void;
  filtersActions: FiltersActions;
  clearFilters: () => void;
  getCompetitions: () => void;
};

const initialState: CalendarState = {
  competitions: undefined,
  arrange: { id: "date-closer", name: "Дата (ближе)"},
  filters: {},
  isLoading: false,
  hasError: false,
};

export const useCalendarStore = create<CalendarState & CalendarActions>((set,get) => ({
  ...initialState,

  setArrange: (item) => {
    set((state) => ({arrange: item, competitions: sortCompetitions(state.competitions!, item.id)}))
  },

  filtersActions: {
    setName: (name: string) => set((state) => ({ filters: {...state.filters, name} })),
    setDate: (date: string) => set((state) => ({ filters: {...state.filters, date} })),
    setMinParticipants: (minParticipants: number) => set((state) => {
      return { filters: {...state.filters, minParticipants} }
    }),
    setMaxParticipants: (maxParticipants: number) => set((state) => {
      return { filters: {...state.filters, maxParticipants} }
    }),
  },

  clearFilters: () => set({ filters: {} }),

  getCompetitions: () => {
    getCompetitionsByFilter(get().filters)
      .then((competitions: Competition[]) => {
        set({ competitions: sortCompetitions(competitions, get().arrange.id) })
      })
      .catch((e) => console.log(e.message))
  }
}));
