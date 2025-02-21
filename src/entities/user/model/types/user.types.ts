import {Competition} from "@/entities/competition";
import {Swim} from "@/entities/swim";
import {OrganizationShort} from "@/entities/organization";

export type UserShort = {
  email: string;
  phone?: string;
  emergencyPhone?: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  firstName: string;
  lastName: string;
  middleName?: string;
}

export type User = UserShort & {
  userCompetitions?: Competition[],
  userEvents?: Swim[],
  userOrganizations?: Omit<OrganizationShort, "id" & "role">[],
}
