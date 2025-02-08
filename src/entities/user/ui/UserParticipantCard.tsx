import React from "react";
import {User} from "@/entities/user";

interface UserParticipantCardProps {
  user: User;
}

export const UserParticipantCard: React.FC<UserParticipantCardProps> = (
  props
) => {
  return (
    <div className={"flex flex-row h-fit min-h-[48px] w-full items-center px-4 gap-[10px] text-bodyM_regular text-base-95"}>
      <div className={"min-w-9 h-9 rounded-full bg-base-5"}/>

      <p className={"w-full"}>
        {`${props.user.lastName} ${props.user.firstName} ${props.user.middleName}`}
      </p>

      <p className={"w-full max-w-[80px] text-center"}>
        1305
      </p>

      <p className={"w-full max-w-[80px] text-center"}>
        25
      </p>
    </div>
  )
}