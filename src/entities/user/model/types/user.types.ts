import {Role} from "@/shared/lib";

export type User = {
  email: string;
  phone?: string;
  emergencyPhone?: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  firstName: string;
  lastName: string;
  middleName?: string;
  role: Role;
}
