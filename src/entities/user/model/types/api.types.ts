import {User} from "@/entities/user";

export type updatePasswordParams = {
  oldPassword: string,
  newPassword: string
}

export type updateEmailParams = {
  email: string;
}

export type UserResponse = {
  status: number;
  data: User;
}
