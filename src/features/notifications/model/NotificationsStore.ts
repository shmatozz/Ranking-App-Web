'use client';

import { create } from "zustand/react";
import {deleteNotificationById, getNotifications, Notification} from "@/features/notifications";

type NotificationsState = {
  notifications?: Notification[];
  isNotificationsOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

type NotificationsActions = {
  setNotificationsOpen: (value: boolean) => void;
  getNotifications: () => void,
  deleteNotification: (id: number, callback?: () => void) => void,
}

const initialState: NotificationsState = {
  isNotificationsOpen: false,
  isLoading: false,
  hasError: false,
}

export const useNotificationsStore = create<NotificationsState & NotificationsActions>((set, get) => ({
  ...initialState,

  setNotificationsOpen: (value: boolean) => {
    set({ isNotificationsOpen: value })
  },

  getNotifications: () => {
    set({ isLoading: true, hasError: false })

    getNotifications()
      .then((response) => {
        if (response && response.data) {
          set({ notifications: response.data })
        } else if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
      .finally(() => set({ isLoading: false }))
  },

  deleteNotification: (id: number, callback?: () => void) => {
    deleteNotificationById({ id: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getNotifications();
          if (callback) callback();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  }
}))
