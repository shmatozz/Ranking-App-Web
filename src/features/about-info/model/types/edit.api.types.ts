export type updateAboutUsParams = {
  text: string;
}

export type AddPartnerParams = {
  data: FormData
}

export type UpdatePartnerParams = {
  partnerID: number;
  data: FormData
}

export type DeletePartnerParams = {
  partnerID: number;
}

export type AddSponsorParams = {
  data: FormData
}

export type UpdateSponsorParams = {
  sponsorID: number;
  data: FormData
}

export type DeleteSponsorParams = {
  sponsorID: number;
}
