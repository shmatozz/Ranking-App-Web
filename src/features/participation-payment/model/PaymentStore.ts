"use client";

import {create} from "zustand/react";
import {createPayment, createWidgetPayment, getPaymentInfo, Payment} from "@/features/participation-payment";

type PaymentState = {
  payment?: Payment;
  paymentURL?: string,
  token?: string,
  isLoading: boolean,
  hasError: boolean,
  errorMessage?: string,
}

type PaymentActions = {
  createPayment: (paymentSum: number, redirectUrl: string, description: string) => void;
  createWidgetPayment: (paymentSum: number, description: string) => void;
  getPayment: (id: string) => void;
  clearPayment: () => void;
}

const initialState: PaymentState = {
  payment: undefined, paymentURL: undefined, token: undefined,
  isLoading: false, hasError: false, errorMessage: undefined,
}

export const usePaymentStore = create<PaymentState & PaymentActions>((set) => ({
  ...initialState,

  createPayment: (paymentSum, redirectUrl, description) => {
    set({ isLoading: true, hasError: false })

    createPayment({ paymentSum, redirectUrl, description })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else if (response && response.data) {
          set({ payment: response.data, paymentURL: response.data.redirectUrl })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  },

  createWidgetPayment: (paymentSum, description) => {
    set({ isLoading: true, hasError: false })

    createWidgetPayment({ paymentSum, description })
      .then((response) => {
        console.log(response);
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else if (response && response.data) {
          set({ payment: response.data, token: response.data.token })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  },

  getPayment: (id) => {
    set({ isLoading: true, hasError: false })

    getPaymentInfo({ paymentId: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else if (response && response.data) {
          set({ payment: response.data })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message}))
      .finally(() => set({ isLoading: false }))
  },

  clearPayment: () => set(initialState),
}))
