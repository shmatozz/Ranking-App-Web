'use client';

import React, {useState} from "react";
import {Button, TextInput} from "@/shared/ui";
import {signUpOrganization} from "@/shared/lib";
import {useRouter} from "next/navigation";

export const SignUpOrganizationForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const res = await signUpOrganization(formData)

      console.log(res);

      if (!res) {
        router.replace("/confirm");
      } else {
        setError(res);
      }
    } catch (e) {
      console.log("LOGGED", e);
    }
  };

  return (
    <form
      className={"flex flex-col gap-3 w-full"}
      onSubmit={handleSubmit}
    >
      {
        error && (
          <div className={"px-6 py-2 rounded-2xl bg-red-5 text-center text-red-70"}>
            {error}
          </div>
        )
      }

      <TextInput
        name={"organizationName"} required
        title={"Название организации"}
        type={"text"}
      />

      <TextInput
        name={"organizationEmail"} required
        title={"E-mail"}
        type={"email"}
      />

      <TextInput
        name={"organizationPhone"}
        title={"Контактный номер организации"}
        type={"tel"}
      />

      <TextInput
        name={"password"} required
        title={"Пароль"}
        type={"password"}
      />

      <TextInput
        name={"confirmPassword"} required
        title={"Повторите пароль"}
        type={"password"}
      />

      <Button className={"w-full max-w-[300px] mt-3 self-center"} type={"submit"}>
        Далее
      </Button>
    </form>
  )
}
