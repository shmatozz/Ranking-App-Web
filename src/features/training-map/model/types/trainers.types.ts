export type Trainer = {
  id: number,
  firstName: string,
  lastName: string,
  middleName?: string,
  description?: string,
  image?: string
}

export type TrainerCreate = {
  firstName: string,
  lastName: string,
  middleName?: string,
  description?: string,
  image?: File
}
