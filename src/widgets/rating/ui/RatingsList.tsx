"use client";

import React from "react";
import {UserRatingCard} from "@/entities/user/ui/UserRatingCard";
import {useUserStore} from "@/entities/user";

export const RatingsList = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className={"flex flex-col w-full"}>
      <UserRatingCard user={user} first/>
      <UserRatingCard user={user}/>
    </div>
  )
}
