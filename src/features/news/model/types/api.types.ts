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
