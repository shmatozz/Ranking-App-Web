'use client';

import React, {useState} from "react";
import {Button, TextInput} from "@/shared/ui";
import {signUp} from "@/shared/lib";
import {useRouter} from "next/navigation";

export const SignUpUserForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const res = await signUp(formData)

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
        name={"lastName"} required
        title={"Фамилия"}
        type={"text"}
      />

      <TextInput
        name={"firstName"} required
        title={"Имя"}
        type={"text"}
      />

      <TextInput
        name={"middleName"}
        title={"Отчество"}
        type={"text"}
      />

      <TextInput
        name={"birthDate"} required
        title={"Дата рождения"}
        type={"date"}
      />

      <TextInput
        name={"email"} required
        title={"Email"}
        type={"email"}
      />

      <TextInput
        name={"emergencyPhone"} required
        title={"Контактный (запасной) номер"}
        type={"tel"}
      />

      <TextInput
        name={"password"} required
        title={"Пароль"}
        type={"password"}
        minLength={8} maxLength={256}
      />

      <TextInput
        name={"confirmPassword"} required
        title={"Повторите пароль"}
        type={"password"}
        minLength={8} maxLength={256}
      />

      <Button className={"w-full max-w-[300px] mt-3 self-center"} type={"submit"}>
        Далее
      </Button>
    </form>
  )
}
