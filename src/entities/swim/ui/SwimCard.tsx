import React from "react";
import {Swim} from "@/entities/swim";
import clsx from "clsx";

interface SwimCardProps {
  swim: Swim;
  className?: string;
  children?: React.ReactNode;
}

export const SwimCard: React.FC<SwimCardProps> = (
  props
) => {
  return (
    <div
      className={clsx(
        "flex flex-row w-full h-fit px-8 py-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl bg-base-0 items-center gap-4",
        props.className
      )}
    >
      <div
        className={"flex flex-col w-full"}
      >
        <p className={"text-bodyM_medium text-base-95"}>
          {`${props.swim.distance}м, ${props.swim.ageCategory}`}
        </p>

        <p className={"text-bodyM_regular text-base-95"}>
          {`${props.swim.gender == "MALE" ? "Мужчины" : "Женщины"}, макс. очков: ${props.swim.maxPoints}, ${props.swim.startTime}-${props.swim.endTime}`}
        </p>
      </div>

      {props.children}
    </div>
  )
}
