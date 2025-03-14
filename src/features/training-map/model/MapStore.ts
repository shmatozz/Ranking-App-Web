'use client';

import { create } from "zustand/react";
import {deletePoint, getPoints, Marker, PointData, savePoint, updatePoint} from "@/features/training-map";

type MapState = {
  placemarks: PointData[];
  selectedPointID?: number;
  editMode: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type MapActions = {
  setSelectedPointID: (selectedPointID: number | undefined) => void;
  setEditMode: (allowed: boolean) => void;
  addPlacemark: (placemark: Marker, callback?: () => void) => void;
  getPlacemarks: () => void;
  updatePlacemark: (id: number, placemark: Marker, callback?: () => void) => void;
  deletePlacemark: (id: number) => void;
}

const initialState: MapState = {
  placemarks: [],
  editMode: false,
  isLoading: false,
  hasError: false,
}

export const useMapStore = create<MapState & MapActions>((set, get) => ({
  ...initialState,

  setSelectedPointID: (selectedPointID: number | undefined) => set({ selectedPointID }),
  setEditMode: (allowed: boolean) => set({ editMode: allowed }),

  addPlacemark: (placemark: Marker, callback) => {
    set({ isLoading: true, hasError: false });

    savePoint({ ...placemark })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getPlacemarks();
          if (callback) callback();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  },

  getPlacemarks: () => {
    set({ isLoading: true, hasError: false });

    getPoints()
      .then((response) => {
        if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else if (response.data) {
          set({ placemarks: response.data })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  },

  updatePlacemark: (id, placemark, callback) => {
    set({ isLoading: true, hasError: false })

    updatePoint({ id: id, point: {...placemark} })
      .then(() => {
        get().getPlacemarks();
        if (callback) callback();
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isLoading: false }))
  },

  deletePlacemark: (id: number) => {
    set({ isLoading: true, hasError: false });

    deletePoint({ id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getPlacemarks();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  }
}))
