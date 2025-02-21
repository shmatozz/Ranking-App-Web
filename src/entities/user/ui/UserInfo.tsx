'use client';

import React, {useEffect} from "react";
import {Button, ChangePasswordForm, CodeInput, InfoField} from "@/shared/ui";
import clsx from "clsx";
import {useUserStore} from "@/entities/user";
import {formatDate} from "@/shared/utils";
import {updatePassword} from "@/shared/api/common";
import {useChangeContactsStore} from "@/features/change-contacts";

interface UserInfoProps {
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = (
  props
) => {
  const isLoading = useUserStore((state) => state.isLoading);
  const hasError = useUserStore((state) => state.hasError);
  const {
    isCodeSent, changeEmailRequested, errorMessage,
    code, setCode, rightCode, changeEmail
  } = useChangeContactsStore();
  const hasChangeError = useChangeContactsStore(state => state.hasError);
  const isChangeLoading = useChangeContactsStore(state => state.isLoading);

  const { user, getUserShortInfo } = useUserStore();

  const [inputPasswordVisible, setInputPasswordVisible] = React.useState(false);

  useEffect(() => {
    if (!user) getUserShortInfo();
  }, [getUserShortInfo, user]);

  useEffect(() => {
    if (code === rightCode && !isChangeLoading) changeEmail("user");
  }, [rightCode, code, changeEmail, isChangeLoading]);

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

      <InfoField
        title={"Email"} value={user?.email} isLoading={isLoading} type={"email"}
        editable onSubmit={changeEmailRequested} submitLoading={isChangeLoading}
      />

      {(isCodeSent || hasChangeError) && (
        <div>
          <CodeInput code={code} setCode={setCode}/>
          {hasChangeError && <p className="text-red-50 text-center">{errorMessage}</p>}
        </div>
      )}

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
