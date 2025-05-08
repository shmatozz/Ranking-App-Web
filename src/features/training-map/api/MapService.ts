"use server";

import {AxiosError} from "axios";
import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {DeletePointRequest, GetPointsResponse, SavePointRequest, UpdatePointRequest} from "@/features/training-map";

export async function savePoint(params: SavePointRequest) {
  try {
    console.log("Send POST save coordinates request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/coordinates",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    )
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function getPoints() {
  try {
    console.log("Send GET all coordinates request");

    const response: GetPointsResponse = await axiosInstance.get(
      "/coordinates",
    )

    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function updatePoint(params: UpdatePointRequest) {
  try {
    console.log("Send POST update coordinates request");
    const session = await auth();

    await axiosInstance.post(
      `/admin/coordinates-update/${params.id}`,
      params.point,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}


export async function deletePoint(params: DeletePointRequest) {
  try {
    console.log("Send DELETE coordinates request");
    const session = await auth();

    await axiosInstance.delete(
      `/admin/coordinates/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}
