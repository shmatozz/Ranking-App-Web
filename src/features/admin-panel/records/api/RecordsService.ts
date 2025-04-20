"use server"

import {AxiosError} from "axios";
import {
  CreateRecordParams,
  PageRequestDto,
  RecordResponse,
  SearchParamsDto,
  UpdateRecordParams
} from "@/features/admin-panel/records";
import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";

export async function getRecords(params: { page: PageRequestDto, filters: SearchParamsDto}) {
  try {
    console.log("Send GET records request");
    const session = await auth();

    const urlParams = new URLSearchParams();

    Object.keys(params.page).forEach((key) => {
      const value = params.page[key as keyof PageRequestDto];
      if (value) {
        urlParams.append(key, value.toString());
      }
    });

    Object.keys(params.filters).forEach((key) => {
      const value = params.filters[key as keyof SearchParamsDto];
      if (value) {
        urlParams.append(key, value.toString());
      }
    });

    const response = await axiosInstance.get<RecordResponse>(
      `/admin/record/search?${urlParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      });

    return { data: response.data }
  } catch (e) {
    console.log(e)
    if (e instanceof AxiosError) {
      return { error: "Ошибка запроса" }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function createRecord(params: CreateRecordParams) {
  try {
    console.log("Send POST create record request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/record/create",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: "Ошибка запроса" }
    }
    return { error: "Неизвестная ошибка" }
  }
}

export async function updateRecord(params: UpdateRecordParams) {
  try {
    console.log("Send POST update record request");
    const session = await auth();

    await axiosInstance.post(
      "/admin/record/update",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        }
      }
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: "Ошибка запроса" }
    }
    return { error: "Неизвестная ошибка" }
  }
}
