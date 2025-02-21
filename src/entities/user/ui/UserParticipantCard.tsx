import React from "react";
import {UserShort} from "@/entities/user";

interface UserParticipantCardProps {
  user?: UserShort;
  isLoading?: boolean;
}

export const UserParticipantCard: React.FC<UserParticipantCardProps> = (
  props
) => {
  if (props.isLoading || !props.user) {
    return (
      <div className={"flex flex-row h-fit min-h-[48px] w-full items-center px-4 gap-[10px] text-bodyM_regular text-base-5"}>
        <div className={"min-w-9 h-9 rounded-full bg-base-5 animate-pulse"}/>

        <p className={"w-full bg-base-5 rounded-md animate-pulse"}>{"Иванов Иван Иванович"}</p>
        <p className={"w-full max-w-[80px] text-center bg-base-5 rounded-md animate-pulse"}>1305</p>
        <p className={"w-full max-w-[80px] text-center bg-base-5 rounded-md animate-pulse"}>25</p>
      </div>
    )
  }

  return (
    <div
      className={"flex flex-row h-fit min-h-[48px] w-full items-center px-4 gap-[10px] text-bodyM_regular text-base-95"}>
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
