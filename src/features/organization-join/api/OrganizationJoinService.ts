'use server';

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {AxiosError} from "axios";

export async function sendOrganizationJoinRequest(emails: string[]): Promise<void> {
  console.log("Send POST invite to organization request");
  const session = await auth();

  try {
    await axiosInstance.post(
      "/organization/send-invite-to-users",
      emails,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.status) {
        case 404: throw new Error("Пользователь не найден");
      }
    }
  }
}
