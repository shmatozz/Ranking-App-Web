"use server";

import {AxiosError} from "axios";
import {CreateNewsRequest, DeleteNewsRequest, NewsResponse, UpdateNewsRequest} from "@/features/news";
import axiosInstance from "@/shared/api/AxiosConfig";
import {auth} from "@/shared/lib";

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

export async function createNews(params: CreateNewsRequest) {
  try {
    console.log("Send POST create news request");
    const session = await auth();

    const formData = new FormData()
    formData.set("topic", params.topic);
    formData.set("text", params.text);
    formData.set("startDate", params.startDate);
    formData.set("endDate", params.endDate);
    if (params.image1) formData.set("image1", params.image1);
    if (params.image2) formData.set("image2", params.image2);
    if (params.image3) formData.set("image3", params.image3);

    await axiosInstance.post(
      "/admin/news",
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )

  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function updateNews(params: UpdateNewsRequest) {
  try {
    console.log("Send POST update news request");
    const session = await auth();

    const formData = new FormData()
    formData.set("topic", params.topic);
    formData.set("text", params.text);
    formData.set("startDate", params.startDate);
    formData.set("endDate", params.endDate);
    if (params.image1) {
      formData.set("image1", params.image1);
      formData.set("isNeedUpdateImage1", "true");
    } else formData.set("isNeedUpdateImage1", "false");
    if (params.image2) {
      formData.set("image2", params.image2);
      formData.set("isNeedUpdateImage2", "true");
    } else formData.set("isNeedUpdateImage2", "false");
    if (params.image3) {
      formData.set("image3", params.image3);
      formData.set("isNeedUpdateImage3", "true");
    } else formData.set("isNeedUpdateImage3", "false");

    await axiosInstance.post(
      `/admin/news-update/${params.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    )

  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function deleteNews(params: DeleteNewsRequest) {
  try {
    console.log("Send DELETE news request");
    const session = await auth();

    await axiosInstance.delete(
      `/admin/news/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    )
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg }
    }
    return { error: "Неизвестная ошибка" }
  }
}


