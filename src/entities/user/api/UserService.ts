'use server';

import {User, UserResponse} from "@/entities/user";
import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";

export async function fetchUserInfo(): Promise<User> {
  console.log("Send GET user info request")
  const session = await auth();

  const response: UserResponse = await axiosInstance.get("/user/info", {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    }
  });

  return response.data;
}
