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
  page?: number;
}

type FiltersActions = {
  setName: (name: string) => void,
  setDate: (date: string) => void,
  setMinParticipants: (minParticipants: number) => void,
  setMaxParticipants: (maxParticipants: number) => void,
}

type CalendarState = {
  competitions?: Competition[];
  page?: number;
  totalPages?: number;
  totalResults?: number;
  arrange: ArrangeFilter;
  filters: FiltersState;
  showPastEvents?: boolean;
  isLoading: boolean;
  hasError: boolean;
};

type CalendarActions = {
  setArrange: (item: ArrangeFilter) => void;
  setPage: (page: number) => void,
  filtersActions: FiltersActions;
  clearFilters: () => void;
  getCompetitions: (withPast?: boolean) => void;
};

const initialState: CalendarState = {
  competitions: undefined,
  page: 0,
  totalPages: 0,
  totalResults: 0,
  arrange: { id: "date-closer", name: "Дата (ближе)"},
  filters: {},
  showPastEvents: false,
  isLoading: false,
  hasError: false,
};

export const useCalendarStore = create<CalendarState & CalendarActions>((set,get) => ({
  ...initialState,

  setArrange: (item) => {set({ arrange: item })},

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

  setPage: (page: number) => set({ page }),

  clearFilters: () => set({ filters: {} }),

  getCompetitions: (withPast?: boolean) => {
    set({ isLoading: true, hasError: false })

    getCompetitionsByFilter({
      ...get().filters,
      page: get().page,
      property: get().arrange.id.includes("date") ? "date" : "name",
      direction: get().arrange.id == "date-closer" || get().arrange.id == "name" ? "ASC" : "DESC",
      status: withPast ? undefined : "CREATED"
    })
      .then((data) => {
        set({ competitions: sortCompetitions(data.content, get().arrange.id), totalPages: data.totalPages, totalResults: data.totalElements })
      })
      .catch((e) => console.log(e.message))
      .finally(() => set({ isLoading: false }))
  }
}));
