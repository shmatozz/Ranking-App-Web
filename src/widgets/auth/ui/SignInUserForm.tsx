'use client'

import React, {useState} from "react";
import {Button, TextInput,} from "@/shared/ui";
import Link from "next/link";
import {submit} from "@/shared/lib";
import {useRouter} from "next/navigation";

export const SignInUserForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const res = await submit(formData)

      if (!res) {
        router.replace("/profile");
      } else {
        setError(res == "Bad credentials." ? "Неверный пароль." : res);
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
