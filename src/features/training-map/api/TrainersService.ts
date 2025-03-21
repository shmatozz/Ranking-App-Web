"use server";

import {
  CreateTrainerRequest,
  GetTrainersRequest,
  GetTrainersResponseData,
  UpdateTrainerRequest
} from "@/features/training-map";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function getTrainers(params: GetTrainersRequest) {
  try {
    console.log("Send GET all trainers request");
    const session = await auth();

    const response = await axiosInstance.get<GetTrainersResponseData>(
      `/trainers/${params.coordinateId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )

    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function createTrainer(params: CreateTrainerRequest) {
  try {
    console.log("Send POST create trainer request");
    const session = await auth();

    await axiosInstance.post(
      `/admin/add-trainer/${params.coordinateId}`,
      params.data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function updateTrainer(params: UpdateTrainerRequest) {
  try {
    console.log("Send POST create trainer request");
    const session = await auth();

    const data = params.data;
    if ((data.get("image") as File).size > 0) data.set("isNeedUpdatePhoto", "true")
    else data.set("isNeedUpdatePhoto", "false")

    await axiosInstance.post(
      `/admin/update-trainer/${params.trainerID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}
