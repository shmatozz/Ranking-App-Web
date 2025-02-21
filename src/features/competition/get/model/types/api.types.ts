import {CompetitionFull} from "@/entities/competition";

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

