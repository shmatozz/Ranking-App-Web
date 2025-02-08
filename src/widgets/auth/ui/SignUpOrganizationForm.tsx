'use client';

import React, {useEffect, useState} from "react";
import {Button, Checkbox, TextInput} from "@/shared/ui";
import {signUpOrganization} from "@/shared/lib";
import {useRouter} from "next/navigation";

export const SignUpOrganizationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

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
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.log("LOGGED", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Регистрация организации";
  }, []);

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

      <Checkbox
        name={"isOpen"} text={"Открытая организация"}
        tooltipText={"Любой спортсмен сможет присоединиться к организации без подтверждения"}
      />

      <Button className={"w-full max-w-[300px] mt-3 self-center"} isLoading={isLoading} type={"submit"}>
        Далее
      </Button>
    </form>
  )
}
