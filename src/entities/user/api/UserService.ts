'use server';

import {uploadUserPhotoRequest, UserResponse, UserShort, UserShortResponse} from "@/entities/user";
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

export async function uploadUserPhoto(params: uploadUserPhotoRequest) {
  console.log("Send POST upload user photo request");
  const session = await auth();

  const formData = new FormData();
  formData.set("file", params.file);

  try {
    await axiosInstance.post(
      "/user/upload-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data"
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data.msg);
      throw new Error(e.response!.data.msg);
    }
  }
}
