"use server";

import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {UserResults} from "@/widgets/profile";
import {auth} from "@/shared/lib";

export async function getUserResults() {
  try {
    console.log("Send GET user results request");
    const session = await auth();

    const response = await axiosInstance.get<UserResults>(
      "/user/my-results",
      {
        headers: {
          "Authorization": `Bearer ${session?.user.token}`,
        }
      }
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}
