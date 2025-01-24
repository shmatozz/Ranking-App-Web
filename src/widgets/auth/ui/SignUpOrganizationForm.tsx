import React from "react";
import {TextInput} from "@/shared/ui";

export const SignUpOrganizationForm = () => {
  return (
    <form className={"flex flex-col gap-3 w-full"}>
      <TextInput
        required
        title={"Название организации"}
        type={"text"}
      />

      <TextInput
        required
        title={"E-mail"}
        type={"email"}
      />

      <TextInput
        required
        title={"Контактный номер организации"}
        type={"tel"}
      />

      <TextInput
        required
        title={"Пароль"}
        type={"password"}
      />

      <TextInput
        required
        title={"Повторите пароль"}
        type={"password"}
      />
    </form>
  )
}
