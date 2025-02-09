import { create } from "zustand/react";
import {
  getUserInfo,
  updateUserPassword,
  User,
  updatePasswordParams,
  updateUserEmail
} from "@/entities/user";

type UserState = {
  user: User | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type UserActions = {
  getUserInfo: (token: string) => void;
  updatePassword: (params: updatePasswordParams, token: string) => void;
  updateEmail: (email: string, token: string) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  isLoading: false,
  hasError: false,

  getUserInfo: (token) => {
    set({ isLoading: true, hasError: false })

    getUserInfo(token)
      .then((user) => set({ user: user }))
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }))
  },

  updatePassword: (params: updatePasswordParams, token: string) => {
    updateUserPassword(params, token)
      .then((response) => console.log(response))
  },

  updateEmail: (email: string, token: string) => {
    updateUserEmail({email: email}, token)
      .then((response) => console.log(response))
  }
}))