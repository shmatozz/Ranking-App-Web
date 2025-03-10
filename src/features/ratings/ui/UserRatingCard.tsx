"use client";

import React from "react";
import clsx from "clsx";
import {Icon} from "@/shared/ui";
import {UserRating} from "@/features/ratings";

interface UserRatingCardProps {
  user: UserRating | undefined,
  position: number,
  isLoading?: boolean;
  short?: boolean,
  className?: string,
}

export const UserRatingCard: React.FC<UserRatingCardProps> = (
  props
) => {
  if (!props.user || props.isLoading) {
    return
  }

  if (props.position == 1) {
    return (
      <div className={clsx(
        "flex flex-row w-full px-4 gap-4 items-center h-[120px] bg-blue-80 rounded-2xl",
        props.className
      )}>
        {/* POSITION */}
        <p className={"text-h4 text-base-0 w-[70px] text-center"}>{props.position}</p>

        {/* PHOTO */}
        <div className={"w-[80px] h-[80px] rounded-full bg-base-5"}/>

        <div className={"flex flex-col"}>
          {/* NAME */}
          <p className={"text-h5 text-base-0 flex-1"}>{props.user.fullName}</p>

          <div className={"hidden flex-row large:flex"}>
            <p className={"text-bodyS_regular text-base-20 w-[35px] text-center"}>Пол</p>
            <p className={"text-bodyS_regular text-base-20 w-[70px] text-center"}>Возраст</p>
            <p className={"text-bodyS_regular text-base-20 w-[80px] text-center"}>Рейтинг</p>
            <p className={"text-bodyS_regular text-base-20 w-[70px] text-center"}>Старты</p>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#FFE79A"} size={16}/></div>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6C6C6"} size={16}/></div>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6A791"} size={16}/></div>
            <p className={"text-bodyS_regular text-base-20 w-[130px] text-center"}>Лучшее время</p>
          </div>

          <div className={"hidden flex-row large:flex"}>
            {/* GENDER */}
            <p className={"text-bodyM_regular text-base-0 w-[35px] text-center"}>{props.user.gender}</p>

            {/* AGE */}
            <p className={"text-bodyM_regular text-base-0 w-[70px] text-center"}>{props.user.age}</p>

            {/* RATING */}
            <p className={"text-bodyM_regular text-base-0 w-[80px] text-center"}>{props.user.rating}</p>

            {/* COMPETITIONS */}
            <p className={"text-bodyM_regular text-base-0 w-[70px] text-center"}>{props.user.starts}</p>

            {/* ACHIEVEMENTS */}
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>{props.user.firstPlaceCount}</p>
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>{props.user.secondPlaceCount}</p>
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>{props.user.thirdPlaceCount}</p>

            {/* BEST TIME */}
            <p className={"text-bodyM_regular text-base-0 w-[130px] text-center"}>
              {props.user.bestTime100 ? props.user.bestTime100 : "-"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(
      "flex flex-row w-full px-4 gap-4 items-center h-[50px]",
      props.className
    )}>
      {/* POSITION */}
      <p className={"text-bodyM_medium text-base-95 w-[80px] text-center"}>{props.position}</p>

      {/* PHOTO */}
      <div className={"w-[36px] h-[36px] rounded-full bg-base-5"}/>

      {/* NAME */}
      <p className={"text-bodyM_regular text-base-95 flex-1"}>{props.user.fullName}</p>

      <div className={"hidden flex-row gap-4 large:flex"}>
        {/* GENDER */}
        <p className={"text-bodyM_regular text-base-95 w-[35px] text-center"}>{props.user.gender}</p>

        {/* AGE */}
        <p className={"text-bodyM_regular text-base-95 w-[70px] text-center"}>{props.user.age}</p>

        {/* RATING */}
        <p className={"text-bodyM_regular text-base-95 w-[80px] text-center"}>{props.user.rating}</p>

        {/* COMPETITIONS */}
        <p className={"text-bodyM_regular text-base-95 w-[70px] text-center"}>{props.user.starts}</p>

        {/* ACHIEVEMENTS */}
        <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>{props.user.firstPlaceCount}</p>
        <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>{props.user.secondPlaceCount}</p>
        <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>{props.user.thirdPlaceCount}</p>

        {/* BEST TIME */}
        <p className={"text-bodyM_regular text-base-95 w-[130px] text-center"}>
          {props.user.bestTime100 ? props.user.bestTime100 : "-"}
        </p>
      </div>
    </div>
  )
}
