import {Swim, SwimResult} from "@/entities/swim";
import {OrganizationShort} from "@/entities/organization";

export type Participants = "PROFESSIONALS" | "AMATEURS"

export type Competition = {
  name: string;
  location: string;
  date: string;
  maxParticipants: number;
  description: string;
  contactLink: string,
  contactLink2: string,
  contactLink3: string,
  participantsType: Participants;
  competitionType: string;
  competitionUuid: string;
};

export type CompetitionResult = {
  competitionUuid: string;
  name: string;
  swimsResults: SwimResult[]
};

export type CompetitionFull = Competition & {
  events: Swim[];
  organizationInfo: Omit<OrganizationShort, "role" | "id">;
};
