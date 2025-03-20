'use client';

import { create } from "zustand/react";
import {createTrainer, updateTrainer} from "@/features/training-map";

type TrainerCreateState = {
  formVisible: boolean;
  isFormValid: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type TrainerCreateActions = {
  createTrainer: (trainerData: FormData, coordinatesID: number, callback?: () => void) => void,
  updateTrainer: (trainerData: FormData, trainerID: number, callback?: () => void) => void,
  setFormVisible: (visible: boolean) => void;
  clearForm: () => void;
}

const initialState: TrainerCreateState = {
  formVisible: false,
  isFormValid: false,
  isLoading: false,
  hasError: false,
}

export const useTrainerCreateStore = create<TrainerCreateState & TrainerCreateActions>((set, get) => ({
  ...initialState,

  createTrainer: (data, coordinatesID, callback) => {
    createTrainer({ coordinateId: coordinatesID, data: data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error });
        } else {
          if (callback) callback();
          get().clearForm()
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  updateTrainer: (trainerData, trainerID, callback) => {
    updateTrainer({ trainerID: trainerID, data: trainerData })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error });
        } else {
          if (callback) callback();
          get().clearForm()
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  setFormVisible: (visible: boolean) => set({ formVisible: visible }),

  clearForm: () => set(initialState),
}))
