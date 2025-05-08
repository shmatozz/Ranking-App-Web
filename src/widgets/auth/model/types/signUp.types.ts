export type SignUpCredentials = {
  email: string,
  emergencyPhone: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  birthDate: string,
  gender: string,
  password: string,
  confirmPassword: string
}

export type SignUpOrganizationCredentials = {
  organizationEmail: string,
  organizationName: string,
  isOpen: boolean,
  password: string,
  confirmPassword: string
}
