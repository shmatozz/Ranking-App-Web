import React from "react";
import {Button, TextInput} from "@/shared/ui";
import {signUpOrganization} from "@/shared/lib";

export const SignUpOrganizationForm = () => {
  return (
    <form
      className={"flex flex-col gap-3 w-full"}
      action={signUpOrganization}
    >
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
