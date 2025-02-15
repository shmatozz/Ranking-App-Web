'use client';

import { create } from "zustand/react";
import {CompetitionFull} from "@/entities/competition";
import {getCompetitionByID} from "@/features/competition/get";

type CompetitionState = {
  competition?: CompetitionFull;
  isLoading: boolean;
  hasError: boolean;
}

type CompetitionActions = {
  getCompetition: (id: string) => void;
}

const initialState: CompetitionState = {
  competition: undefined,
  isLoading: false,
  hasError: false,
}

export const useCompetitionStore = create<CompetitionState & CompetitionActions>((set) => ({
  ...initialState,

  getCompetition: (id: string) => {
    set({ isLoading: true, hasError: false })

    getCompetitionByID({ uuid: id })
      .then((competition) => {
        set({ competition })
      })
      .catch((e) => {
        console.log(e.message);
        set({ hasError: true })
      })
      .finally(() => set({ isLoading: false }));
  }
}))
