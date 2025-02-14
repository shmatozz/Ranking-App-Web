import { create } from "zustand/react";
import {Competition} from "@/entities/competition";
import {useOrganizationStore} from "@/entities/organization";
import {sortCompetitions} from "@/shared/lib";

type CompetitionsState = {
  passed: Competition[] | undefined;
  upcoming: Competition[] | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type CompetitionsActions = {
  getCompetitions: (update?: boolean) => void;
}

export const useCompetitionsStore = create<CompetitionsState & CompetitionsActions>((set) => ({
  passed: undefined,
  upcoming: undefined,
  isLoading: false,
  hasError: false,

  getCompetitions: (update) => {
    const org = useOrganizationStore.getState().organization;

    if (org && org.competitions && !update) {
      set(sortCompetitions(org.competitions));
    } else {
      set({ isLoading: true, hasError: false })

      useOrganizationStore.getState().getOrganizationInfo(() => {
        const org = useOrganizationStore.getState().organization;

        set({...sortCompetitions(org!.competitions ? org!.competitions : []), isLoading: false, hasError: false});
      })
    }
  }
}))
