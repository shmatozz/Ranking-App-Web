'use server';

import {executeAction} from "@/shared/utils";
import {signIn, signOut} from "@/shared/lib";

export const submit = async (formData: FormData) => {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", formData);
    },
  })
}

export const quit = async () => await signOut();

export const signUp = async (formData: FormData) => {
  console.log(formData);

  await executeAction({
    actionFn: async () => {
    },
    successMessage: "Signed up successfully",
  });
}
