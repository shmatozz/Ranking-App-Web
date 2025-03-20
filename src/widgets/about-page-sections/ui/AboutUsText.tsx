"use client";

import React, {useEffect} from "react";
import {useAboutInfoStore} from "@/widgets/about-page-sections/model/AboutInfoStore";

export const AboutUsText = () => {
  const { aboutUsText, getAboutUsText } = useAboutInfoStore();

  useEffect(() => {
    if (!aboutUsText) getAboutUsText();
  }, [aboutUsText, getAboutUsText]);

  if (!aboutUsText) return (
    <div className={"flex flex-col gap-2"}>
      <div className={"w-full h-[100px] bg-base-5 rounded-md animate-pulse"}/>
      <div className={"w-full h-[70px] bg-base-5 rounded-md animate-pulse"}/>
    </div>
  )

  return (
    <div className={"flex flex-col gap-2"}>
      <p className={"text-bodyM_regular text-base-95 whitespace-pre-wrap"}>
        {aboutUsText}
      </p>
    </div>
  )
}
