'use server';

import {CreateCompetitionParams} from "@/features/create-competition";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function createCompetition(
  params: CreateCompetitionParams,
) {
  console.log("Send POST create competition request")
  const session = await auth();

  try {
    await axiosInstance.post(
      "/competition/create",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data);
      throw new Error(e.response!.data.msg);
    }
  }
}
