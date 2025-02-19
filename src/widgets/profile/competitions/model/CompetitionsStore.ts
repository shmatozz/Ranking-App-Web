"use client"

import { create } from "zustand/react";
import {Competition} from "@/entities/competition";
import {getOrganizationInfo} from "@/entities/organization";
import {Role, splitCompetitions} from "@/shared/lib";

type CompetitionsState = {
  passed: Competition[] | undefined;
  upcoming: Competition[] | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type CompetitionsActions = {
  getCompetitions: (role: Role, update?: boolean) => void;
}

export const useCompetitionsStore = create<CompetitionsState & CompetitionsActions>((set) => ({
  passed: undefined,
  upcoming: undefined,
  isLoading: false,
  hasError: false,

  getCompetitions: (role) => {
    switch (role) {
      case "USER": {
        set({passed: [], upcoming: []});
        break;
      }
      case "ORGANIZATION": {
        getOrganizationInfo()
          .then((organization) => {
            set({...splitCompetitions(organization.competitions ? organization.competitions : [])})
          })
          .catch(() => set({ hasError: true }))
          .finally(() => set({ isLoading: false }))
        break;
      }
      case "ADMIN": set({passed: [], upcoming: []});
    }
  }
}))
