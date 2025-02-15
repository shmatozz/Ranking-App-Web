import {Swim, SwimResult} from "@/entities/swim";
import {OrganizationShort} from "@/entities/organization";

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

export type CompetitionFull = Competition & {
  events: Swim[];
  organizationInfo: Omit<OrganizationShort, "role" | "id">;
};
