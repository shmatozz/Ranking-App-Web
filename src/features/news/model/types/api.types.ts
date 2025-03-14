import {News} from "@/features/news";

export type NewsResponse = {
  status: number;
  data: NewsResponseData
}

export type NewsResponseData = {
  totalElements: number,
  totalPages: number,
  content: News[]
}

export type CreateNewsRequest = {
  topic: string,
  text: string,
  startDate: string,
  endDate: string,
  image1?: File,
  image2?: File,
  image3?: File,
}

export type UpdateNewsRequest = {
  id: number,
  topic: string,
  text: string,
  startDate: string,
  endDate: string,
  image1?: File,
  image2?: File,
  image3?: File,
}

export type DeleteNewsRequest = {
  id: number,
}
