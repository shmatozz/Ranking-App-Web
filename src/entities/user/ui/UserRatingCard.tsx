"use client";

import React from "react";
import {User} from "@/entities/user";
import clsx from "clsx";
import {getAge} from "@/shared/utils";
import {Icon} from "@/shared/ui";

interface UserRatingCardProps {
  user: User | undefined,
  isLoading?: boolean;
  first?: boolean,
  short?: boolean,
  className?: string,
}

export const UserRatingCard: React.FC<UserRatingCardProps> = (
  props
) => {
  if (!props.user || props.isLoading) {
    return
  }

  if (props.first) {
    return (
      <div className={clsx(
        "flex flex-row w-full px-4 gap-4 items-center h-[120px] bg-blue-80 rounded-2xl",
        props.className
      )}>
        {/* POSITION */}
        <p className={"text-h4 text-base-0 w-[70px] text-center"}>1</p>

        {/* PHOTO */}
        <div className={"w-[80px] h-[80px] rounded-full bg-base-5"}/>

        <div className={"flex flex-col"}>
          {/* NAME */}
          <p className={"text-h5 text-base-0 flex-1"}>
            {`${props.user.lastName} ${props.user.firstName} ${props.user.middleName}`}
          </p>

          <div className={"flex flex-row"}>
            <p className={"text-bodyS_regular text-base-20 w-[35px] text-center"}>Пол</p>
            <p className={"text-bodyS_regular text-base-20 w-[70px] text-center"}>Возраст</p>
            <p className={"text-bodyS_regular text-base-20 w-[80px] text-center"}>Рейтинг</p>
            <p className={"text-bodyS_regular text-base-20 w-[70px] text-center"}>Старты</p>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#FFE79A"} size={16}/></div>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6C6C6"} size={16}/></div>
            <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6A791"} size={16}/></div>
            <p className={"text-bodyS_regular text-base-20 w-[130px] text-center"}>Лучшее время</p>
          </div>

          <div className={"flex flex-row"}>
            {/* GENDER */}
            <p className={"text-bodyM_regular text-base-0 w-[35px] text-center"}>
              {props.user.gender == "MALE" ? "М" : "Ж"}
            </p>

            {/* AGE */}
            <p className={"text-bodyM_regular text-base-0 w-[70px] text-center"}>
              {getAge(new Date(props.user.birthDate))}
            </p>

            {/* RATING */}
            <p className={"text-bodyM_regular text-base-0 w-[80px] text-center"}>1305</p>

            {/* COMPETITIONS */}
            <p className={"text-bodyM_regular text-base-0 w-[70px] text-center"}>25</p>

            {/* ACHIEVEMENTS */}
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>5</p>
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>3</p>
            <p className={"text-bodyM_regular text-base-0 w-[28px] text-center"}>8</p>

            {/* BEST TIME */}
            <p className={"text-bodyM_regular text-base-0 w-[130px] text-center"}>00:49.32</p>
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
      <p className={"text-bodyM_medium text-base-95 w-[80px] text-center"}>1</p>

      {/* PHOTO */}
      <div className={"w-[36px] h-[36px] rounded-full bg-base-5"}/>

      {/* NAME */}
      <p className={"text-bodyM_regular text-base-95 flex-1"}>
        {`${props.user.lastName} ${props.user.firstName} ${props.user.middleName}`}
      </p>

      {/* GENDER */}
      <p className={"text-bodyM_regular text-base-95 w-[35px] text-center"}>
        {props.user.gender == "MALE" ? "М" : "Ж"}
      </p>

      {/* AGE */}
      <p className={"text-bodyM_regular text-base-95 w-[70px] text-center"}>
        {getAge(new Date(props.user.birthDate))}
      </p>

      {/* RATING */}
      <p className={"text-bodyM_regular text-base-95 w-[80px] text-center"}>
        1305
      </p>

      {/* COMPETITIONS */}
      <p className={"text-bodyM_regular text-base-95 w-[70px] text-center"}>
        25
      </p>

      {/* ACHIEVEMENTS */}
      <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>
        5
      </p>
      <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>
        3
      </p>
      <p className={"text-bodyM_regular text-base-95 w-[28px] text-center"}>
        8
      </p>

      {/* BEST TIME */}
      <p className={"text-bodyM_regular text-base-95 w-[130px] text-center"}>
        00:49.32
      </p>
    </div>
  )
}
