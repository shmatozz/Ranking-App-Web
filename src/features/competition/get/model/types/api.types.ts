import {CompetitionFull} from "@/entities/competition";

export type CompetitionRequest = {
  uuid: string
}

export type CompetitionResponse = {
  status: number;
  data: CompetitionFull;
}

