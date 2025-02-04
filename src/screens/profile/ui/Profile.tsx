'use client';

import React from "react";
import {Competitions, CompetitionsCreate, Info, Members, Results} from "@/widgets/profile";
import {Subpages} from "@/screens/profile";

export const Profile = () => {
  const [subpage, setSubpage] = React.useState<Subpages>("info");
  const user = "user";

  return (
    <div className={"flex flex-row h-fit w-full w-max-[1100px] text-wrap bg-base-0 rounded-3xl shadow-md px-[52px] py-8"}>
      <div>

      </div>

      {subpage == "info" && (
        <Info type={user}/>
      )}

      {subpage == "comps" && (
        <Competitions type={user}/>
      )}

      {subpage == "comps-create" && (
        <CompetitionsCreate type={user}/>
      )}

      {subpage == "results" && (
        <Results type={user}/>
      )}

      {subpage == "members" && (
        <Members type={user}/>
      )}
    </div>
  )
}
