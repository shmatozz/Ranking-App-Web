"use client";

import {create} from "zustand/react";
import {createPayment, getPaymentInfo, Payment} from "@/features/participation-payment";

type PaymentState = {
  payment?: Payment;
  paymentURL?: string,
  isLoading: boolean,
  hasError: boolean,
  errorMessage?: string,
}

type PaymentActions = {
  createPayment: (paymentSum: number, redirectUrl: string, description: string) => void;
  getPayment: (id: string) => void;
}

const initialState: PaymentState = {
  isLoading: false, hasError: false,
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
  }
}))
