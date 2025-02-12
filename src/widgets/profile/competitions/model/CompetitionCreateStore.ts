import { create } from "zustand/react";
import {useOrganizationStore} from "@/entities/organization";

type CompetitionsCreateState = {
  contact: string; contactFromProfile: boolean;
  isLoading: boolean;
  hasError: boolean;
}

type CompetitionsCreateActions = {
  setContactFromProfile: (state: boolean) => void;
  setContact: (newContact: string) => void;
}

export const useCompetitionsCreateStore = create<CompetitionsCreateState & CompetitionsCreateActions>((set) => ({
  contact: "", contactFromProfile: false,
  isLoading: false,
  hasError: false,

  setContactFromProfile: (state: boolean) => {
    if (state) {
      set({ contact: useOrganizationStore.getState().organization?.email, contactFromProfile: true });
    } else {
      set({ contactFromProfile: false });
    }
  },

  setContact: (newContact: string) => {
    set({ contact: newContact, contactFromProfile: newContact === useOrganizationStore.getState().organization?.email })
  }
}))
