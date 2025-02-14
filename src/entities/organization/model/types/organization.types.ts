import {User} from "@/entities/user";
import {Competition} from "@/entities/competition";
import {Role} from "@/shared/lib";

export type OrganizationShort = {
  id: number;
  email: string;
  name: string;
  role: Role;
  isOpen: boolean;
}

export type Organization = OrganizationShort & {
  users?: User[],
  competitions?: Competition[],
}
