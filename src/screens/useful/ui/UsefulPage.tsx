"use client"

import React from "react";
import {Map, PlacemarksList} from '@/widgets/map';

export const UsefulPage = () => {
  return (
    <div className={"content-container flex-col gap-4"}>
      <label className={"text-h4 text-base-95"}>Места для тренировок</label>

      <div className={"flex flex-col container-shadow h-fit min-h-[600px] rounded-2xl overflow-hidden"}>
        <div className={"h-[600px]"}>
          <Map/>
        </div>

        <PlacemarksList/>
      </div>
    </div>
  )
}
