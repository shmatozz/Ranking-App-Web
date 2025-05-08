'use client';

import React, { useState } from "react";
import clsx from "clsx";
import { Button, TextInput } from "@/shared/ui";
import { z } from "zod";

interface ChangePasswordFormProps {
  onSubmit: (params: { oldPassword: string; newPassword: string }) => Promise<void>;
  onSuccess?: () => void;
  className?: string;
}

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Старый пароль обязателен"),
    newPassword: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
    confirmPassword: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = passwordSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    props.onSubmit(
      {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      }
    )
      .then(() => { if (props.onSuccess) props.onSuccess() })
      .catch((e) => {
        if (e.message.includes("не должен совпадать")) {
          setErrors({ newPassword: e.message })
        } else if (e.message.includes("старый")) {
          setErrors({ oldPassword: e.message })
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form className={clsx("flex flex-col gap-2 w-full max-w-[350px]", props.className)} onSubmit={handleSubmit}>
      {errors.general && (
        <div className="px-6 py-2 rounded-2xl bg-red-5 text-center text-bodyS_medium text-red-70">
          {errors.general}
        </div>
      )}

      <TextInput
        name="oldPassword"
        title="Старый пароль"
        type="password"
        animatedLabel={false}
        inputSize="S"
        className="w-full max-w-[350px]"
        value={formData.oldPassword}
        onChange={handleChange}
        errorMessage={errors.oldPassword}
      />

      <TextInput
        name="newPassword"
        title="Новый пароль"
        type="password"
        animatedLabel={false}
        inputSize="S"
        className="w-full max-w-[350px]"
        value={formData.newPassword}
        onChange={handleChange}
        errorMessage={errors.newPassword}
      />

      <TextInput
        name="confirmPassword"
        title="Повторите новый пароль"
        type="password"
        animatedLabel={false}
        inputSize="S"
        className="w-full max-w-[350px]"
        value={formData.confirmPassword}
        onChange={handleChange}
        errorMessage={errors.confirmPassword}
      />

      <Button size="S" variant="primary" className="w-full max-w-[350px]" type="submit" isLoading={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
