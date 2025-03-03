"use server";

import {auth} from "@/shared/lib";
import axiosInstance from "@/shared/api/AxiosConfig";
import {AxiosError} from "axios";
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetPaymentRequest,
  GetPaymentResponse
} from "@/features/participation-payment";

export async function createPayment(params: CreatePaymentRequest) {
  console.log("Send POST create payment request");
  const session = await auth();

  try {
    const response: CreatePaymentResponse = await axiosInstance.post(
      "/payment",
      params,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )

    return { data: response.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
  }
}

export async function getPaymentInfo(params: GetPaymentRequest) {
  console.log("Send GET payment request");
  const session = await auth();

  try {
    const response: GetPaymentResponse = await axiosInstance.get(
      `/payment/${params.paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )

    return { data: response.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: e.response!.data.msg };
    }
  }
}
