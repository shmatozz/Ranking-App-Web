import {Role, User} from "@/entities/user";
import {Competition} from "@/entities/competition";

export type OrganizationShort = {
  id: number;
  email: string;
  name: string;
  role?: Role;
  isOpen: boolean;
}

export type Organization = OrganizationShort & {
  users?: User[],
  competitions?: Competition[],
}