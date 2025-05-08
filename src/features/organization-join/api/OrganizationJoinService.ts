'use server';

import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";
import {AxiosError} from "axios";
import {CreateUserForOrganization, CreateUserForOrganizationResponse} from "@/features/organization-join";

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

export async function addUserWithOutInvite(emails: string[]) {
  console.log("Send POST add user without invite to organization request");
  const session = await auth();

  try {
    await axiosInstance.post(
      "/organization/curator/add-users",
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
        case 404: return { error: "Пользователь не найден" };
      }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function createUserForOrganization(params: CreateUserForOrganization) {
  console.log("Send POST add user without invite to organization request");
  const session = await auth();

  try {
    const response: CreateUserForOrganizationResponse = await axiosInstance.post(
      "/organization/curator/create-user",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.status) {
        case 409: return { error: "Такой пользователь уже существует" };
      }
    }
    return { error: "Неизвестная ошибка" }
  }
}
