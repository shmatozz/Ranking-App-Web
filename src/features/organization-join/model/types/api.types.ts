export type CreateUserForOrganization = {
  email: string,
  emergencyPhone: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  birthDate: string,
  gender?: "MALE" | "FEMALE",
  password?: string,
  confirmPassword?: string,
  isNeedGeneratePassword?: boolean
}

export type CreateUserForOrganizationResponse = {
  status: number;
  data: {
    email: string,
    password: string,
  }
}
