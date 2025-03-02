import { create } from "zustand/react";
import {useOrganizationStore} from "@/entities/organization";
import {Swim} from "@/entities/swim";
import {useSwimCreateStore} from "@/features/competition/create";
import {createCompetition} from "@/features/competition/create";

type CompetitionsCreateState = {
  name: string;
  location: string; date: string; maxParticipants: number;
  description: string;
  contacts: string[]; contactFromProfile: boolean;
  swims: Omit<Swim, "eventUuid">[];
  isLoading: boolean;
  hasError: boolean;
  isFormValid: boolean;
}

type CompetitionsCreateActions = {
  setName: (name: string) => void;
  setLocation: (location: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setMaxParticipants: (maxParticipants: number) => void;
  setContactFromProfile: (state: boolean) => void;
  setContact: (index: number, newContact: string) => void;
  checkFormValid: () => void;
  addSwim: () => void;
  deleteSwim: (swimToDelete: Swim | Omit<Swim, "eventUuid">) => void;
  createCompetition: (onSuccess: () => void) => void;
  clearForm: () => void;
}

const initialState: CompetitionsCreateState = {
  name: "",
  location: "", date: "", maxParticipants: 0,
  description: "",
  contacts: ["", "", ""], contactFromProfile: false,
  swims: [],
  isLoading: false,
  hasError: false,
  isFormValid: false,
}

export const useCompetitionsCreateStore = create<CompetitionsCreateState & CompetitionsCreateActions>((set, get) => ({
  ...initialState,

  checkFormValid: () => {
    set((state) => ({
      isFormValid:
        state.name.trim() != "" && state.location.trim() !== "" &&
        state.date.trim() !== "" && state.maxParticipants > 0 &&
        state.description.trim() !== "" && state.contacts.some(contact => contact.trim() !== "")  &&
        state.swims.length > 0 &&
        new Date(state.date).getTime() >= new Date(new Date().toISOString().split("T")[0]).getTime()
    }));
  },


  setName: (name: string) => { set({ name }); get().checkFormValid(); },
  setLocation: (location: string) => { set({ location }); get().checkFormValid(); },
  setDate: (date: string) => { set({ date }); get().checkFormValid(); },
  setDescription: (description: string) => { set({ description }); get().checkFormValid(); },
  setMaxParticipants: (maxParticipants: number) => { set({ maxParticipants }); get().checkFormValid(); },

  setContactFromProfile: (state) => {
    if (state) {
      set({
        contacts: [useOrganizationStore.getState().organization?.email || ""],
        contactFromProfile: true
      });
    } else {
      set({ contactFromProfile: false });
    }
    get().checkFormValid();
  },

  setContact: (index, newContact) => {
    if (index < 0 || index > 2) return;

    set((state) => {
      const updatedContacts = [...state.contacts];
      updatedContacts[index] = newContact;
      return { contacts: updatedContacts };
    });

    get().checkFormValid();
  },

  addSwim: () => {
    const swimData = useSwimCreateStore.getState().getSwim();
    swimData.startTime = `${get().date}T${swimData.startTime}Z`;

    set((state) => ({ swims: [...state.swims, swimData] }));
    get().checkFormValid();
  },

  deleteSwim: (swimToDelete) => {
    set((state) => ({ swims: state.swims.filter((swim) => swim.distance !== swimToDelete.distance) }));
    get().checkFormValid();
  },

  createCompetition: (onSuccess) => {
    const competition = get();

    createCompetition({
      competitionName: competition.name,
      competitionLocation: competition.location,
      competitionDate: competition.date,
      description: competition.description,
      contactLink: competition.contacts[0],
      maxParticipants: competition.maxParticipants,
      competitionType: "соревнование",
      events: competition.swims
    })
      .then(() => {
        onSuccess();
        get().clearForm();
      })
      .catch((e) => console.log(e.message));
  },

  clearForm: () => set(initialState),
}))
