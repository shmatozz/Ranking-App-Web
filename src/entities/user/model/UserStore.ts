'use client';

import { create } from "zustand/react";
import {getUserInfo, getUserShortInfo, User} from "@/entities/user";
import {updatePasswordParams} from "@/shared/api/types";
import {updatePassword} from "@/shared/api/common";
import {useCompetitionsStore} from "@/widgets/profile";
import {splitCompetitions} from "@/shared/lib";

type UserState = {
  user: User | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type UserActions = {
  getUserShortInfo: () => void;
  getUserInfo: () => void;
  updatePassword: (params: updatePasswordParams) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  isLoading: false,
  hasError: false,

  getUserShortInfo: () => {
    set({ isLoading: true, hasError: false })

    getUserShortInfo()
      .then((user) => {
        set({user: user})
      })
      .catch(() => {
        set({hasError: true})
      })
      .finally(() => set({ isLoading: false }))
  },

  getUserInfo: () => {
    set({ isLoading: true, hasError: false })

    getUserInfo()
      .then((response) => {
        if (response && response.data) {
          set({ user: response.data })
          useCompetitionsStore.setState({ ...splitCompetitions(response.data.userCompetitions ? response.data.userCompetitions : [])})
        } else if (response && response.error) {
          set({ hasError: true })
        }
      })
      .catch((e) => {
        console.log(e);
        set({hasError: true})
      })
      .finally(() => set({ isLoading: false }))
  },

  updatePassword: (params: updatePasswordParams) => {
    updatePassword(params)
      .then((response) => console.log(response))
  },
}))
