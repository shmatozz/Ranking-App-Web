'use server';

import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function createCompetition(
  params: FormData,
) {
  console.log("Send POST create competition request", params)
  const session = await auth();

  try {
    await axiosInstance.post(
      "/competition/create",
      params,
      {
        headers: {
          'accept': '*/*',
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data);
      throw new Error(e.response!.data.msg);
    }
  }
}
