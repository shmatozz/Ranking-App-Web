"use client";

import React from "react";
import {Button} from "@/shared/ui";
import {useRouter} from "next/navigation";

export const Rating = () => {
  const router = useRouter();

  return (
    <div className={"content-container min-h-[450px]"}>
      <div className={"flex flex-row w-full h-fit items-center justify-between"}>
        <label className={"text-h4 text-base-100"}>Рейтинг</label>

        <Button
          variant={"tertiary"} size={"S"}
          onClick={() => router.push("/ratings")}
        >
          Весь рейтинг
        </Button>
      </div>
    </div>
  )
}
