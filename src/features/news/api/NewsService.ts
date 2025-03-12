"use server";

import {AxiosError} from "axios";
import {NewsResponse} from "@/features/news";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function getNews() {
  try {
    console.log("Send GET news request");

    const response: NewsResponse = await axiosInstance.get(
      "/news"
    )

    return { data: response.data }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}
