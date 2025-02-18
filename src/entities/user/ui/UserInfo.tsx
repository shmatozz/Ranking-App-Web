'use client';

import React from "react";
import {Button, ChangePasswordForm, InfoField} from "@/shared/ui";
import clsx from "clsx";
import {useUserStore} from "@/entities/user";
import {formatDate} from "@/shared/utils";
import {updatePassword} from "@/shared/api/common";

interface UserInfoProps {
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = (
  props
) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const hasError = useUserStore((state) => state.hasError);
  //const updateEmail = useUserStore((state) => state.updateEmail);

  const [inputPasswordVisible, setInputPasswordVisible] = React.useState(false);

  if (hasError) {
    return (
      <div className={"flex h-full w-full justify-center items-center"}>
        Что-то пошло не так...
      </div>
    )
  }

  return (
    <div className={clsx("flex flex-col w-full max-w-[500px] gap-4 items-center", props.className)}>
      <InfoField title={"Фамилия"} value={user?.lastName} isLoading={isLoading}/>
      <InfoField title={"Имя"} value={user?.firstName} isLoading={isLoading}/>
      <InfoField title={"Отчество"} value={user?.middleName} isLoading={isLoading}/>
      <InfoField title={"Дата рождения"} value={formatDate(user?.birthDate)} isLoading={isLoading}/>
      <InfoField title={"Email"} value={user?.email} isLoading={isLoading} type={"email"} editable/>
      {/*<InfoField title={"Номер телефона"} value={user?.phone} isLoading={isLoading} editable/>*/}
      <InfoField title={"Экстренный телефон"} value={user?.emergencyPhone} isLoading={isLoading}/>
      <InfoField title={"Пол"} value={user?.gender == "MALE" ? "Мужской" : (user?.gender == "FEMALE" ? "Женский" : undefined)} isLoading={isLoading}/>

      {!inputPasswordVisible && (
        <Button
          size={"S"} variant={"tertiary"} className={"w-full max-w-[350px]"}
          onClick={() => setInputPasswordVisible(true)}
        >
          Сменить пароль
        </Button>
      )}

      {inputPasswordVisible && (
        <ChangePasswordForm onSubmit={updatePassword} onSuccess={() => setInputPasswordVisible(false)}/>
      )}
    </div>
  )
}
