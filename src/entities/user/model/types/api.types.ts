import {User} from "@/entities/user";

export type UserResponse = {
  status: number;
  data: User;
}
