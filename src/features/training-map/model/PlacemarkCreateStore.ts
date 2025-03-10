'use client';

import { create } from "zustand/react";
import {LngLat} from "@yandex/ymaps3-types";
import {Marker} from "@/features/training-map";

type PlacemarkCreateState = {
  name: string; description: string;
  email: string;
  coordinates: LngLat;
  formVisible: boolean;
  isFormValid: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type PlacemarkCreateActions = {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setEmail: (email: string) => void;
  setCoordinates: (coordinates: LngLat) => void;
  setFormVisible: (visible: boolean) => void;
  checkFormValid: () => void;
  getMarker: () => Marker;
  clearForm: () => void;
}

const initialState: PlacemarkCreateState = {
  name: "", description: "",
  email: "",
  coordinates: [0, 0],
  formVisible: false,
  isFormValid: false,
  isLoading: false,
  hasError: false,
}

export const usePlacemarkCreateStore = create<PlacemarkCreateState & PlacemarkCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.name.trim() != "" && state.description.trim() !== "" &&
        state.email.trim() != ""
    }));
  },

  setEmail: (email) => { set({ email }); get().checkFormValid(); },
  setDescription: (description) => { set({ description }); get().checkFormValid(); },
  setName: (name) => { set({name}); get().checkFormValid(); },
  setCoordinates: (coordinates) => set({ coordinates }),
  setFormVisible: (visible: boolean) => set({ formVisible: visible }),

  getMarker: () => {
    const state = get()

    return {
      name: state.name,
      description: state.description,
      geometry: {
        type: "Point",
        coordinates: state.coordinates,
      },
      email: state.email
    }
  },

  clearForm: () => set(initialState),
}))
