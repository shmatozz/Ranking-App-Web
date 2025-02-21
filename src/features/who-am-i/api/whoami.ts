'use server';

import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";
import {WhoAmI} from "@/features/who-am-i";

export const whoAmI = async () => {
  try {
    console.log("Send GET who am i request");
    const session = await auth();

    const response = await axiosInstance.get<WhoAmI>(
      "/auth/info-by-token?token=" + session?.user.token,
    )

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
