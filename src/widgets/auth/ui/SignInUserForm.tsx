import React from "react";
import {Button, TextInput,} from "@/shared/ui";
import Link from "next/link";
import {submit} from "@/shared/lib";

export const SignInUserForm = () => {
  return (
    <form
      className={"flex flex-col gap-3 w-full"}
      action={submit}
    >
      <TextInput
        name="email"
        required
        title={"Email"}
        type={"email"}
        autoComplete={"email"}
      />

      <TextInput
        name="password"
        required
        title={"Пароль"}
        type={"password"}
        autoComplete={"current-password"}
      />

      <Link href={"/recovery"} className={"self-end -mt-3"}>
        <Button size={"S"} variant={"tertiary"}>
          Забыли пароль?
        </Button>
      </Link>

      <Button className={"w-full max-w-[300px] mt-3 self-center"} type="submit">
        Вход
      </Button>
    </form>
  )
}
