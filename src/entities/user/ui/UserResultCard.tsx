import React from "react";
import {ParticipantFull} from "@/entities/user";
import clsx from "clsx";

interface UserParticipantCardProps {
  user?: ParticipantFull;
  isLoading?: boolean;
}

export const UserResultCard: React.FC<UserParticipantCardProps> = (
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
      className={"flex flex-row relative h-fit min-h-[48px] w-full items-center px-4 gap-[10px] text-bodyM_regular text-base-95"}
    >
      <p className={"w-full max-w-[40px] text-center z-10"}>
        {props.user.place}
      </p>

      <p className={"w-full z-10"}>
        {`${props.user.lastName} ${props.user.firstName}${props.user.middleName ? " " + props.user.middleName : ""}`}
      </p>

      <p className={"hidden w-full max-w-[100px] text-center xs:block z-10"}>
        {`${props.user.time}`}
      </p>

      <p className={"hidden w-full max-w-[120px] text-center xs:block z-10"}>
        {props.user.points}
      </p>

      <div
        className={clsx(
          "rounded-[8px] absolute left-0 top-0 h-full bg-gradient-to-r transition-all duration-500 ease-in-out w-1/6 z-0 group-hover:w-full",
          props.user.place == 1 ?
            "from-gold to-transparent" :
            (props.user.place == 2 ?
                "from-silver to-transparent" :
                (props.user.place == 3 ? "from-bronze to-transparent" : "from-nonPrize to-transparent")
            ),
        )}
      />
    </div>
  )
}
