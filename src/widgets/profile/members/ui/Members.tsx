"use client";

import React, {useEffect} from "react";
import {Button} from "@/shared/ui";
import {useMembersStore} from "@/widgets/profile";
import {UserMemberCard, UserParticipantCard} from "@/entities/user";
import {SendInviteForm, AddUserForm, CreateUserForm} from "@/features/organization-join";
import {useOrganizationStore} from "@/entities/organization";
import {useWhoAmIStore} from "@/features/who-am-i";
import {getAvgRating} from "@/shared/lib";

export const Members= () => {
  const {
    members, isLoading,
    getMembers, addUserWithOutInvite, createUser,
    addUserError, createUserError, clearErrors
  } = useMembersStore();

  const { organization, getOrganizationInfo } = useOrganizationStore();
  const { whoAmI} = useWhoAmIStore();

  const [inputUserEmailVisible, setInputUserEmailVisible] = React.useState(false);
  const [addUserVisible, setAddUserVisible] = React.useState(false);
  const [createUserVisible, setCreateUserVisible] = React.useState(false);

  useEffect(() => {
    if (!organization) getOrganizationInfo()
    else getMembers();
  }, [organization, getOrganizationInfo, getMembers]);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Участники</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* STATS */}
      <div className={"flex flex-col w-full gap-1"}>
        <div className={"flex flex-row w-full items-center gap-4"}>
          <p className={"w-full text-bodyS_regular text-base-95 text-center align-middle xs:text-bodyM_regular"}>Всего участников</p>
          <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Средний рейтинг</p>
        </div>

        {!isLoading && members && (
          <div className={"flex flex-row w-full gap-1"}>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>{members.length != 0 ? members.length : "-"}</p>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>{members.length != 0 ? getAvgRating(members) : "-"}</p>
          </div>
        )}

        {isLoading && (
          <div className={"flex flex-row w-full gap-1 text-h5_bold text-base-5"}>
            <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>50</p></div>
            <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>1305</p></div>
          </div>
        )}
      </div>

      {/* PARTICIPANTS */}
      <div className={"flex flex-col w-full gap-2 items-center"}>
        <div className={"flex flex-row w-full gap-[10px] px-4"}>
          <div className={"min-w-9"}/>
          <p className={"text-bodyS_medium text-base-95 w-full xs:text-bodyM_medium"}>ФИО</p>
          <p className={"text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium"}>Рейтинг</p>
        </div>

        <div className={"h-[2px] w-full bg-base-5"}/>

        {!isLoading && members && members.map((member) => (
          <UserMemberCard key={member.email} user={member}/>
        ))}

        {!isLoading && members && members.length == 0 && (
          <p className={"w-full h-[48px] text-center content-center text-bodyM_regular text-base-95"}>В вашей организации нет участников</p>
        )}

        {isLoading && Array(5).fill(0).map((_item, index) => (
          <UserParticipantCard key={index} isLoading={isLoading}/>
        ))}

        {!inputUserEmailVisible && !isLoading && (
          <Button
            size={"S"} variant={"secondary"} rightIcon={"plus"} className={"w-full max-w-[370px]"}
            onClick={() => setInputUserEmailVisible(true)}
          >
            <p className={"text-nowrap"}>Добавить по приглашению</p>
          </Button>
        )}

        {inputUserEmailVisible && (
          <SendInviteForm
            onSuccess={() => setInputUserEmailVisible(false)}
            onCancel={() => setInputUserEmailVisible(false)}
          />
        )}

        {whoAmI && whoAmI.curator && (
          <div className={"flex flex-col w-full items-center gap-2"}>
            <p className={"text-bodyM_regular text-base-95 text-center"}>Вы - куратор. Вам доступен следующий функционал:</p>
            <Button
              size={"S"} variant={"secondary"} className={"w-full max-w-[370px]"}
              onClick={() => setAddUserVisible(true)}
            >
              <p className={"text-nowrap"}>Добавить без приглашения</p>
            </Button>

            <Button
              size={"S"} variant={"secondary"} className={"w-full max-w-[370px]"}
              onClick={() => setCreateUserVisible(true)}
            >
              <p className={"text-nowrap"}>Зарегистрировать участника</p>
            </Button>

            {addUserVisible && (
              <AddUserForm
                byInvite={false}
                onSubmit={(data: FormData) => addUserWithOutInvite(data, () => setAddUserVisible(false))}
                onCancel={() => {
                  setAddUserVisible(false);
                  clearErrors();
                }}
                error={addUserError}
              />
            )}

            {createUserVisible && (
              <CreateUserForm
                onSubmit={(data: FormData) => createUser(data, () => setCreateUserVisible(false))}
                onCancel={() => {
                  setCreateUserVisible(false);
                  clearErrors();
                }}
                error={createUserError}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
