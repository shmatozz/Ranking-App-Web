import { create } from "zustand/react";
import {Swim} from "@/entities/swim";

type SwimCreateState = {
  distance: number;
  style: string;
  gender: "MALE" | "FEMALE" | "MIXED";
  ageFrom: number;
  ageTo: number;
  maxPoints: number;
  cost: number;
  startTime: string;
  duration: string;
  isFormValid: boolean;
};

type SwimCreateActions = {
  setDistance: (distance: number) => void;
  setStyle: (style: string) => void;
  setGender: (gender: "MALE" | "FEMALE" | "MIXED") => void;
  setAgeFrom: (ageFrom: number) => void;
  setAgeTo: (ageTo: number) => void;
  setMaxPoints: (maxPoints: number) => void;
  setCost: (cost: number) => void;
  setStartTime: (startTime: string) => void;
  setDuration: (duration: string) => void;
  checkFormValid: () => void;
  getSwim: () => Omit<Swim, "eventUuid">;
  clearForm: () => void;
};

const initialState: SwimCreateState = {
  distance: 0,
  style: "",
  gender: "MIXED",
  ageFrom: 0, ageTo: 0,
  maxPoints: 0,
  cost: 0,
  startTime: "",
  duration: "",
  isFormValid: false,
}

export const useSwimCreateStore = create<SwimCreateState & SwimCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.distance > 0 && state.style.trim() !== "" &&
        state.ageFrom <= state.ageTo && state.ageTo > 0 && state.maxPoints > 0 &&
        state.startTime.trim() !== "" && state.duration.trim() != ""
    }));
  },

  setDistance: (distance) => { set({ distance }); get().checkFormValid(); },
  setStyle: (style) =>  { set({ style }); get().checkFormValid(); },
  setGender: (gender) =>  { set({ gender }); get().checkFormValid(); },
  setAgeFrom: (ageFrom) =>  { set({ ageFrom }); get().checkFormValid(); },
  setAgeTo: (ageTo) =>  { set({ ageTo }); get().checkFormValid(); },
  setMaxPoints: (maxPoints) =>  { set({ maxPoints }); get().checkFormValid(); },
  setCost: (cost) =>  { set({ cost }); get().checkFormValid(); },
  setStartTime: (startTime) =>  { set({ startTime }); get().checkFormValid(); },
  setDuration: (duration) =>  { set({ duration }); get().checkFormValid(); },

  getSwim: () => {
    const swimData = get();

    return {
      distance: swimData.distance, style: swimData.style,
      gender: swimData.gender,
      ageFrom: swimData.ageFrom, ageTo: swimData.ageTo,
      maxPoints: swimData.maxPoints,
      startTime: swimData.startTime,
    }
  },

  clearForm: () => set(initialState),
}));
