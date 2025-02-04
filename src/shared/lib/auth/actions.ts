'use server';

import {signUpRequest} from "@/widgets/auth";
import {signIn, signOut} from "@/shared/lib";
import {signUpOrganizationRequest} from "@/widgets/auth/api/sign-up";
import {CredentialsSignin} from "next-auth";

export const submit = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    })
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return error.message.split(" Read more at")[0];
    }
    return "Неизвестная ошибка";
  }
}

export async function quit() { await signOut() }

export async function signUp (formData: FormData) {
  try {
    const response = await signUpRequest({
      firstName: formData.get("firstName")! as string,
      lastName: formData.get("lastName")! as string,
      middleName: formData.get("middleName")! as string,
      birthDate: formData.get("birthDate")! as string,
      email: formData.get("email")! as string,
      emergencyPhone: formData.get("emergencyPhone")! as string,
      gender: formData.get("gender")! as string,
      password: formData.get("password")! as string,
      confirmPassword: formData.get("confirmPassword")! as string,
    })

    if (response.ok) {
      await signIn("credentials", {
        redirect: false,
        email: formData.get("email")! as string,
        password: formData.get("password")! as string,
      });
    } else {
      const data = await response.json();
      return data.msg ? data.msg : "Неизвестная ошибка";
    }
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return error.message.split(" Read more at")[0];
    }
    return "Неизвестная ошибка";
  }
}

export async function signUpOrganization(formData: FormData) {
  try {
    const response = await signUpOrganizationRequest({
      organizationEmail: formData.get("organizationEmail")! as string,
      organizationName: formData.get("organizationName")! as string,
      password: formData.get("password")! as string,
      confirmPassword: formData.get("confirmPassword")! as string,
    })

    if (response.ok) {
      await signIn("credentials", {
        redirect: false,
        email: formData.get("organizationEmail")! as string,
        password: formData.get("password")! as string,
      })
    } else {
      const data = await response.json();
      return data.msg ? data.msg : "Неизвестная ошибка";
    }
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return error.message.split(" Read more at")[0];
    }
    return "Неизвестная ошибка";
  }
}
