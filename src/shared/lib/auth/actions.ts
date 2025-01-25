'use server';

import {signUpRequest} from "@/widgets/auth";
import {signIn, signOut} from "@/shared/lib";
import {redirect, RedirectType} from "next/navigation";
import {signUpOrganizationRequest} from "@/widgets/auth/api/sign-up";

export const submit = async (formData: FormData) => {
  await signIn("credentials", formData);
}

export async function quit() { await signOut() }

export async function signUp (formData: FormData) {
  console.log(formData);

  await signUpRequest({
    firstName: formData.get("firstName")! as string,
    lastName: formData.get("lastName")! as string,
    middleName: formData.get("middleName")! as string,
    birthDate: formData.get("birthDate")! as string,
    email: formData.get("email")! as string,
    emergencyPhone: formData.get("emergencyPhone")! as string,
    gender: "MALE",
    password: formData.get("password")! as string,
    confirmPassword: formData.get("confirmPassword")! as string,
  })

  await signIn("credentials", {
    redirect: false,
    email: formData.get("email")! as string,
    password: formData.get("password")! as string,
  });

  redirect("/confirm", RedirectType.replace);
}

export async function signUpOrganization(formData: FormData) {
  console.log(formData);

  await signUpOrganizationRequest({
    organizationEmail: formData.get("organizationEmail")! as string,
    organizationName: formData.get("organizationName")! as string,
    password: formData.get("password")! as string,
    confirmPassword: formData.get("confirmPassword")! as string,
  }).then(async (response) => {
    console.log(response)

    await signIn("credentials", {
      redirect: false,
      email: formData.get("organizationEmail")! as string,
      password: formData.get("password")! as string,
    }).catch((e) => {
      console.log(e);
    });

    redirect("/confirm", RedirectType.replace);
  })
}
