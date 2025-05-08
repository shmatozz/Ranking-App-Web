import React from "react";
import {Participant} from "@/entities/user";
import {ImageLoader} from "@/shared/ui";

interface UserParticipantCardProps {
  user?: Participant;
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
        <p className={"hidden w-full max-w-[80px] text-center bg-base-5 rounded-md animate-pulse xs:block"}>1305</p>
        <p className={"hidden w-full max-w-[120px] text-center bg-base-5 rounded-md animate-pulse xs:block"}>Любитель</p>
      </div>
    )
  }

  return (
    <div
      className={"flex flex-row h-fit min-h-[48px] w-full items-center px-4 gap-[10px] text-bodyM_regular text-base-95"}
    >
      {props.user.image ? (
        <div className={"hidden 2xs:block min-w-[36px] h-[36px] rounded-full bg-base-5 overflow-hidden"}>
          <ImageLoader imagePath={props.user.image}/>
        </div>
      ) : (
        <div className={"hidden 2xs:block min-w-[36px] h-[36px] rounded-full bg-base-5"}/>
      )}

      <p className={"w-full"}>
        {`${props.user.fullName}`}
      </p>

      <p className={"hidden w-full max-w-[80px] text-center xs:block"}>
        {`${props.user.rating}`}
      </p>

      <p className={"hidden w-full max-w-[120px] text-center xs:block"}>
        {props.user.category}
      </p>
    </div>
  )
}
