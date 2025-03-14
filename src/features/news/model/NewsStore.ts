'use client';

import { create } from "zustand/react";
import {News, NewsCreate} from "@/features/news";
import {createNews, deleteNews, getNews, updateNews} from "@/features/news/api/NewsService";

type NewsState = {
  news?: News[];
  isCreating: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type NewsActions = {
  getNews: () => void,
  createNews: (news: NewsCreate, callback?: () => void) => void,
  updateNews: (id: number, news: NewsCreate) => void,
  deleteNews: (id: number, callback?: () => void) => void,
}

const initialState: NewsState = {
  isCreating: false,
  isDeleting: false,
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
  },

  createNews: (news, callback) => {
    set({ isCreating: true, hasError: false })

    createNews({
      topic: news.topic,
      text: news.text,
      startDate: news.startDate, endDate: news.endDate,
      image1: news.image1, image2: news.image2, image3: news.image3,
    })
      .then(() => {
        get().getNews();
        if (callback) callback();
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isCreating: false }))
  },

  updateNews: (id, news) => {
    set({ isLoading: true, hasError: false })

    updateNews({
      id: id,
      topic: news.topic, text: news.text,
      startDate: news.startDate, endDate: news.endDate,
      image1: news.image1, image2: news.image2, image3: news.image3,
    })
      .then(() => get().getNews())
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isLoading: false }))
  },

  deleteNews: (id: number, callback) => {
    set({ isDeleting: false, hasError: false })

    deleteNews({ id: id })
      .then(() => {
        get().getNews();
        if (callback) callback();
      })
      .catch((error) => set({ hasError: true, errorMessage: error.message }))
      .finally(() => set({ isDeleting: false }))
  }
}))
