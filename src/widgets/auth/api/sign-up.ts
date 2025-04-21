import {SignUpCredentials, SignUpOrganizationCredentials} from "@/widgets/auth";

export const signUpRequest = async (data: SignUpCredentials): Promise<Response> => {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-up`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}


export const signUpOrganizationRequest = async (data: SignUpOrganizationCredentials): Promise<Response> => {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-up-organization`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
