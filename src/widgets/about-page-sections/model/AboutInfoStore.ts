"use client"

import { create } from "zustand/react";
import {getAboutUsInfo, getPartnersInfo, getSponsorsInfo, Partner, Sponsor} from "@/features/about-info";

type AboutInfoState = {
  aboutUsText: string | undefined;
  partners: Partner[] | undefined;
  sponsors: Sponsor[] | undefined;
  hasError: boolean;
  errorMessage?: string;
}

type AboutInfoActions = {
  getAboutUsText: () => void;
  getPartners: () => void;
  getSponsors: () => void;
}

const initialState: AboutInfoState = {
  aboutUsText: undefined,
  partners: undefined,
  sponsors: undefined,
  hasError: false,
}

export const useAboutInfoStore = create<AboutInfoState & AboutInfoActions>((set) => ({
  ...initialState,

  getAboutUsText: () => {
    getAboutUsInfo()
      .then((response) => {
        if (response.data) {
          set({ aboutUsText: response.data.description })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  getPartners: () => {
    getPartnersInfo()
      .then((response) => {
        if (response.data) {
          set({ partners: response.data.content })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  getSponsors: () => {
    getSponsorsInfo()
      .then((response) => {
        if (response.data) {
          set({ sponsors: response.data.content })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },
}))
