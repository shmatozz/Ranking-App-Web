import React from "react";
import {Swim} from "@/entities/swim";
import clsx from "clsx";
import {getTime} from "@/shared/utils";
import {getAgeRange} from "@/shared/lib";

interface SwimCardProps {
  swim?: Swim | Omit<Swim, "eventUuid">;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SwimCard: React.FC<SwimCardProps> = (
  props
) => {
  if (!props.swim || props.isLoading) {
    return (
      <div
        className={clsx(
          "flex flex-row w-full h-fit px-6 py-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl bg-base-0 xs:px-8 items-center gap-4", props.className
        )}
      >
        <div className={"flex flex-col w-full gap-1"}>
          <p className={"loader"}>{"Дистанция заплыва м, возраст"}</p>
          <p className={"loader"}>{"Доп. информация про заплыв"}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        "flex flex-col w-full h-fit px-6 py-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl bg-base-0 items-center gap-4 xs:px-8 xs:flex-row",
        props.className
      )}
    >
      <div className={"flex flex-col w-full"}>
        <p className={"text-bodyM_medium text-base-95"}>
          {`${props.swim.distance}м, ${getAgeRange(props.swim.ageFrom, props.swim.ageTo)}`}
        </p>

        <p className={"text-bodyM_regular text-base-95"}>
          {`${props.swim.gender == "MALE" ? "Мужчины" : (props.swim.gender == "FEMALE" ? "Женщины" : "Общий")}; стиль - ${props.swim.style}; начало - ${getTime(new Date(props.swim.startTime))}`}
        </p>
      </div>

      {props.children}
    </div>
  )
}
