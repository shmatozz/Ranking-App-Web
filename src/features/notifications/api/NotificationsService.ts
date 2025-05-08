"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {
  DeleteNotificationByIdParams,
  DeleteNotificationsParams,
  NotificationsResponse
} from "@/features/notifications";
import {auth} from "@/shared/lib";

export async function getNotifications() {
  try {
    console.log("Send GET notification request");
    const session = await auth();

    const response: NotificationsResponse = await axiosInstance.get(
      "/notification",
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function deleteNotificationById(params: DeleteNotificationByIdParams) {
  try {
    console.log("Send GET news request");
    const session = await auth();

    await axiosInstance.delete(
      `/notification/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}


export async function deleteNotifications(params: DeleteNotificationsParams) {
  try {
    console.log("Send GET news request");
    const session = await auth();

    await axiosInstance.delete(
      `/notification`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        data: params.ids
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}

