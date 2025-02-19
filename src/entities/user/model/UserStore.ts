'use client';

import { create } from "zustand/react";
import {fetchUserInfo, User} from "@/entities/user";
import {updatePasswordParams} from "@/shared/api/types";
import {updatePassword} from "@/shared/api/common";
import {useCompetitionsStore} from "@/widgets/profile";

type UserState = {
  user: User | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type UserActions = {
  getUserInfo: () => void;
  updatePassword: (params: updatePasswordParams) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  isLoading: false,
  hasError: false,

  getUserInfo: () => {
    set({ isLoading: true, hasError: false })

    fetchUserInfo()
      .then((user) => {
        set({user: user})
        useCompetitionsStore.setState({passed: [], upcoming: []})
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
