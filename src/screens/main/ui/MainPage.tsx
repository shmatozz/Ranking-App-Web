import React from "react";
import {ClosestCompetitions, News, Partners, Rating} from "@/widgets/main-page-sections";
import {SessionProvider} from "next-auth/react";

export const MainPage = () => {
  return (
    <div className={"flex flex-col gap-8"}>
      <SessionProvider>
        <News/>
      </SessionProvider>
      <ClosestCompetitions/>
      <Rating/>
      <Partners/>
    </div>
  )
}
