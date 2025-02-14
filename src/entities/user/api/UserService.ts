'use server';

import {User, UserResponse} from "@/entities/user";
import {updateEmailParams, updatePasswordParams} from "@/entities/user/model/types/api.types";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function fetchUserInfo(token: string): Promise<User> {
  console.log("Send GET user info request")

  const response: UserResponse = await axiosInstance.get("/user/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

export async function updateUserPassword(params: updatePasswordParams) {
  console.log("Send POST update user password request")
  const session = await auth();

  try {
   await axiosInstance.post(
      "/user/update-password",
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


export async function updateUserEmail(params: updateEmailParams, token: string) {
  const response = await fetch("http://localhost:9000/api/v1/user/update-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(params)
  });

  const responseText = await response.text();
  console.log(response, responseText);

  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}

