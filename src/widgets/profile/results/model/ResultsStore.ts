import { create } from "zustand/react";
import {CompetitionResult} from "@/entities/competition";

type ResultsState = {
  results: CompetitionResult[];
}

type ResultsActions = {
  getResults: () => void;
}

export const useResultsStore = create<ResultsState & ResultsActions>((set) => ({
  results: [],

  getResults: () => {
    set({
      results: [{
        competitionUuid: "123",
        name: "Название соревнования",
        swimsResults: [{
          swim: {
            distance: 100, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "123", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 1,
          time: "00:21.32",
        }, {
          swim: {
            distance: 300, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "123", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 2,
          time: "00:32.22",
        }, {
          swim: {
            distance: 500, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "123", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 5,
          time: "00:52.12",
        }]
      }, {
        competitionUuid: "1231",
        name: "Название соревнования",
        swimsResults: [{
          swim: {
            distance: 100, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1231", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 1,
          time: "00:21.32",
        }, {
          swim: {
            distance: 300, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1231", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 4,
          time: "00:32.22",
        }, {
          swim: {
            distance: 500, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1231", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 1,
          time: "00:52.12",
        }]
      }, {
        competitionUuid: "1232",
        name: "Название соревнования",
        swimsResults: [{
          swim: {
            distance: 100, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1232", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 2,
          time: "00:21.32",
        }, {
          swim: {
            distance: 300, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1232", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 1,
          time: "00:32.22",
        }, {
          swim: {
            distance: 500, style: "sqwds", gender: "MALE", ageCategory: "18-21",
            competitionUUID: "1232", maxPoints: 500,
            startTime: "2025-02-08"
          },
          place: 3,
          time: "00:52.12",
        }]
      }]
    })
  }
}))
