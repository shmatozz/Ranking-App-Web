'use server';

import {CreateSwimInCompetitionParams} from "@/features/competition/create";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function createSwimInCompetition(
  params: CreateSwimInCompetitionParams,
) {
  console.log("Send POST create swim in competition request")
  const session = await auth();

  try {
    await axiosInstance.post(
      "/event/create",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data);
      return { error: e.response!.data.msg };
    }
  }
}
