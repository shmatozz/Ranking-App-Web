import { create } from "zustand/react";
import {Swim} from "@/entities/swim";

type SwimCreateState = {
  distance: number;
  style: { id: string, name: string };
  gender: "MALE" | "FEMALE" | "MIXED";
  ageFrom: number;
  ageTo: number;
  maxPoints: number; maxParticipants: number;
  price: number;
  startTime: string;
  duration: string;
  isFormValid: boolean;
};

type SwimCreateActions = {
  setDistance: (distance: number) => void;
  setStyle: (style: { id: string, name: string }) => void;
  setGender: (gender: "MALE" | "FEMALE" | "MIXED") => void;
  setAgeFrom: (ageFrom: number) => void;
  setAgeTo: (ageTo: number) => void;
  setMaxPoints: (maxPoints: number) => void;
  setMaxParticipants: (maxParticipants: number) => void;
  setPrice: (price: number) => void;
  setStartTime: (startTime: string) => void;
  setDuration: (duration: string) => void;
  checkFormValid: () => void;
  getSwim: () => Omit<Swim, "eventUuid">;
  clearForm: () => void;
};

const initialState: SwimCreateState = {
  distance: 0,
  style: { id: "freestyle", name: "Вольный" },
  gender: "MIXED",
  ageFrom: 0, ageTo: 0,
  maxPoints: 0, maxParticipants: 0,
  price: 0,
  startTime: "",
  duration: "",
  isFormValid: false,
}

export const useSwimCreateStore = create<SwimCreateState & SwimCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.distance > 0 && state.style.name.trim() !== "" &&
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
  setPrice: (price) =>  { set({ price }); get().checkFormValid(); },
  setStartTime: (startTime) =>  { set({ startTime }); get().checkFormValid(); },
  setDuration: (duration) =>  { set({ duration }); get().checkFormValid(); },
  setMaxParticipants: (maxParticipants) =>  { set({ maxParticipants }); get().checkFormValid(); },

  getSwim: () => {
    const swimData = get();

    return {
      distance: swimData.distance, style: swimData.style.name,
      gender: swimData.gender,
      ageFrom: swimData.ageFrom, ageTo: swimData.ageTo, maxParticipants: swimData.maxParticipants,
      maxPoints: swimData.maxPoints, price: swimData.price,
      startTime: swimData.startTime,
    }
  },

  clearForm: () => set(initialState),
}));
