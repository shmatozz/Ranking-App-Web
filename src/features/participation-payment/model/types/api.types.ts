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

export type CreateWidgetPaymentRequest = {
  paymentSum: number,
  description: string
}

export type CreateWidgetPaymentResponse = {
  status: number,
  data: {
    id: string,
    status: string,
    token: string
  }
}


export type GetPaymentRequest = {
  paymentId: string
}

export type GetPaymentResponse = {
  status: number
  data: Payment
}
