"use server"

import {AddCuratorParams} from "@/features/user-roles";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function addCurator(params: AddCuratorParams) {
  try {
    console.log("Send POST add new curator request");
    const session = await auth();

    await axiosInstance.post(
      `/admin/curator/${params.email}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}
