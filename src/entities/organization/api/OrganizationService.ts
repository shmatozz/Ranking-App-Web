'use server';

import {
  OrganizationShort, Organization,
  OrganizationShortResponse,OrganizationResponse,
  updateOpenStatusParams
} from "@/entities/organization";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {auth} from "@/shared/lib";

export async function getOrganizationInfo(): Promise<Organization> {
  console.log("Send GET organization FULL info request");
  const session = await auth();

  const response: OrganizationResponse = await axiosInstance.get(
    "/organization/full-info",
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

  return response.data;
}

export async function getOrganizationShortInfo(): Promise<OrganizationShort> {
  console.log("Send GET organization short info request");
  const session = await auth();

  const response: OrganizationShortResponse = await axiosInstance.get(
    "/organization/short-info",
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

  return response.data;
}

export async function updateOrganizationOpenStatus(params: updateOpenStatusParams) {
  console.log("Send POST update open status request");
  const session = await auth();

  try {
    await axiosInstance.post(
      "/organization/update-open-status",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error(e.response!.data.msg);
      throw new Error(e.response!.data.msg);
    }
  }
}

