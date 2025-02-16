import {Competition} from "@/entities/competition";

export type FilterCompetitionsParams = {
  name?: string;
  location?: string;
  date?: string;
  maxParticipants?: number;
  minParticipants?: number;
  competitionType?: string;
}

export type FilterCompetitionsResponse = {
  status: number;
  data: {
    totalElements: number;
    totalPages: number;
    content: Competition[];
  }
}
