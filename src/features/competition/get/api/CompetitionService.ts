"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {
  CompetitionRequest,
  CompetitionResponse,
  FilterParticipantsParams, FilterParticipantsResponse,
  JoinSwimRequest,
  SwimRequest
} from "@/features/competition/get";
import {AxiosError} from "axios";
import {Swim} from "@/entities/swim";
import {ParticipantFull} from "@/entities/user";

export async function getCompetitionByID(params: CompetitionRequest) {
  console.log("Send GET competition by ID request");

  try {
    const response: CompetitionResponse = await axiosInstance.get(
      `/competition/find/${params.uuid}`,
      );

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

export async function getSwimInfo(params: SwimRequest) {
  console.log("Send GET find swim info request");

  try {
    const response = await axiosInstance.get<Swim & { users: ParticipantFull[] }>(
      `/event/find/${params.uuid}`
    );

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function getSwimParticipantsInfo(params: FilterParticipantsParams) {
  try {
    console.log("Send GET competition by filters request");

    const urlParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof FilterParticipantsParams];
      if (value) {
        urlParams.append(key, value.toString());
      }
    });

    const response: FilterParticipantsResponse = await axiosInstance.get(
      `/event/search/${params.eventUUID}/users?${urlParams.toString()}`
    );

    return { data: response.data};
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

