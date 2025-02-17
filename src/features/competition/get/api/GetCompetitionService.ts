"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {CompetitionRequest, CompetitionResponse} from "@/features/competition/get";
import {AxiosError} from "axios";

export async function getCompetitionByID(params: CompetitionRequest) {
  console.log("Send GET competition by ID request");
  const session = await auth();

  try {
    const response: CompetitionResponse = await axiosInstance.get(
      `/competition/find/${params.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.status === 404) {
        throw new Error("Соревнование не найдено")
      }
    }
  }
}
