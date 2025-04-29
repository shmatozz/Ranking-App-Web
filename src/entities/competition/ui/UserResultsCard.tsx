import React from "react";
import {CompetitionResult} from "@/widgets/profile";
import clsx from "clsx";
import {getAgeRange} from "@/shared/lib";
import {formatTime} from "@/shared/utils";

interface UserResultsCardProps {
  result?: CompetitionResult,
  onClick?: () => void,
}

export const UserResultsCard: React.FC<UserResultsCardProps> = (
  props,
) => {
  if (!props.result) {
    return (<div className={"w-full h-[150px] rounded-2xl animate-pulse bg-base-5"}/>)
  }

  return (
    <div
      className={"flex flex-col w-full h-fit px-8 py-4 gap-2 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl"}
      onClick={props.onClick}
    >
      <label className={"text-bodyM_medium text-blue-90 xs:text-h5"}>{props.result.competitionName}</label>

      <div className={"flex flex-col gap-1 px-2"}>
        <div className={"flex flex-row w-full gap-2"}>
          <p className={"text-bodyM_medium text-base-95 w-full"}>Категория</p>
          <p className={"text-bodyM_medium text-base-95"}>Время</p>
        </div>

        {props.result.events.map((swim, index) => (
          <div
            key={index}
            className="relative flex flex-row h-fit w-full gap-1 px-2 py-1 items-center overflow-hidden group"
          >
            <div
              className={clsx(
                "rounded-[8px] absolute right-0 top-0 h-full bg-gradient-to-l transition-all duration-500 ease-in-out w-1/5 group-hover:w-full",
                swim.place == 1 ?
                  "from-gold to-transparent" :
                  (swim.place == 2 ?
                    "from-silver to-transparent" :
                      (swim.place == 3 ? "from-bronze to-transparent" : "from-nonPrize to-transparent")
                  ),
              )}
            />

            <p className="text-bodyM_regular text-base-80 w-full relative z-10">
              {`${swim.gender == "MALE" ? "Мужчины" : "Женщины"}, ${getAgeRange(swim.ageFrom, swim.ageTo)}, ${swim.distance}м`}
            </p>

            <p className="text-bodyM_regular text-base-95 relative z-10">
              {formatTime(swim.time)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
