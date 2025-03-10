import {Competition} from "@/entities/competition";

export type FilterCompetitionsParams = Filters & Pages

export type Filters = {
  name?: string;
  location?: string;
  date?: string;
  maxParticipants?: number;
  minParticipants?: number;
  competitionType?: string;
}

export type Pages = {
  page?: number,
  size?: number,
  property?: string,
  direction?: "DESC" | "ASC",
}


export type FilterCompetitionsResponse = {
  status: number;
  data: FilterCompetitionsResponseData
}

export type FilterCompetitionsResponseData = {
  totalElements: number;
  totalPages: number;
  content: Competition[];
}

