export type updatePasswordParams = {
  oldPassword: string,
  newPassword: string
}

export type updateEmailParams = {
  email: string,
}

export type updateEmailResponse = {
  data: {
    jwtToken: string
  }
}
