"use server";

import {updatePasswordParams} from "@/shared/api/types";
import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";

export async function updatePassword(params: updatePasswordParams) {
  console.log("Send POST update password request")
  const session = await auth();

  try {
    await axiosInstance.post(
      "/password/update",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data.msg);
      throw new Error(e.response!.data.msg);
    }
  }
}
