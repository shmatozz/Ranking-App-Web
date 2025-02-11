'use server';

import {Organization, OrganizationShort} from "@/entities/organization";
import {updatePasswordParams} from "@/entities/organization";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";

export async function getOrganizationInfo(token: string): Promise<Organization> {
  const response = await fetch("http://localhost:9000/api/v1/organization/full-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  console.log(response)

  const responseText = await response.json();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}

export async function getOrganizationShortInfo(token: string): Promise<OrganizationShort> {
  const response = await fetch("http://localhost:9000/api/v1/organization/short-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const responseText = await response.text();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}

export async function updateOrganizationPassword(params: updatePasswordParams, token: string) {
  console.log("Send POST update user password request")

  try {
    await axiosInstance.post(
      "/organization/update-password",
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data.msg);
      throw new Error(e.response!.data.msg);
    }
  }
}
