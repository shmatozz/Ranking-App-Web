'use client';

import React from "react";
import clsx from "clsx";
import {Button, TextInput} from "@/shared/ui";
import {useSession} from "next-auth/react";

interface ChangePasswordFormProps {
  onSubmit: (params: {oldPassword: string, newPassword: string}, token: string) => Promise<void>;
  onSuccess?: () => void;
  className?: string;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (
  props
) => {
  const session = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    props.onSubmit(
      {
        oldPassword: formData.get("oldPassword")! as string,
        newPassword: formData.get("newPassword")! as string
      },
      session.data!.user.token
    )
      .then(() => { if (props.onSuccess) props.onSuccess() })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className={clsx("flex flex-col gap-2 w-full max-w-[350px]", props.className)}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className={"px-6 py-2 rounded-2xl bg-red-5 text-center text-bodyS_medium text-red-70"}>
          {error}
        </div>
      )}

      <TextInput
        name={"oldPassword"} title={"Старый пароль"}
        type={"password"} animatedLabel={false} inputSize={"S"}
        className={"w-full max-w-[350px]"}
      />

      <TextInput
        name={"newPassword"} title={"Новый пароль"}
        type={"password"} animatedLabel={false} inputSize={"S"}
        className={"w-full max-w-[350px]"}
      />

      <Button
        size={"S"} variant={"primary"} className={"w-full max-w-[350px]"}
        type={"submit"} isLoading={isLoading}
      >
        Сохранить
      </Button>
    </form>
  )
}
