import {Swim} from "@/entities/swim";
import {Participants} from "@/entities/competition";

export type CreateCompetitionParams = {
  competitionName: string,
  competitionLocation: string,
  competitionDate: string,
  description: string,
  contactLink: string,
  contactLink2?: string,
  contactLink3?: string,
  participantsType: Participants;
  competitionType: string,
  events: Omit<Swim, "eventUuid">[],
}

export type CreateSwimInCompetitionParams = Omit<Swim, "eventUuid"> & {
  competitionUUID: string,
}

