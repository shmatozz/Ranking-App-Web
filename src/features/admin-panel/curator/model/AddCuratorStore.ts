"use client"

import { create } from "zustand/react";
import {emailExist} from "@/shared/api/common";
import {addCurator} from "@/features/user-roles";

type AddCuratorState = {
  addCuratorError?: string;
}

type AddCuratorActions = {
  addCurator: (formData: FormData, callback?: () => void) => void;
}

const initialState: AddCuratorState = {

}

export const useAddCuratorStore = create<AddCuratorState & AddCuratorActions>((set) => ({
  ...initialState,

  addCurator: (formData, callback) => {
    set({ addCuratorError: undefined });

    const email = formData.get("email") as string;
    emailExist(email)
      .then((isExist) => {
        if (isExist) {
          addCurator({ email })
            .then((response) => {
              if (response && response.error) {
                set({ addCuratorError: response.error })
              } else {
                set({ addCuratorError: undefined })
                if (callback) callback()
              }
            })
            .catch((e) => set({ addCuratorError: e.message }))
        }
      })
  }
}))
