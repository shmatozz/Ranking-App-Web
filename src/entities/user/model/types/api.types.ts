import {User, UserShort} from "@/entities/user";

export type UserShortResponse = {
  status: number;
  data: UserShort;
}

export type UserResponse = {
  status: number;
  data: User;
}

