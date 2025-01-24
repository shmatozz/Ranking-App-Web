import React from "react";
import {Button, TextInput} from "@/shared/ui";
import {signUp} from "@/shared/lib";

export const SignUpUserForm = () => {
  return (
    <form
      className={"flex flex-col gap-3 w-full"}
      action={signUp}
    >
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
