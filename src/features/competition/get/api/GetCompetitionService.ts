"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {CompetitionRequest, CompetitionResponse} from "@/features/competition/get";
import {CompetitionFull} from "@/entities/competition";

export async function getCompetitionByID(params: CompetitionRequest): Promise<CompetitionFull> {
  console.log("Send GET competition by ID request");
  const session = await auth();

  const response: CompetitionResponse = await axiosInstance.get(
    `/competition/find/${params.uuid}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      }
    });

  return response.data;
}
