"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {CompetitionRequest, CompetitionResponse, JoinSwimRequest, SwimRequest} from "@/features/competition/get";
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

export async function joinSwim(params: JoinSwimRequest) {
  console.log("Send POST join competition request");
  const session = await auth();

  try {
    await axiosInstance.post(
      `/user/add-to-event/${params.uuid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
  }
}

export async function deleteSwimByID(params: SwimRequest) {
  console.log("Send DELETE competition by ID request");
  const session = await auth();

  try {
    await axiosInstance.delete(
      `/event/delete/${params.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
  }
}

export async function deleteCompetitionByID(params: CompetitionRequest) {
  console.log("Send DELETE competition by ID request");
  const session = await auth();

  try {
    await axiosInstance.delete(
      `/competition/delete/${params.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
  }
}

