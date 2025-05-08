export type Payment = {
  id: string,
  status: string,
  paid?: boolean,
  amount?: {
    value: string,
    currency: string
  },
  description?: string,
  created_at?: string,
  expires_at?: null
}
