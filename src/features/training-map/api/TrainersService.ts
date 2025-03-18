"use server";

import {CreateTrainerRequest, GetTrainersRequest, GetTrainersResponseData} from "@/features/training-map";
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
    console.log("Send POST create trainer request", params);
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
