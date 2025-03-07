"use server";

import {
  FilterCompetitionsParams,
  FilterCompetitionsResponse,
  FilterCompetitionsResponseData
} from "@/features/competition/filter";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function getCompetitionsByFilter(params: FilterCompetitionsParams): Promise<FilterCompetitionsResponseData> {
  console.log("Send GET competition by filters request");

  const urlParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof FilterCompetitionsParams];
    if (value) {
      urlParams.append(key, value.toString());
    }
  });

  const response: FilterCompetitionsResponse = await axiosInstance.get(
    `/competition/search?${urlParams.toString()}`
  );

  return response.data;
}
