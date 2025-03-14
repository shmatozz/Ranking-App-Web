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
  rating: number;
  image?: string;
}

export type User = UserShort & {
  userCompetitions?: Competition[],
  userEvents?: Swim[],
  userOrganizations?: Omit<OrganizationShort, "id" & "role">[],
}

export type Participant = {
  fullName: string,
  gender: string,
  age: number,
  rating: number,
  category: string,
}
