'use client';

import { create } from "zustand/react";
import {createTrainer} from "@/features/training-map";

type TrainerCreateState = {
  formVisible: boolean;
  isFormValid: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type TrainerCreateActions = {
  createTrainer: (trainerData: FormData, coordinatesID: number) => void,
  setFormVisible: (visible: boolean) => void;
  clearForm: () => void;
}

const initialState: TrainerCreateState = {
  formVisible: false,
  isFormValid: false,
  isLoading: false,
  hasError: false,
}

export const useTrainerCreateStore = create<TrainerCreateState & TrainerCreateActions>((set) => ({
  ...initialState,

  createTrainer: (data, coordinatesID) => {
    createTrainer({ coordinateId: coordinatesID, data: data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error });
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  setFormVisible: (visible: boolean) => set({ formVisible: visible }),

  clearForm: () => set(initialState),
}))
