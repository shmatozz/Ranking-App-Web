'use client';

import { create } from "zustand/react";
import {getSwimInfo, getSwimParticipantsInfo} from "@/features/competition/get";
import {Participant, ParticipantFull} from "@/entities/user";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

type FiltersState = {
  gender?: { id: "MALE" | "FEMALE" | "RESET", name: string },
  age?: number,
  category?: { id: string, name: string },
}

type FiltersActions = {
  setGender: (gender: { id: "MALE" | "FEMALE" | "RESET", name: string }) => void,
  setAge: (age: number) => void,
  setCategory: (category: { id: string, name: string }) => void,
}

type ParticipantsState = {
  users: Participant[] | undefined;
  usersFull?: ParticipantFull[];
  swimDistance: number;
  selectedSwim?: DropdownItem;
  filters: FiltersState;
  page: number, totalPages: number, totalResults: number,
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type ParticipantsActions = {
  getParticipants: (swimId: string) => void;
  getSwimFull: (swimId: string) => void;
  setSelectedSwim: (id: DropdownItem) => void;
  filtersActions: FiltersActions;
  setPage: (page: number) => void,
}

const initialState: ParticipantsState = {
  filters: {},
  users: undefined,
  selectedSwim: undefined, swimDistance: 0,
  page: 0, totalPages: 0, totalResults: 0,
  isLoading: false,
  hasError: false,
}

export const useParticipantsStore = create<ParticipantsState & ParticipantsActions>((set, get) => ({
  ...initialState,

  getParticipants: (id: string) => {
    set({ isLoading: true, hasError: false })

    const filters = get().filters;

    getSwimParticipantsInfo({
      eventUUID: id,
      gender: filters.gender && filters.gender.id != "RESET" ? filters.gender.id : undefined,
      age: filters.age,
      category: filters.category ? filters.category.id : undefined,
      page: get().page
    })
      .then((response) => {
        if (response && response.data) {
          set({ users: response.data.content, totalPages: response.data.totalPages, totalResults: response.data.totalElements })
        } else if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isLoading: false }));
  },

  getSwimFull: (swimId: string) => {
    getSwimInfo({ uuid: swimId })
      .then((response) => {
        if (response && response.data) {
          set({ usersFull: response.data.users, swimDistance: response.data.distance })
        }
      })
  },

  setSelectedSwim: (item) => {
    set({ selectedSwim: item })
  },

  filtersActions: {
    setAge: (age: number) => set((state) => ({ filters: {...state.filters, age} })),
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
  },

  setPage: (page: number) => set((state) => ({ filters: {...state.filters, page} })),
}))
