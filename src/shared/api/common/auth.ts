"use server";

import {updateEmailParams, updateEmailResponse, updatePasswordParams} from "@/shared/api/types";
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

export async function updateEmail(params: updateEmailParams, role: "user" | "organization") {
  console.log("Send POST update email request")
  const session = await auth();

  try {
    const response: updateEmailResponse = await axiosInstance.post(
      `/${role}/update-email`,
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

    return { data: response.data.jwtToken };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    } else {
      return { error: "Что-то пошло не так" };
    }
  }
}

export const sendCodeRequest = async (email: string) => {
  try {
    console.log("Send GET confirm code request")
    const response = await axiosInstance.get<{ verificationCode: string }>(
      `/auth/verify-email?emailToVerify=${email}`
    )

    return response.data.verificationCode;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response!.data.msg);
    }
  }
};
