"use client";

import React from "react";
import clsx from "clsx";
import {Button, ChangePasswordForm, Checkbox, InfoField} from "@/shared/ui";
import {updateOrganizationPassword, useOrganizationStore} from "@/entities/organization";

interface OrganizationInfoProps {
  className?: string;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = (
  props
) => {
  const organization = useOrganizationStore((state) => state.organization);
  const updateOrganizationOpenStatus = useOrganizationStore((state) => state.updateOrganizationOpenStatus);
  const isLoading = useOrganizationStore((state) => state.isLoading);
  const hasError = useOrganizationStore((state) => state.hasError);

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
      <InfoField title={"Название организации"} value={organization?.name} isLoading={isLoading}/>
      <InfoField title={"Email"} value={organization?.email} isLoading={isLoading} editable/>

      {!isLoading && organization && (
        <Checkbox
          name={"isOpen"} text={"Открытая организация"} checked={organization?.isOpen}
          tooltipText={"Любой спортсмен сможет присоединиться к организации без подтверждения"}
          onClick={updateOrganizationOpenStatus}
        />
      )}

      {!inputPasswordVisible && (
        <Button
          size={"S"} variant={"tertiary"} className={"w-full max-w-[350px]"}
          onClick={() => setInputPasswordVisible(true)}
        >
          Сменить пароль
        </Button>
      )}

      {inputPasswordVisible && (
        <ChangePasswordForm onSubmit={updateOrganizationPassword} onSuccess={() => setInputPasswordVisible(false)}/>
      )}
    </div>
  )
}
