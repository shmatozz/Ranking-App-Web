"use client";

import React, {useEffect} from "react";
import {Button, TextInput} from "@/shared/ui";
import {useMembersStore} from "@/widgets/profile";
import {UserParticipantCard} from "@/entities/user/ui/UserParticipantCard";

export const Members: React.FC = ({
}) => {
  const members = useMembersStore((state) => state.members);
  const getMembers = useMembersStore((state) => state.getMembers);

  const [inputUserEmailVisible, setInputUserEmailVisible] = React.useState(false);

  useEffect(() => {
    getMembers();
  }, [getMembers]);
  
  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Участники</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* STATS */}
      <div className={"flex flex-row w-full gap-4"}>
        <div className={"flex flex-col w-full gap-1"}>
          <p className={"text-bodyM_regular text-base-95 text-center"}>Всего участников</p>
          <p className={"text-h5_bold text-blue-80 text-center"}>5</p>
        </div>

        <div className={"flex flex-col w-full gap-2"}>
          <p className={"text-bodyM_regular text-base-95 text-center"}>Средний рейтинг</p>
          <p className={"text-h5_bold text-blue-80 text-center"}>1305</p>
        </div>

        <div className={"flex flex-col w-full gap-2"}>
          <p className={"text-bodyM_regular text-base-95 text-center"}>Средняя активность</p>
          <p className={"text-h5_bold text-blue-80 text-center"}>25</p>
        </div>
      </div>

      {/* PARTICIPANTS */}
      <div className={"flex flex-col w-full gap-1 items-center"}>
        <div className={"flex flex-row w-full gap-[10px] px-4"}>
          <div className={"min-w-9"}/>
          <p className={"text-bodyM_medium text-base-95 w-full"}>ФИО</p>
          <p className={"text-bodyM_medium text-base-95 w-[100px] text-center"}>Рейтинг</p>
          <p className={"text-bodyM_medium text-base-95 w-[100px] text-center"}>Старты</p>
        </div>

        <div className={"h-[2px] w-full bg-base-5"}/>

        {members.map((member) => (
          <UserParticipantCard key={member.id} user={member}/>
        ))}

        {!inputUserEmailVisible && (
          <Button
            size={"S"} variant={"secondary"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
            onClick={() => setInputUserEmailVisible(true)}
          >
            Добавить участника
          </Button>
        )}

        {inputUserEmailVisible && (
          <div className={"flex flex-col gap-3 w-full max-w-[350px]"}>
            <TextInput title={"Email участника"} type={"email"} animatedLabel={false} inputSize={"S"} className={"w-full max-w-[350px]"}/>

            <Button
              size={"S"} variant={"primary"} className={"w-full max-w-[350px]"}
              onClick={() => setInputUserEmailVisible(false)}
            >
              Отправить приглашение
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}