import React from "react";
import {SignInUserForm} from "@/widgets/auth";
import {Button} from "@/shared/ui";
import clsx from "clsx";
import Link from "next/link";
import {redirect, RedirectType} from "next/navigation";
import {auth} from "@/shared/lib";

export const SignIn = async () => {
  const session = await auth();
  if (session) redirect("/profile", RedirectType.replace);

  return (
    <div
      className={clsx(
        "flex flex-col self-center m-auto items-center gap-4",
        "w-full max-w-[31.25rem] h-fit rounded-3xl px-4 xs:px-[3.25rem] py-8",
        "bg-base-0 lg-md:shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)]"
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
