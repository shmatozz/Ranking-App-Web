'use server';

import {UserResponse, UserShort, UserShortResponse} from "@/entities/user";
import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {AxiosError} from "axios";

export async function getUserShortInfo(): Promise<UserShort> {
  console.log("Send GET user info request")
  const session = await auth();

  const response: UserShortResponse = await axiosInstance.get("/user/info", {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    }
  });

  return response.data;
}

export async function getUserInfo() {
  console.log("Send GET user info request")
  const session = await auth();

  try {
    const response: UserResponse = await axiosInstance.get(
      "/user/full-info",
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });

    return { data: response.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
  }
}

