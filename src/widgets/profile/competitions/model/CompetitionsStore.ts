import { create } from "zustand/react";
import {Competition} from "@/entities/competition";

type CompetitionsState = {
  passed: Competition[];
  upcoming: Competition[];
}

type CompetitionsActions = {
  getCompetitions: () => void;
}

export const useCompetitionsStore = create<CompetitionsState & CompetitionsActions>((set) => ({
  passed: [],
  upcoming: [],

  getCompetitions: () => {
    set({
      passed: [{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "123"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1231"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1232"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1233"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1234"
      }],
      upcoming: [{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "123123"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1231234"
      },{
        name: "Название соревнования",
        date: "15 февраля 2025",
        location: "НН",
        maxParticipants: 1, competitionType: "ds", competitionUuid: "1231245"
      }]
    })
  }
}))