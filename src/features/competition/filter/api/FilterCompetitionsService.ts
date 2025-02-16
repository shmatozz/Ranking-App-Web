"use server";

import {Competition} from "@/entities/competition";
import {FilterCompetitionsParams, FilterCompetitionsResponse} from "@/features/competition/filter";
import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function getCompetitionsByFilter(params: FilterCompetitionsParams): Promise<Competition[]> {
  console.log("Send GET competition by filters request");
  const session = await auth();

  const urlParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof FilterCompetitionsParams];
    if (value) {
      urlParams.append(key, value.toString());
    }
  });

  const response: FilterCompetitionsResponse = await axiosInstance.get(
    `/competition/search?${urlParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      }
    });

  return response.data.content;
}
