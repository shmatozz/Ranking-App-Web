"use server";

import {AxiosError} from "axios";
import {FilterRatingParams, FilterRatingResponse} from "@/features/ratings";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function getRating(params: FilterRatingParams) {
  try {
    console.log("Send GET ratings request");

    const urlParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof FilterRatingParams];
      if (value) {
        urlParams.append(key, value.toString());
      }
    });

    const response: FilterRatingResponse = await axiosInstance.get(
      `/user/rating-search?${urlParams.toString()}`
    );

    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response!.data.msg };
    }
    return { error: "Неизвестная ошибка" }
  }
}
