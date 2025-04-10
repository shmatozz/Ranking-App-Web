"use client";

import React, {useEffect} from "react";
import clsx from "clsx";
import {Button, ChangePasswordForm, Checkbox, CodeInput, InfoField} from "@/shared/ui";
import {useOrganizationStore} from "@/entities/organization";
import {updatePassword} from "@/shared/api/common";
import {useChangeContactsStore} from "@/features/change-contacts";
import {useWhoAmIStore} from "@/features/who-am-i";

interface OrganizationInfoProps {
  className?: string;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = (
  props
) => {
  const updateOrganizationOpenStatus = useOrganizationStore((state) => state.updateOrganizationOpenStatus);
  const isLoading = useOrganizationStore((state) => state.isLoading);
  const hasError = useOrganizationStore((state) => state.hasError);

  const { organization, getOrganizationInfo, requestCuratorStatus, curatorRequested } = useOrganizationStore();
  const {
    isCodeSent, changeEmailRequested, errorMessage,
    code, setCode, rightCode, changeEmail
  } = useChangeContactsStore();
  const hasChangeError = useChangeContactsStore(state => state.hasError);
  const isChangeLoading = useChangeContactsStore(state => state.isLoading);
  const { whoAmI} = useWhoAmIStore();

  const [inputPasswordVisible, setInputPasswordVisible] = React.useState(false);

  useEffect(() => {
    if (!organization) getOrganizationInfo();
  }, [getOrganizationInfo, organization]);

  useEffect(() => {
    if (code === rightCode && !isChangeLoading) changeEmail("organization");
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
      <InfoField title={"Название организации"} value={organization?.name} isLoading={isLoading}/>
      <InfoField
        title={"Email"} value={organization?.email} isLoading={isLoading}
        editable onSubmit={changeEmailRequested} submitLoading={isChangeLoading}
      />

      {(isCodeSent || hasChangeError) && (
        <div>
          <CodeInput code={code} setCode={setCode}/>
          {hasChangeError && <p className="text-red-50 text-center">{errorMessage}</p>}
        </div>
      )}

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
        <ChangePasswordForm onSubmit={updatePassword} onSuccess={() => setInputPasswordVisible(false)}/>
      )}

      {whoAmI && !whoAmI.curator && !curatorRequested && (
        <div className={"flex flex-col w-full items-center gap-2"}>
          <Button
            size={"S"} variant={"secondary"} className={"w-full max-w-[370px]"}
            onClick={() => requestCuratorStatus()}
          >
            <p className={"text-nowrap"}>Запросить роль куратора</p>
          </Button>
        </div>
      )}
    </div>
  )
}
