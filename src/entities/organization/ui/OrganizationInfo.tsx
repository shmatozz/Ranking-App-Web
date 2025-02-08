import React, {useEffect} from "react";
import clsx from "clsx";
import {Checkbox, InfoField} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {useOrganizationStore} from "@/entities/organization";

interface OrganizationInfoProps {
  className?: string;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = (
  props
) => {
  const session = useSession();
  const organization = useOrganizationStore((state) => state.organization);
  const getOrganizationShortInfo = useOrganizationStore((state) => state.getOrganizationShortInfo);
  const isLoading = useOrganizationStore((state) => state.isLoading);
  const hasError = useOrganizationStore((state) => state.hasError);

  useEffect(() => {
    if (!organization) {
      if (session.data) getOrganizationShortInfo(session.data.user.token);
    }
  }, [getOrganizationShortInfo, session, organization])

  if (hasError) {
    return (
      <div className={"flex h-full w-full justify-center items-center"}>
        Что-то пошло не так...
      </div>
    )
  }

  return (
    <div className={clsx("flex flex-col w-full max-w-[500px] gap-4", props.className)}>
      <InfoField title={"Название организации"} value={organization?.name} isLoading={isLoading}/>
      <InfoField title={"Email"} value={organization?.email} isLoading={isLoading} editable/>

      {!isLoading && organization && (
        <Checkbox
          name={"isOpen"} text={"Открытая организация"} checked={organization?.isOpen}
          tooltipText={"Любой спортсмен сможет присоединиться к организации без подтверждения"}
        />
      )}
    </div>
  )
}