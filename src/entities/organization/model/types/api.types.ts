import {Organization, OrganizationShort} from "@/entities/organization";

export type updatePasswordParams = {
  oldPassword: string,
  newPassword: string
}

export type updateOpenStatusParams = {
  isOpen: boolean
}

export type OrganizationShortResponse = {
  status: number;
  data: OrganizationShort;
}

export type OrganizationResponse = {
  status: number;
  data: Organization;
}

