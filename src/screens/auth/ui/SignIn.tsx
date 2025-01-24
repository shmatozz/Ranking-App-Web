import React from "react";
import {SignInUserForm} from "@/widgets/auth";
import {Button} from "@/shared/ui";
import clsx from "clsx";
import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const SignIn = async () => {
  const cookieStore = await cookies();
  if (cookieStore.get("token")) redirect("/profile");

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-4",
        "w-full max-w-[31.25rem] h-fit rounded-3xl px-[3.25rem] py-8",
        "bg-base-0 shadow-md"
      )}
    >
      <p className={"text-h4 text-base-95 text-center"}>
        Вход
      </p>

      <SignInUserForm />

      <Link href={"/sign-up"} className={"w-full max-w-[300px]"}>
        <Button className={"w-full"} variant={"tertiary"}>
          Регистрация
        </Button>
      </Link>
    </div>
  )
}
