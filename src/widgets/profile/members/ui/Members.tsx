"use client";

import React, {useEffect} from "react";
import {Button} from "@/shared/ui";
import {useMembersStore} from "@/widgets/profile";
import {UserParticipantCard} from "@/entities/user";
import {SendInviteForm} from "@/features/organization-join";
import {useOrganizationStore} from "@/entities/organization";

export const Members: React.FC = ({
}) => {
  const { members, getMembers, isLoading} = useMembersStore();
  const isOrgLoading = useOrganizationStore((state) => state.isLoading);

  const [inputUserEmailVisible, setInputUserEmailVisible] = React.useState(false);

  useEffect(() => {
    if (!members && !isLoading && !isOrgLoading) getMembers();
  }, [getMembers, isLoading, isOrgLoading, members]);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Участники</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* STATS */}
      <div className={"flex flex-col w-full gap-1"}>
        <div className={"flex flex-row w-full items-center gap-4"}>
          <p className={"w-full text-bodyS_regular text-base-95 text-center align-middle xs:text-bodyM_regular"}>Всего участников</p>
          <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Средний рейтинг</p>
          <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Средняя активность</p>
        </div>

        {!isLoading && members && (
          <div className={"flex flex-row w-full gap-1"}>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>{members.length != 0 ? members.length : "-"}</p>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>{members.length != 0 ? 1305 : "-"}</p>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>{members.length != 0 ? 25 : "-"}</p>
          </div>
        )}

        {isLoading && (
          <div className={"flex flex-row w-full gap-1 text-h5_bold text-base-5"}>
            <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>50</p></div>
            <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>1305</p></div>
            <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>25</p></div>
          </div>
        )}
      </div>

      {/* PARTICIPANTS */}
      <div className={"flex flex-col w-full gap-2 items-center"}>
        <div className={"flex flex-row w-full gap-[10px] px-4"}>
          <div className={"min-w-9"}/>
          <p className={"text-bodyS_medium text-base-95 w-full xs:text-bodyM_medium"}>ФИО</p>
          <p
            className={"text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium"}>Рейтинг</p>
          <p className={"text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium"}>Старты</p>
        </div>

        <div className={"h-[2px] w-full bg-base-5"}/>

        {!isLoading && members && members.map((member) => (
          <UserParticipantCard key={member.id} user={member}/>
        ))}

        {!isLoading && members && members.length == 0 && (
          <p className={"w-full h-[48px] text-center content-center text-bodyM_regular text-base-95"}>В вашей организации нет участников</p>
        )}

        {isLoading && Array(5).fill(0).map((_item, index) => (
          <UserParticipantCard key={index} isLoading={isLoading}/>
        ))}

        {!inputUserEmailVisible && !isLoading && (
          <Button
            size={"S"} variant={"secondary"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
            onClick={() => setInputUserEmailVisible(true)}
          >
            Добавить участника
          </Button>
        )}

        {inputUserEmailVisible && (
          <SendInviteForm
            onSuccess={() => setInputUserEmailVisible(false)}
            onCancel={() => setInputUserEmailVisible(false)}
          />
        )}
      </div>
    </div>
  )
}
