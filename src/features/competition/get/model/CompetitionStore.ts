'use client';

import { create } from "zustand/react";
import {CompetitionFull} from "@/entities/competition";
import {deleteCompetitionByID, deleteSwimByID, getCompetitionByID} from "@/features/competition/get";
import {generateResultsTemplate} from "@/features/competition/get/api/SwimsResultsService";
import {createSwimInCompetition} from "@/features/competition/create/api/CreateSwimService";
import {useSwimCreateStore} from "@/features/competition/create";

type CompetitionState = {
  competition?: CompetitionFull;
  isDeleting: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type CompetitionActions = {
  getCompetition: (id: string) => void;
  getSwimResultsTemplate: (id: string) => void;
  addSwim: (id: string) => void;
  deleteSwim: (id: string) => void;
  deleteCompetition: (id: string, callback?: () => void) => void;
}

const initialState: CompetitionState = {
  competition: undefined,
  isDeleting: false,
  isLoading: false,
  hasError: false,
}

export const useCompetitionStore = create<CompetitionState & CompetitionActions>((set, get) => ({
  ...initialState,

  getCompetition: (id: string) => {
    set({ isLoading: true, hasError: false })

    getCompetitionByID({ uuid: id })
      .then((competition) => {
        set({ competition })
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isLoading: false }));
  },

  getSwimResultsTemplate: (id: string) => {
    generateResultsTemplate({ uuid: id })
      .then((response) => {
        if (response) {
          console.log(response)

          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download",  "template.xlsx");

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      })
  },

  addSwim: (id: string) => {
    set({ isLoading: true, hasError: false })

    const swim = useSwimCreateStore.getState().getSwim();
    swim.startTime = `${get().competition!.date}T${swim.startTime}Z`;

    createSwimInCompetition({ ...swim, competitionUUID: id })
      .then((response) => {
        if (response && response.error) {
          console.log(response.error);
        } else {
          get().getCompetition(id)
        }
      })
      .catch(() => set({ hasError: true, errorMessage: "Что-то пошло не так", isLoading: false }))
  },

  deleteSwim: (id: string) => {
    set({ isDeleting: true, hasError: false })

    deleteSwimByID({ uuid: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          set((state) => ({ competition: {...state.competition, events: state.competition!.events.filter(swim => swim.eventUuid != id)} as CompetitionFull }))
        }
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isDeleting: false }));
  },

  deleteCompetition: (id: string, callback) => {
    set({ isDeleting: true, hasError: false })

    deleteCompetitionByID({ uuid: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          if (callback) callback();
        }
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isDeleting: false }));
  }
}))
