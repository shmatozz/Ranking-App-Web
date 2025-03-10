"use client"

import React, {useEffect} from "react";
import {Map, PlacemarksList} from '@/widgets/map';

export const UsefulPage = () => {
  useEffect(() => {
    document.title = "Полезное";
  }, []);

  return (
    <div className={"content-container flex-col gap-4"}>
      <div className={"flex flex-col h-fit gap-1"}>
        <label className={"text-h4 text-base-95"}>Места для тренировок</label>

        <div className={"container-shadow h-[600px] rounded-2xl overflow-hidden"}>
          <Map/>
        </div>

        <PlacemarksList/>
      </div>
    </div>
  )
}
