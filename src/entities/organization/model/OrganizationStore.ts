import { create } from "zustand/react";
import {Organization} from "@/entities/organization";
import {getOrganizationInfo, getOrganizationShortInfo} from "@/entities/organization/api/OrganizationService";

type OrganizationState = {
  organization: Organization | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type OrganizationActions = {
  getOrganizationInfo: (token: string) => void;
  getOrganizationShortInfo: (token: string) => void;
}

export const useOrganizationStore = create<OrganizationState & OrganizationActions>((set) => ({
  organization: undefined,
  isLoading: false,
  hasError: false,

  getOrganizationInfo: (token) => {
    set({ isLoading: true, hasError: false })

    getOrganizationInfo(token)
      .then((organization) => {
        console.log(organization)
        set({organization: organization})
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }))
  },

  getOrganizationShortInfo: (token) => {
    set({ isLoading: true, hasError: false })

    getOrganizationShortInfo(token)
      .then((organization) => {
        console.log(organization)
        set({organization: organization})
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }))
  }
}))