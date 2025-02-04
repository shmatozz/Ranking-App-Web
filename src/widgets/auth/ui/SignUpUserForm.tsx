'use client';

import React, {useState} from "react";
import {Button, Radio, TextInput} from "@/shared/ui";
import {signUp} from "@/shared/lib";
import {useRouter} from "next/navigation";

export const SignUpUserForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append("gender", gender);

    try {
      const res = await signUp(formData)

      console.log(res);

      if (!res) {
        router.replace("/confirm");
      } else {
        setError(res);
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.log("LOGGED", e);
    }  finally {
      setIsLoading(false);
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
        title={"Экстренный номер"}
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

      <div className="flex flex-col w-full gap-[0px]">
        <label
          className={"flex flex-row gap-1 w-full text-bodyS_regular text-base-40"}
        >
          {"Пол"}
          <p className={"text-red-50"}>*</p>
        </label>

        <div className={"flex flex-row w-full gap-8 justify-center"}>
          <Radio checked={gender == "MALE"} onClick={() => setGender("MALE")} text={"Мужской"}/>
          <Radio checked={gender == "FEMALE"} onClick={() => setGender("FEMALE")} text={"Женский"}/>
        </div>
      </div>

      <Button className={"w-full max-w-[300px] mt-3 self-center"} isLoading={isLoading} type={"submit"}>
        Далее
      </Button>
    </form>
  )
}
