import { create } from "zustand/react";
import {getUserInfo, User} from "@/entities/user";

type UserState = {
  user: User | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type UserActions = {
  getUserInfo: (token: string) => void;
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
  }
}))