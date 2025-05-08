export type Trainer = {
  id: number,
  firstName: string,
  lastName: string,
  middleName?: string,
  education?: string,
  specialization?: string,
  achievements?: string,
  image?: string
}

export type TrainerCreate = {
  firstName: string,
  lastName: string,
  middleName?: string,
  education?: string,
  specialization?: string,
  achievements?: string,
  image?: File
}
