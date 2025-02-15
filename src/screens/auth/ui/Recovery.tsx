'use client';

import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { Button, TextInput } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyToken } from "@/screens/auth/api/verify-email";
import { handlePasswordChange, handleSendCode } from "@/screens/auth/model/recovery.actions";

export const Recovery = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<"email-input" | "new password" | "validate">(
    params.has("token") ? "validate" : "email-input"
  );

  const [form, setForm] = useState({ email: "", password: "", passwordConfirm: "" });
  const [feedback, setFeedback] = useState<{ error: string | null; message: string | null }>({ error: null, message: null });
  const [isLoading, setIsLoading] = useState(false);

  // Handle token verification
  useEffect(() => {
    const token = params.get("token");
    if (token) {
      verifyToken(token)
        .then((verified) => {
          if (verified) {
            setState("new password");
          } else {
            setFeedback({ error: "Неверный токен, проверьте ссылку на указанной почте", message: null });
          }
        });
    }
  }, [params]);

  // Form input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submission handler
  const handleSubmit = useCallback(() => {
    setIsLoading(true);
    setFeedback({ error: null, message: null });

    if (state === "email-input") {
      handleSendCode(form.email)
        .then((response) => {
          if (response.status == 200) {
            setFeedback({ error: null, message: "Дальнейшие действия отправлены на указанную почту" });
          } else {
            setFeedback({ error: response.msg, message: null })
          }
        })
        .finally(() => setIsLoading(false));
    } else if (state === "new password") {
      handlePasswordChange(form.password, params)
        .then((response) => {
          if (response.status === 200) router.replace("/sign-in");
          else setFeedback({ error: response.msg, message: null });
        })
        .finally(() => setIsLoading(false));
    }
  }, [state, form, params, router]);

  return (
    <div className={clsx("flex flex-col m-auto items-center gap-4", "w-full max-w-[40rem] h-fit rounded-3xl px-[3.25rem] py-8", "bg-base-0 container-shadow")}>
      <p className="text-h4 text-base-95 text-center">Восстановление пароля</p>

      {feedback.error && <div className="px-6 py-2 rounded-2xl bg-red-5 text-center text-red-70">{feedback.error}</div>}
      {feedback.message && <div className="px-6 py-2 rounded-2xl bg-green-5 text-center text-green-90">{feedback.message}</div>}

      {state === "email-input" && (
        <TextInput type="email" required title="E-mail" name="email" value={form.email} onChange={handleChange} disabled={state !== "email-input"} />
      )}

      {state === "validate" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-h5 text-base-95 text-center">Проверка токена</p>
          <div className="h-10 w-10 border-4 border-transparent border-r-blue-50 rounded-full animate-spin" />
        </div>
      )}

      {state === "new password" && (
        <div className="flex flex-col w-full gap-1">
          <TextInput type="password" required title="Пароль" name="password" value={form.password} onChange={handleChange} className="w-full" autoComplete="off" />
          <TextInput type="password" required title="Повторите пароль" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} className="w-full" autoComplete="off" />
        </div>
      )}

      {state !== "validate" && (
        <div className="flex flex-col w-full items-center gap-4">
          <Button
            className="w-full max-w-[300px] mt-2"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (state === "email-input" && form.email.length === 0) ||
              (state === "new password" && (form.password !== form.passwordConfirm || form.password.length < 8))
            }
          >
            {state === "email-input" ? "Отправить код" : "Сменить пароль"}
          </Button>

          <Button className="w-full max-w-[300px]" size="S" variant="tertiary" onClick={() => router.back()}>
            Назад
          </Button>
        </div>
      )}
    </div>
  );
};
