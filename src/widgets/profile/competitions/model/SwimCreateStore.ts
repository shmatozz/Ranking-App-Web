import { create } from "zustand/react";
import {Swim} from "@/entities/swim";

type SwimCreateState = {
  distance: number;
  style: string;
  gender: "MALE" | "FEMALE";
  ageCategory: string;
  maxPoints: number;
  startTime: string;
  isFormValid: boolean;
};

type SwimCreateActions = {
  setDistance: (distance: number) => void;
  setStyle: (style: string) => void;
  setGender: (gender: "MALE" | "FEMALE") => void;
  setAgeCategory: (ageCategory: string) => void;
  setMaxPoints: (maxPoints: number) => void;
  setStartTime: (startTime: string) => void;
  checkFormValid: () => void;
  getSwim: () => Swim;
  clearForm: () => void;
};

const initialState: SwimCreateState = {
  distance: 0,
  style: "",
  gender: "MALE",
  ageCategory: "",
  maxPoints: 0,
  startTime: "",
  isFormValid: false,
}

export const useSwimCreateStore = create<SwimCreateState & SwimCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.distance > 0 && state.style.trim() !== "" &&
        state.ageCategory.trim() !== "" && state.maxPoints > 0 &&
        state.startTime.trim() !== ""
    }));
  },

  setDistance: (distance) => { set({ distance }); get().checkFormValid(); },
  setStyle: (style) =>  { set({ style }); get().checkFormValid(); },
  setGender: (gender) =>  { set({ gender }); get().checkFormValid(); },
  setAgeCategory: (ageCategory) =>  { set({ ageCategory }); get().checkFormValid(); },
  setMaxPoints: (maxPoints) =>  { set({ maxPoints }); get().checkFormValid(); },
  setStartTime: (startTime) =>  { set({ startTime }); get().checkFormValid(); },

  getSwim: () => {
    const swimData = get();

    return {
      distance: swimData.distance, style: swimData.style,
      gender: swimData.gender, ageCategory: swimData.ageCategory,
      maxPoints: swimData.maxPoints,
      startTime: swimData.startTime,
    }
  },

  clearForm: () => set(initialState),
}));
