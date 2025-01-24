'use server';

import {signUpRequest} from "@/widgets/auth";

export const submit = async (formData: FormData) => {
  const res = await fetch("http://localhost:9000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: formData.get("email")! as string,
      password: formData.get("password")! as string,
    }),
  });

  const data = await res.json();
  console.log(data.jwtToken);
}

export async function signUp (formData: FormData) {
  console.log(formData);

  try {
    signUpRequest({
      firstName: formData.get("firstName")! as string,
      lastName: formData.get("lastName")! as string,
      middleName: formData.get("middleName")! as string,
      birthDate: formData.get("birthDate")! as string,
      email: formData.get("email")! as string,
      emergencyPhone: formData.get("emergencyPhone")! as string,
      gender: "MALE",
      password: formData.get("password")! as string,
      confirmPassword: formData.get("confirmPassword")! as string,
    }).then((response) => {
      if (response.ok) {
        submit(formData);
      }
    })
  } catch (e) {
    console.error(e);
  }
}
