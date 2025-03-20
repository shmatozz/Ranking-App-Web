import {Partner, Sponsor} from "@/features/about-info";

export type GetAboutUsInfoResponse = {
  status: number;
  data: {
    description: string;
  }
}

export type GetPartnersInfoResponse = {
  status: number;
  data: {
    totalElements: 0,
    totalPages: 0,
    content: Partner[]
  }
}

export type GetSponsorsInfoResponse = {
  status: number;
  data: {
    totalElements: 0,
    totalPages: 0,
    content: Sponsor[]
  }
}
