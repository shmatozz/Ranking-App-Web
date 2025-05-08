"use client"

import { create } from "zustand/react";
import {
  addPartner, addSponsor, deletePartner, deleteSponsor,
  getAboutUsInfo,
  getPartnersInfo,
  getSponsorsInfo,
  Partner,
  Sponsor,
  updateAboutUs, updatePartner, updateSponsor
} from "@/features/about-info";

type AboutInfoState = {
  aboutUsText: string | undefined;
  partners: Partner[] | undefined;
  sponsors: Sponsor[] | undefined;
  hasError: boolean;
  errorMessage?: string;
}

type AboutInfoActions = {
  getAboutUsText: () => void;
  setAboutUsText: (text: string, callback?: () => void) => void;

  getPartners: () => void;
  addPartner: (data: FormData, callback?: () => void) => void;
  updatePartner: (id: number, data: FormData, callback?: () => void) => void;
  deletePartner: (id: number, callback?: () => void) => void;

  getSponsors: () => void;
  addSponsor: (data: FormData, callback?: () => void) => void;
  updateSponsor: (id: number, data: FormData, callback?: () => void) => void;
  deleteSponsor: (id: number, callback?: () => void) => void;
}

const initialState: AboutInfoState = {
  aboutUsText: undefined,
  partners: undefined,
  sponsors: undefined,
  hasError: false,
}

export const useAboutInfoStore = create<AboutInfoState & AboutInfoActions>((set, get) => ({
  ...initialState,

  getAboutUsText: () => {
    getAboutUsInfo()
      .then((response) => {
        if (response.data) {
          set({ aboutUsText: response.data.description })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  setAboutUsText: (text: string, callback) => {
    updateAboutUs({ text: text })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          if (callback) callback();
          set({ aboutUsText: text })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  getPartners: () => {
    getPartnersInfo()
      .then((response) => {
        if (response.data) {
          set({ partners: response.data.content })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  addPartner: (data: FormData, callback?) => {
    addPartner({ data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getPartners();
          if (callback) callback();
        }
      })
      .catch(e => set({ hasError: true, errorMessage: e.message }))
  },

  updatePartner: (id, data: FormData, callback?: () => void) => {
    updatePartner({ partnerID: id, data: data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getPartners()
          if (callback) callback();
        }
      })
      .catch(e => set({ hasError: true, errorMessage: e.message }))
  },

  deletePartner: (id: number, callback?: () => void) => {
    deletePartner({ partnerID: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          if (callback) callback();
          get().getPartners();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  getSponsors: () => {
    getSponsorsInfo()
      .then((response) => {
        if (response.data) {
          set({ sponsors: response.data.content })
        } else if (response.error) {
          set({ hasError: true, errorMessage: response.error })
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  },

  addSponsor: (data: FormData, callback?: () => void) => {
    addSponsor({ data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getSponsors();
          if (callback) callback();
        }
      })
      .catch(e => set({ hasError: true, errorMessage: e.message }))
  },

  updateSponsor: (id, data: FormData, callback?: () => void) => {
    updateSponsor({ sponsorID: id, data: data })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          get().getSponsors()
          if (callback) callback();
        }
      })
      .catch(e => set({ hasError: true, errorMessage: e.message }))
  },

  deleteSponsor: (id: number, callback?: () => void) => {
    deleteSponsor({ sponsorID: id })
      .then((response) => {
        if (response && response.error) {
          set({ hasError: true, errorMessage: response.error })
        } else {
          if (callback) callback();
          get().getSponsors();
        }
      })
      .catch((e) => set({ hasError: true, errorMessage: e.message }))
  }
}))
