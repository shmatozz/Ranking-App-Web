"use server";

import {AxiosError} from "axios";
import axiosInstance from "@/shared/api/AxiosConfig";
import {
  AddPartnerParams,
  AddSponsorParams,
  updateAboutUsParams,
  UpdatePartnerParams,
  UpdateSponsorParams
} from "features/about-info";
import {auth} from "@/shared/lib";

export async function updateAboutUs(params: updateAboutUsParams) {
 try {
    console.log("Send POST update info about us request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/update-about-us",
      params.text,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )
 } catch (e) {
   if (e instanceof AxiosError) {
     return { error: e.response!.data.msg };
   }
   else return { error: "Неизвестная ошибка" };
 }
}

export async function addPartner(params: AddPartnerParams) {
  try {
    console.log("Send POST add partner request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/add-partner",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}

export async function updatePartner(params: UpdatePartnerParams) {
  try {
    console.log("Send POST update partner request");
    const session = await auth();

    const data = params.data;

    if ((data.get("logo") as File).size > 0) data.set("isNeedUpdateLogo", "true");
    else data.set("isNeedUpdateLogo", "false");

    await axiosInstance.post(
      `/admin/update-partner/${params.partnerID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}

export async function addSponsor(params: AddSponsorParams) {
  try {
    console.log("Send POST add sponsor request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/add-sponsor",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}

export async function updateSponsor(params: UpdateSponsorParams) {
  try {
    console.log("Send POST update partner request");
    const session = await auth();

    const data = params.data;

    if ((data.get("logo") as File).size > 0) data.set("isNeedUpdateLogo", "true");
    else data.set("isNeedUpdateLogo", "false");

    await axiosInstance.post(
      `/admin/update-partner/${params.sponsorID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}
