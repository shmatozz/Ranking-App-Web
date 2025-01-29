'use client';

import React from "react";
import clsx from "clsx";
import {Button, CodeInput, TextInput} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {verifyEmail} from "@/screens/auth/api/verify-email";

export const Recovery = () => {
  const router = useRouter();
  const [state, setState] = React.useState<"email-input" | "code-sent" | "new password">("email-input");
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [correctCode, setCorrectCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleSendCode = async () => {
    setState("code-sent");
    try {
      verifyEmail(email).then((response) => {
        console.log(response)
        setCorrectCode(response.verificationCode);
      });
    } catch (error) {
      console.error("Ошибка при отправке кода", error);
      setState("email-input");
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (correctCode == code) {
        setState("new password");
      }
    } catch (error) {
      console.error("Ошибка при проверке кода", error);
      setState("code-sent");
    }
  };

  const handlePasswordChange = async () => {
    setState("new password");
    try {
      // updatePassword(email).then((response) => {
      //   console.log(response)
      //   setCorrectCode(response.verificationCode);
      // });
    } catch (error) {
      console.error("Ошибка при проверке кода", error);
      setState("code-sent"); // Вернуть в состояние "code-sent" для повторной попытки
    }
  };

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

      <TextInput
        type={"email"} required
        title={"Е-mail"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state !== "email-input"}
      />

      {state === "code-sent" && (
        <CodeInput code={code} setCode={setCode} />
      )}

      {state === "new password" && (
        <div className={"w-full"}>
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
          } else if (state === "code-sent") {
            handleVerifyCode();
          } else if (state === "new password") {
            handlePasswordChange();
          }
        }}
        disabled={(state == "email-input" && email.length == 0) || (state == "code-sent" && code.length == 0) || (state == "new password" && (password != passwordConfirm || password.length < 8))}
      >
        {state === "email-input"
          ? "Отправить код"
          : state === "code-sent"
            ? "Подтвердить"
            : "Сменить пароль"}
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
