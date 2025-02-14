import {Swim} from "@/entities/swim";

export type CreateCompetitionParams = {
  competitionName: string,
  competitionLocation: string,
  competitionDate: string,
  maxParticipants: number,
  competitionType: string,
  events: Swim[],
}
