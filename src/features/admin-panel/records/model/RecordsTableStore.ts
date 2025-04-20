import { create } from "zustand";
import {
  createRecord,
  getRecords,
  RecordEntry,
  TimeInput,
  updateRecord
} from "@/features/admin-panel/records";

interface Filters {
  distance?: number;
  style?: { id: string; name: string };
  gender?: { id: string; name: string };
}

interface RecordsTableState {
  records: RecordEntry[];
  totalPages: number; totalResults: number;
  page: number;
  filters: Filters;
  isLoading: boolean;
  hasError: boolean;
  selectedRecord: RecordEntry | null;
}

interface RecordsTableActions {
  setPage: (page: number) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setSelectedRecord: (record: RecordEntry | null) => void;
  fetchRecords: () => void;
  updateRecord: (id: number, newTime: TimeInput) => void;
  createRecord: (distance: number, style: string, gender: "MALE" | "FEMALE", time: TimeInput) => void;
}

const initialState: RecordsTableState = {
  records: [],
  totalPages: 1, totalResults: 0,
  page: 0,
  filters: {
    distance: undefined,
    style: undefined,
    gender: undefined,
  },
  isLoading: false,
  hasError: false,
  selectedRecord: null,
}

export const useRecordsTableStore = create<RecordsTableState & RecordsTableActions>((set, get) => ({
  ...initialState,

  setPage: (page) => set({ page }),
  setFilters: (partialFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...partialFilters },
      page: 0,
    }))
  },
  setSelectedRecord: (record) => set({ selectedRecord: record }),

  fetchRecords: () => {
    const { page, filters } = get();
    set({ isLoading: true });

    getRecords({ page: { page: page, size: 15 }, filters: {
        distance: filters.distance,
        style: filters.style ? filters.style.name : undefined,
        gender: filters.gender ? filters.gender.id : undefined,
      }})
      .then((response) => {
        if (response && response.data) {
          set({ records: response.data.content, totalPages: response.data.totalPages, totalResults: response.data.totalElements })
        } else if (response && response.error) {
          set({ hasError: true })
        }
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }));
  },

  updateRecord: (id: number, newTime: TimeInput) => {
    set({ isLoading: true, hasError: false })

    updateRecord({ id: id, newTime: newTime })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true })
        } else {
          get().fetchRecords()
        }
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }));
  },

  createRecord: (distance: number, style: string, gender: "MALE" | "FEMALE", time: TimeInput) => {
    set({ isLoading: true, hasError: false });

    createRecord({ distance, style, gender, time })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true })
        } else {
          get().fetchRecords()
        }
      })
      .catch(() => set({ hasError: true }))
      .finally(() => set({ isLoading: false }));
  }
}));
