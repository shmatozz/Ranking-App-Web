'use server';

import {User} from "@/entities/user";

export async function getUserInfo(token: string): Promise<User> {
  const response = await fetch("http://localhost:9000/api/v1/user/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const responseText = await response.text();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}
