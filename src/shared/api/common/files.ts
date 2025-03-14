"use server";

import axiosInstance from "@/shared/api/AxiosConfig";

export async function fetchImage(path: string) {
  try {
    console.log("Send GET image request")

    const response = await axiosInstance.get(
      `/file/download/${path}`,
      {
        responseType: "arraybuffer",
        headers: {
          Accept: "*/*",
        }
      });

    return new Blob([response.data], { type: response.headers["content-type"] });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
