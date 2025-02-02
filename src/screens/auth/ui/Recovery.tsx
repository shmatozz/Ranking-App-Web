'use client';

import React, {useEffect} from "react";
import clsx from "clsx";
import {Button, TextInput} from "@/shared/ui";
import {useRouter, useSearchParams} from "next/navigation";
import {updatePassword, verifyEmail, verifyToken} from "@/screens/auth/api/verify-email";

export const Recovery = () => {
  const params = useSearchParams()
  const router = useRouter();
  const [state, setState] = React.useState<"email-input" | "new password">("email-input");
  const [validating, setValidating] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  useEffect(() => {
    if (params.has("token")) {
      setValidating(true);
      verifyToken(params.get("token")!)
        .then((verified) => {
          if (verified) {
            setState("new password");
            setValidating(false);
          }
        });
    }
  }, [params]);

  const handleSendCode = () => {
    try {
      verifyEmail(email).then((response) => {
        console.log(response)
      });
    } catch (error) {
      console.error("Ошибка при отправке кода", error);
      setState("email-input");
    }
  };

  const handlePasswordChange = () => {
    setState("new password");
    try {
      updatePassword(password, params.get("token")!)
        .then((response) => {
          if (response.status === 200) {
            router.replace("/sign-in")
          }
        })
    } catch (error) {
      console.error("Ошибка при проверке кода", error);
    }
  };

  if (validating) {
    return null
  }

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-4",
        "w-full max-w-[40rem] h-fit rounded-3xl px-[3.25rem] py-8",
        "bg-base-0 shadow-md"
      )}
    >
      <p className={"text-h4 text-base-95 text-center"}>
        Восстановление пароля
      </p>

      {state == "email-input" &&
        (
          <TextInput
            type={"email"} required
            title={"Е-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state !== "email-input"}
          />
        )
      }

      {state === "new password" && (
        <div className={"flex flex-col w-full gap-1"}>
          <TextInput
            type={"password"} required
            title={"Пароль"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={"w-full"}
            autoComplete={"off"}
          />

          <TextInput
            type={"password"} required
            title={"Повторите пароль"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={"w-full"}
            autoComplete={"off"}
          />
        </div>
      )}

      <Button
        className={"w-full max-w-[300px] mt-2"}
        onClick={() => {
          if (state === "email-input") {
            handleSendCode();
          } else if (state === "new password") {
            handlePasswordChange();
          }
        }}
        disabled={(state == "email-input" && email.length == 0) || (state == "new password" && (password != passwordConfirm || password.length < 8))}
      >
        {state === "email-input"
          ? "Отправить код"
          : "Сменить пароль"
        }
      </Button>

      <Button
        className={"w-full max-w-[300px]"}
        size={"S"}
        variant={"tertiary"}
        onClick={() => {
          router.back();
        }}
      >
        Назад
      </Button>
    </div>
  );
};
