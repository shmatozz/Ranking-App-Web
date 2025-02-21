import { create } from "zustand/react";
import {Organization, updateOrganizationOpenStatus} from "@/entities/organization";
import {getOrganizationInfo, getOrganizationShortInfo} from "@/entities/organization/api/OrganizationService";
import {useCompetitionsStore, useMembersStore} from "@/widgets/profile";
import {splitCompetitions} from "@/shared/lib";

type OrganizationState = {
  organization: Organization | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type OrganizationActions = {
  getOrganizationInfo: () => void;
  getOrganizationShortInfo: () => void;
  updateOrganizationOpenStatus: () => void;
}

export const useOrganizationStore = create<OrganizationState & OrganizationActions>((set, get) => ({
  organization: undefined,
  isLoading: false,
  hasError: false,

  getOrganizationInfo: () => {
    set({ isLoading: true, hasError: false })

    getOrganizationInfo()
      .then((org) => {
        set({ organization: org })
        useCompetitionsStore.setState({ ...splitCompetitions(org.competitions ? org.competitions : [])})
        useMembersStore.setState({ members: org.users })
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }))
  },

  getOrganizationShortInfo: () => {
    set({ isLoading: true, hasError: false })

    getOrganizationShortInfo()
      .then((organization) => {
        set({organization: organization})
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }))
  },

  updateOrganizationOpenStatus: () => {
    const isOpen = get().organization!.isOpen;

    updateOrganizationOpenStatus({ isOpen: !isOpen  })
      .then(() => set((state) => {
        return ({
          organization: ({ ...state.organization, isOpen: !isOpen }) as Organization
        })
      }))
      .catch((e) => console.log(e.message));
  }
}))
