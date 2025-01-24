import {SignUpCredentials} from "@/widgets/auth";

export const signUpRequest = async (data: SignUpCredentials): Promise<Response> => {
  return await fetch("http://localhost:9000/api/v1/auth/sign-up", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
