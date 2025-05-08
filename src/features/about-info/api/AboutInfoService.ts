"use server"

import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {GetAboutUsInfoResponse, GetPartnersInfoResponse, GetSponsorsInfoResponse} from "@/features/about-info";

export async function getAboutUsInfo() {
  try {
    console.log("Send GET about us info request");

    const response: GetAboutUsInfoResponse = await axiosInstance.get(
      "/about-us/info",
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}

export async function getPartnersInfo() {
  try {
    console.log("Send GET partners info request");

    const response: GetPartnersInfoResponse = await axiosInstance.get(
      "/about-us/partners",
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}

export async function getSponsorsInfo() {
  try {
    console.log("Send GET sponsors info request");

    const response: GetSponsorsInfoResponse = await axiosInstance.get(
      "/about-us/sponsors",
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
    else return { error: "Неизвестная ошибка" };
  }
}
