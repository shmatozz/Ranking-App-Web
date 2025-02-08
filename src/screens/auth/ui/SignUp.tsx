'use client';

import React from "react";
import clsx from "clsx";
import {SignUpOrganizationForm, SignUpUserForm} from "@/widgets/auth";
import {Button} from "@/shared/ui";
import Link from "next/link";

export const SignUp = () => {
  const [registrationState, setRegistrationState] = React.useState("user")

  return (
    <div
      className={clsx(
        "flex flex-col self-center items-center gap-3",
        "w-full max-w-[31.25rem] h-fit rounded-3xl px-[3.25rem] py-8",
        "bg-base-0 shadow-md"
      )}
    >
      <p className={"text-h4 text-base-95 text-center"}>
        Регистрация
      </p>

      <div
        className={"flex flex-col w-full h-9"}
      >
        <div className={"flex flex-row h-full w-full"}>
          <div
            className={"flex text-bodyM_regular text-base-95 h-full w-full items-center justify-center cursor-pointer"}
            onClick={() => setRegistrationState("user")}
          >
            Спортсмен
          </div>

          <div
            className={"flex text-bodyM_regular text-base-95 h-full w-full items-center justify-center cursor-pointer"}
            onClick={() => setRegistrationState("organization")}
          >
            Организация
          </div>
        </div>

        <div
          className={clsx(
            "h-[4px] w-1/2 bg-blue-50 transition-transform",
            registrationState == "organization" ? "translate-x-[100%]" : "transform-x-0"
            )}
        />
      </div>

      {
        registrationState == "user" && <SignUpUserForm/>
      }

      {
        registrationState == "organization" && <SignUpOrganizationForm/>
      }

      <Link href={"/sign-in"} className={"w-full max-w-[300px]"}>
        <Button className={"w-full"} variant={"tertiary"}>
          У меня есть аккаунт
        </Button>
      </Link>
    </div>
  )
}
