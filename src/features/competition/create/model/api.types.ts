import {Swim} from "@/entities/swim";

export type CreateCompetitionParams = {
  competitionName: string,
  competitionLocation: string,
  competitionDate: string,
  description: string,
  contactLink: string,
  maxParticipants: number,
  competitionType: string,
  events: Omit<Swim, "eventUuid">[],
}

export type CreateSwimInCompetitionParams = Omit<Swim, "eventUuid"> & {
  competitionUUID: string,
}

