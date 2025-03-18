import {UserRating} from "@/features/ratings";

export type FilterRatingParams = RatingFilters & Pages

export type RatingFilters = {
  gender?: "MALE" | "FEMALE",
  userType?: string,
  categoryEnum?: string,
  startsCountFrom?: number,
}

export type Pages = {
  page?: number,
  size?: number
}

export type FilterRatingResponse = {
  status: number;
  data: FilterRatingResponseData
}

export type FilterRatingResponseData = {
  totalElements: number;
  totalPages: number;
  content: UserRating[];
}

