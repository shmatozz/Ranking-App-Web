'use client';

import { create } from "zustand/react";
import {
  fetchUserInfo,
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
  updatePassword: (params: updatePasswordParams) => void;
  updateEmail: (email: string, token: string) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  isLoading: false,
  hasError: false,

  getUserInfo: (token) => {
    console.log("123");
    set({ isLoading: true, hasError: false })

    fetchUserInfo(token)
      .then((user) => set({user: user}))
      .catch((e) => {
        console.log(e);
        set({hasError: true})
      })
      .finally(() => set({ isLoading: false }))
  },

  updatePassword: (params: updatePasswordParams) => {
    updateUserPassword(params)
      .then((response) => console.log(response))
  },

  updateEmail: (email: string, token: string) => {
    updateUserEmail({email: email}, token)
      .then((response) => console.log(response))
  }
}))
