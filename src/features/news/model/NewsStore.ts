'use client';

import { create } from "zustand/react";
import {News} from "@/features/news";
import {getNews} from "@/features/news/api/NewsService";

type NewsState = {
  news?: News[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type NewsActions = {
  getNews: () => void,
}

const initialState: NewsState = {
  isLoading: false,
  hasError: false,
}

export const useNewsStore = create<NewsState & NewsActions>((set, get) => ({
  ...initialState,

  getNews: () => {
    set({ isLoading: true, hasError: false })

    getNews()
      .then((response) => {
        if (response.error) {
          set({ hasError: true, errorMessage: response.error });
        } else if (response.data) {
          set({ news: response.data.content })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isLoading: false }))
  }
}))
