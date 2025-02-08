'use server';

import {Organization, OrganizationShort} from "@/entities/organization";

export async function getOrganizationInfo(token: string): Promise<Organization> {
  const response = await fetch("http://localhost:9000/api/v1/organization/full-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  console.log(response)

  const responseText = await response.json();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}

export async function getOrganizationShortInfo(token: string): Promise<OrganizationShort> {
  const response = await fetch("http://localhost:9000/api/v1/organization/short-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const responseText = await response.text();
  return responseText.length === 0 ? {status: 123} : JSON.parse(responseText);
}
