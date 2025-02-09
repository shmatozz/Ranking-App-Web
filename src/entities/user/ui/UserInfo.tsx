import React, {useEffect} from "react";
import {InfoField} from "@/shared/ui";
import clsx from "clsx";
import {useSession} from "next-auth/react";
import {useUserStore} from "@/entities/user";

interface UserInfoProps {
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = (
  props
) => {
  const session = useSession();
  const user = useUserStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const isLoading = useUserStore((state) => state.isLoading);
  const hasError = useUserStore((state) => state.hasError);
  const updateEmail = useUserStore((state) => state.updateEmail);

  useEffect(() => {
    if (!user) {
      if (session.data) getUserInfo(session.data.user.token);
    }
  }, [getUserInfo, session, user])

  if (hasError) {
    return (
      <div className={"flex h-full w-full justify-center items-center"}>
        Что-то пошло не так...
      </div>
    )
  }

  return (
    <div className={clsx("flex flex-col w-full max-w-[500px] gap-4", props.className)}>
      <InfoField title={"Фамилия"} value={user?.lastName} isLoading={isLoading}/>
      <InfoField title={"Имя"} value={user?.firstName} isLoading={isLoading}/>
      <InfoField title={"Отчество"} value={user?.middleName} isLoading={isLoading}/>
      <InfoField title={"Дата рождения"} value={user?.birthDate} isLoading={isLoading}/>
      <InfoField title={"Email"} value={user?.email} isLoading={isLoading} type={"email"} editable onSubmit={(email: string) => {
        updateEmail(email, session.data!.user.token);
      }}/>
      {/*<InfoField title={"Номер телефона"} value={user?.phone} isLoading={isLoading} editable/>*/}
      <InfoField title={"Экстренный телефон"} value={user?.emergencyPhone} isLoading={isLoading}/>
      <InfoField title={"Пол"} value={user?.gender == "MALE" ? "Мужской" : (user?.gender == "FEMALE" ? "Женский" : undefined)} isLoading={isLoading}/>
    </div>
  )
}