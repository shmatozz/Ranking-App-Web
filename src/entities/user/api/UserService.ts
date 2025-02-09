'use server';

import {User} from "@/entities/user";
import {updateEmailParams, updatePasswordParams} from "@/entities/user/model/types/api.types";

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

export async function updateUserPassword(params: updatePasswordParams, token: string): Promise<User> {
  const response = await fetch("http://localhost:9000/api/v1/user/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(params)
  });

  const responseText = await response.text();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}


export async function updateUserEmail(params: updateEmailParams, token: string) {
  const response = await fetch("http://localhost:9000/api/v1/user/update-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(params)
  });

  const responseText = await response.text();
  console.log(response, responseText);

  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}

