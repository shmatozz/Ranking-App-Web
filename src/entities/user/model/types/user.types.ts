export type Role = "sportsman" | "organization" | "USER";

export type User = {
  id: number;
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
