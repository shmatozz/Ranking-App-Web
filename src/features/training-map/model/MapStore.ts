'use client';

import { create } from "zustand/react";
import {Marker} from "@/features/training-map";

type MapState = {
  placemarks: Marker[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type MapActions = {
  addPlacemark: (placemark: Marker) => void;
}

const initialState: MapState = {
  placemarks: [],
  isLoading: false,
  hasError: false,
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  ...initialState,

  addPlacemark: (placemark: Marker) => set((state) => ({ placemarks: [...state.placemarks, placemark] })),
}))
