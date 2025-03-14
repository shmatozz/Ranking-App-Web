'use client';

import { create } from "zustand/react";
import {News, NewsCreate} from "@/features/news";

type NewsCreateState = {
  name: string; description: string;
  startDate: string; endDate: string;
  mainImage?: File;
  additionalImage1?: File;
  additionalImage2?: File;
  formVisible: boolean;
  isFormValid: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type NewsCreateActions = {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setMainImage: (mainImage: File) => void;
  setAdditionalImage1: (additionalImage1: File) => void;
  setAdditionalImage2: (additionalImage2: File) => void;
  setFormVisible: (visible: boolean) => void;
  checkFormValid: () => void;
  fillForm: (news: News) => void;
  getFilledNews: () => NewsCreate;
  clearForm: () => void;
}

const initialState: NewsCreateState = {
  name: "", description: "",
  startDate: "", endDate: "",
  formVisible: false,
  isFormValid: false,
  isLoading: false,
  hasError: false,
}

export const useNewsCreateStore = create<NewsCreateState & NewsCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.name.trim() != "" && state.description.trim() !== "" &&
        state.startDate.trim() != "" && state.endDate.trim() != "" &&
        new Date(state.startDate) <= new Date(state.endDate)
    }));
  },

  setDescription: (description) => { set({ description }); get().checkFormValid(); },
  setName: (name) => { set({name}); get().checkFormValid(); },
  setStartDate: (startDate) => { set({ startDate }); get().checkFormValid(); },
  setEndDate: (endDate) => { set({ endDate }); get().checkFormValid(); },
  setFormVisible: (visible: boolean) => set({ formVisible: visible }),
  setMainImage: (mainImage: File) => set({ mainImage }),
  setAdditionalImage1: (additionalImage1: File) => set({ additionalImage1 }),
  setAdditionalImage2: (additionalImage2: File) => set({ additionalImage2 }),

  fillForm: (news: News) => {
    set({
      name: news.topic, description: news.text,
      startDate: news.startDate, endDate: news.endDate,
      mainImage: undefined, additionalImage1: undefined, additionalImage2: undefined
    })
    get().checkFormValid();
  },

  getFilledNews: () => {
    const formState = get();

    return {
      topic: formState.name,
      text: formState.description,
      startDate: formState.startDate, endDate: formState.endDate,
      image1: formState.mainImage, image2: formState.additionalImage1, image3: formState.additionalImage2,
    }
  },

  clearForm: () => set(initialState),
}))
