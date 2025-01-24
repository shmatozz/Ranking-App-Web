import React from "react";
import clsx from "clsx";
import {Button, CodeInput} from "@/shared/ui";
import {auth} from "@/shared/lib";
import {redirect, RedirectType} from "next/navigation";

export const Confirm = async () => {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/sign-up", RedirectType.replace);

  console.log("FROM CONFIRM", session.user.email);

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-4",
        "w-full max-w-[40rem] h-fit rounded-3xl px-[3.25rem] py-8",
        "bg-base-0 shadow-md"
      )}
    >
      <p className={"text-h4 text-base-95 text-center"}>
        Подтверждение
      </p>

      <CodeInput/>

      <Button
        className={"w-full max-w-[300px]"}
        variant={"primary"}
      >
        Зарегестрироваться
      </Button>
    </div>
  )
}
