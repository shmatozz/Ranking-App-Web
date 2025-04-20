import { create } from "zustand/react";
import {useOrganizationStore} from "@/entities/organization";
import {Swim} from "@/entities/swim";
import {useSwimCreateStore} from "@/features/competition/create";
import {createCompetition} from "@/features/competition/create";
import {Participants} from "@/entities/competition";

type CompetitionsCreateState = {
  name: string;
  location: string; date: string;
  description: string;
  videoLink: string;
  contacts: string[]; contactFromProfile: boolean;
  participants: { id: Participants, name: string };
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
  setVideoLink: (videoLink: string) => void;
  setContactFromProfile: (state: boolean) => void;
  setContact: (index: number, newContact: string) => void;
  setParticipants: (item: { id: string, name: string }) => void;
  checkFormValid: () => void;
  addSwim: () => void;
  deleteSwim: (swimToDelete: Swim | Omit<Swim, "eventUuid">) => void;
  createCompetition: (onSuccess: () => void) => void;
  clearForm: () => void;
}

const initialState: CompetitionsCreateState = {
  name: "",
  location: "", date: "",
  description: "", videoLink: "",
  contacts: ["", "", ""], contactFromProfile: false,
  swims: [],
  participants: { id: "AMATEURS", name: "Любители" },
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
        state.date.trim() !== "" &&
        state.description.trim() !== "" && state.contacts.some(contact => contact.trim() !== "")  &&
        state.swims.length > 0 &&
        new Date(state.date).getTime() >= new Date(new Date().toISOString().split("T")[0]).getTime()
    }));
  },


  setName: (name: string) => { set({ name }); get().checkFormValid(); },
  setLocation: (location: string) => { set({ location }); get().checkFormValid(); },
  setDate: (date: string) => { set({ date }); get().checkFormValid(); },
  setDescription: (description: string) => { set({ description }); get().checkFormValid(); },
  setVideoLink: (videoLink: string) => { set({ videoLink }); get().checkFormValid(); },

  setContactFromProfile: (state) => {
    if (state) {
      set({
        contacts: [useOrganizationStore.getState().organization?.email || "", "", ""],
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

  setParticipants: (item: { id: string, name: string }) => set({ participants: { id: item.id as Participants, name: item.name } }),

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
      videoLink: competition.videoLink.length > 0 ? competition.videoLink : undefined,
      contactLink: competition.contacts[0],
      contactLink2: competition.contacts[1].length > 0 ? competition.contacts[1] : undefined,
      contactLink3: competition.contacts[2].length > 0 ? competition.contacts[2] : undefined,
      participantsType: competition.participants.id,
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
