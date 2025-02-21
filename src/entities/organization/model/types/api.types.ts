import {Organization, OrganizationShort} from "@/entities/organization";

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

