import React from "react";
import {ClosestCompetitions, News, Partners, Rating} from "@/widgets/main-page-sections";

export const MainPage = () => {
  return (
    <div className={"flex flex-col gap-8"}>
      <News/>
      <ClosestCompetitions/>
      <Rating/>
      <Partners/>
    </div>
  )
}
