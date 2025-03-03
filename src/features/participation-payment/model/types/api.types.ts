import {Payment} from "@/features/participation-payment";

export type CreatePaymentRequest = {
  paymentSum: number,
  redirectUrl: string,
  description: string
}

export type CreatePaymentResponse = {
  status: number,
  data: {
    id: string,
    status: string,
    redirectUrl: string
  }
}

export type GetPaymentRequest = {
  paymentId: string
}

export type GetPaymentResponse = {
  status: number
  data: Payment
}
