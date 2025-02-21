'use server';

import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";

export async function generateResultsTemplate(params: { uuid: string }) {
  console.log("Send GET swim results template by ID request");
  const session = await auth();

  try {
    const response = await axiosInstance.get(
      `/event/generate-xlsx-template/${params.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "arraybuffer"
      });

    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    const contentDisposition = response.headers["content-disposition"];
    let filename = "download.xlsx";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      }
    }

    return { blob: blob, filename: filename }
  } catch (e) {
    if (e instanceof AxiosError) {
    }
  }
}

export async function uploadSwimResults(params: { uuid: string, file: File }) {
  console.log("Send POST swim results template by ID request");
  const session = await auth();

  const formData = new FormData();
  formData.append("file", params.file);

  try {
    await axiosInstance.post(
      `/event/upload-result/${params.uuid}`,
      formData,
      {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("File upload error:", error.response ? error.response.data : error);
    }
  }
}

