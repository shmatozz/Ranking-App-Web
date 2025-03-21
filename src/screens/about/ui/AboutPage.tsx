"use client";

import React, {useEffect} from "react";
import {AboutUsText, Partners, Sponsors} from "@/widgets/about-page-sections";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useSession} from "next-auth/react";

export const AboutPage = () => {
  const { whoAmI, getWhoAmI } = useWhoAmIStore();
  const session = useSession();

  useEffect(() => {
    if (whoAmI == undefined || (whoAmI && session.data?.user.email && whoAmI.email !== session.data?.user.email)) getWhoAmI();
  }, [getWhoAmI, session.data?.user.email, whoAmI]);

  return (
    <div className="content-container flex-col gap-4">
      <AboutUsText/>
      <div className={"w-full h-[3px] bg-base-5"}/>
      <Partners/>
      <div className={"w-full h-[3px] bg-base-5"}/>
      <Sponsors/>
    </div>
  )
}
