'use server';

import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";

export async function generateResultsTemplate(params: { uuid: string }) {
  console.log("Send GET swim results template by ID request");
  const session = await auth();

  try {
    const response = await axiosInstance.get(
      `/event/generate-xlsx-template/${params.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        responseType: "blob"
      });

    return response.data
  } catch (e) {
    if (e instanceof AxiosError) {
    }
  }
}
