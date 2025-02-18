import {User} from "@/entities/user";

export type updateEmailParams = {
  email: string;
}

export type UserResponse = {
  status: number;
  data: User;
}
