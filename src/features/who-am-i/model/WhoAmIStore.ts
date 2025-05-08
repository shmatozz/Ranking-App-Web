'use client';

import { create } from "zustand/react";
import {whoAmI, WhoAmI} from "@/features/who-am-i";

type WhoAmIState = {
  whoAmI: WhoAmI | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type WhoAmIActions = {
  getWhoAmI: () => void;
  resetWhoAmI: () => void;
}

export const useWhoAmIStore = create<WhoAmIState & WhoAmIActions>((set) => ({
  whoAmI: undefined,
  isLoading: false,
  hasError: false,

  getWhoAmI: () => {
    set({ isLoading: true, hasError: false })

    whoAmI()
      .then((response) => {
        set({ whoAmI: response})
      })
      .catch((e) => {console.log(e.message)})
      .finally(() => set({ isLoading: false }))
  },

  resetWhoAmI: () => set({ whoAmI: undefined, isLoading: false, hasError: false }),
}))
