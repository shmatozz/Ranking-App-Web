'use client';

import { create } from "zustand/react";
import {CompetitionFull} from "@/entities/competition";
import {
  deleteCompetitionByID,
  deleteSwimByID,
  getCompetitionByID,
  joinSwim,
  SwimResultsForm
} from "@/features/competition/get";
import {
  generateResultsTemplate,
  uploadSwimResults,
  uploadSwimResultsByForm
} from "@/features/competition/get/api/SwimsResultsService";
import {createSwimInCompetition} from "@/features/competition/create/api/CreateSwimService";
import {useSwimCreateStore} from "@/features/competition/create";
import {Swim} from "@/entities/swim";
import {useUserStore} from "@/entities/user";
import {useParticipantsStore} from "@/widgets/competition";
import {getSwimShort} from "@/shared/lib";

type CompetitionState = {
  competition?: CompetitionFull;
  selectedSwim: Swim | undefined;
  isJoining: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type CompetitionActions = {
  getCompetition: (id: string) => void;
  joinSwim: (swimId: string) => void;
  getSwimResultsTemplate: (id: string) => void;
  uploadSwimResults: (swimId: string, file: File) => void;
  uploadSwimResultsByForm: (swimId: string, data: SwimResultsForm[]) => void;
  addSwim: (id: string) => void;
  deleteSwim: (id: string) => void;
  deleteCompetition: (id: string, callback?: () => void) => void;
  setSelectedSwim: (swimId: string) => void;
}

const initialState: CompetitionState = {
  competition: undefined,
  selectedSwim: undefined,
  isJoining: false,
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
        if (competition) {
          console.log(competition);
          set({ competition });
          useParticipantsStore.setState({ selectedSwim: { id: competition.events[0].eventUuid, name: getSwimShort(competition.events[0])} });
        }
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isLoading: false }));
  },

  joinSwim: (swimId) => {
    set({ isJoining: true })

    joinSwim({ uuid: swimId })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error.message, selectedSwim: undefined })
        } else {
          useUserStore.getState().getUserInfo();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isJoining: false }))
  },

  getSwimResultsTemplate: (id: string) => {
    generateResultsTemplate({ uuid: id })
      .then((response) => {
        if (response) {
          console.log(response)

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(response.blob);
          link.setAttribute("download",  response.filename);

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        }
      })
  },

  uploadSwimResults: (swimId: string, file: File) => {
    uploadSwimResults({ uuid: swimId, file: file})
      .then(() => console.log(123))
  },

  uploadSwimResultsByForm: (swimId, data) => {
    uploadSwimResultsByForm({ uuid: swimId, data: data })
      .then((response) => {
        if (response && response.error) {
          console.log(response.error);
        }
      })
  },

  setSelectedSwim: (swimId: string) => {
    const comp = get().competition;
    if (comp && comp.events.some((val) => val.eventUuid == swimId)) {
      set({ selectedSwim: comp.events.find((val) => val.eventUuid == swimId) });
    }
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
