import { create } from "zustand/react";
import {UserResults, getUserResults} from "@/widgets/profile";

type ResultsState = {
  results?: UserResults;
  isLoading: boolean;
  error?: string
}

type ResultsActions = {
  getResults: () => void;
}

export const useResultsStore = create<ResultsState & ResultsActions>((set) => ({
  isLoading: false,

  getResults: () => {
    set({ isLoading: true, error: undefined })

    getUserResults()
      .then((response) => {
        if (response.data != undefined) {
          set({ results: response.data })
        } else if (response.error) {
          set({ error: response.error })
        }
      })
      .catch((e) => set({ error: e.message }))
      .finally(() => set({ isLoading: false }))
  }
}))
