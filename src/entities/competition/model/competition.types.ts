import {SwimResult} from "@/entities/swim";

export type Competition = {
  name: string;
  location: string;
  date: string;
  maxParticipants: number;
  competitionType: string;
  competitionUuid: string;
};

export type CompetitionResult = {
  competitionUuid: string;
  name: string;
  swimsResults: SwimResult[]
};