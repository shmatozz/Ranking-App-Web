'use client';

import { create } from "zustand/react";
import {getSwimInfo} from "@/features/competition/get";
import {Participant} from "@/entities/user";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

type ParticipantsState = {
  users: Participant[] | undefined;
  selectedSwim?: DropdownItem;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type ParticipantsActions = {
  getParticipants: (swimId: string) => void;
  setSelectedSwim: (id: DropdownItem) => void;
}

const initialState: ParticipantsState = {
  users: undefined,
  selectedSwim: undefined,
  isLoading: false,
  hasError: false,
}

export const useParticipantsStore = create<ParticipantsState & ParticipantsActions>((set) => ({
  ...initialState,

  getParticipants: (id: string) => {
    set({ isLoading: true, hasError: false })

    getSwimInfo({ uuid: id })
      .then((response) => {
        if (response && response.data) {
          set({ users: response.data.users })
        } else if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => {
        set({ hasError: true, errorMessage: e.message })
      })
      .finally(() => set({ isLoading: false }));
  },

  setSelectedSwim: (item) => {
    set({ selectedSwim: item })
  }
}))
