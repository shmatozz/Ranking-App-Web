'use client';

import { create } from "zustand/react";
import {sendCodeRequest, updateEmail} from "@/shared/api/common";
import {updateSession} from "@/shared/lib";

type ChangeContactsState = {
  newContact: string | undefined;
  code: string;
  rightCode: string | undefined,
  isCodeSent: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type ChangeContactsActions = {
  changeEmailRequested: (email: string) => void;
  changeEmail: (role: "user" | "organization") => void;
  setCode: (code: string) => void;
}

const initialState: ChangeContactsState = {
  newContact: undefined,
  code: "",
  rightCode: undefined,
  isCodeSent: false,
  isLoading: false,
  hasError: false,
}

export const useChangeContactsStore = create<ChangeContactsState & ChangeContactsActions>((set, get) => ({
  ...initialState,

  setCode: (code) => {
    set({ code, hasError: code.length == 6 && code !== get().rightCode, errorMessage: "Неверный код" });
  },

  changeEmailRequested: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      set({ isLoading: true, hasError: false })
      set({ newContact: email })

      sendCodeRequest(email)
        .then((response) => {
          set({ isCodeSent: true, rightCode: response })
        })
        .catch((e) => set({ hasError: true, errorMessage: e.message }))
        .finally(() => set({ isLoading: false }))
    }
  },

  changeEmail: (role: "user" | "organization") => {
    set({ isLoading: true })

    updateEmail({ email: get().newContact! }, role)
      .then((response) => {
        if (response.error) {
          set({hasError: true, errorMessage: response.error})
        } else if (response.data) {
          updateSession(get().newContact!, response.data)
            .then(() => window.location.reload())
            .catch((e) => set({ hasError: true, errorMessage: e.message }))
        }
      })
      .catch((e) => {
        set({hasError: true, errorMessage: e.message})
      })
      .finally(() => set({ isLoading: false, rightCode: undefined, code: "" }))
  }
}))
