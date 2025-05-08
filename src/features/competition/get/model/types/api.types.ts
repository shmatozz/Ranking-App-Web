import {CompetitionFull} from "@/entities/competition";
import {Participant} from "@/entities/user";

export type CompetitionRequest = {
  uuid: string
}

export type JoinSwimRequest = {
  uuid: string
}

export type SwimRequest = {
  uuid: string
}

export type CompetitionResponse = {
  status: number;
  data: CompetitionFull;
}

export type FilterParticipantsParams = ParticipantsFilters & Pages & {
  eventUUID: string
}

export type ParticipantsFilters = {
  gender?: "MALE" | "FEMALE" | "MIXED",
  age?: number,
  category?: string
}

export type Pages = {
  page?: number,
  size?: number
}

export type FilterParticipantsResponse = {
  status: number;
  data: FilterParticipantsResponseData
}

export type FilterParticipantsResponseData = {
  totalElements: number;
  totalPages: number;
  content: Participant[];
}

export type SwimResultsForm = {
  userEmail: string;
  distance: number;
  gender: "MALE" | "FEMALE";
  userTime: {
    hour: number;
    minute: number;
    second: number;
    nano?: number;
  };
};

