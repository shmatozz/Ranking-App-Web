'use client';

import React from "react";
import {Competitions, CompetitionsCreate, Info, Members, Results} from "@/widgets/profile";
import {Subpages} from "@/entities/user";
import {ProfilePages} from "@/widgets/navigation";

interface ProfileProps {
  organization: boolean;
}

export const Profile: React.FC<ProfileProps> = ({
  organization
}) => {
  const [subpage, setSubpage] = React.useState<Subpages>("info");

  return (
    <div className={"flex flex-row h-full w-[1100px] w-max-[1100px] gap-[50px] text-wrap bg-base-0 rounded-3xl shadow-md px-[52px] py-8"}>
      <div className={"flex flex-col h-full w-full max-w-[250px] gap-4"}>
        {/* USER PHOTO */}
        <div className={"h-[250px] w-[250px] bg-base-5 rounded-full"}/>

        {/* USER ID */}
        <div className={"flex flex-col gap-1 items-center"}>
          <p className={"text-bodyS_regular text-base-40"}>Уникальный ID участника</p>
          <p className={"text-bodyM_regular text-base-95"}>123123123</p>
        </div>

        {/* PROFILE NAVIGATION */}
        <ProfilePages role={organization ? "organization" : "sportsman"} page={subpage} setPage={setSubpage}/>
      </div>

      {subpage == "info" && (
        <Info role={organization ? "organization" : "sportsman"}/>
      )}

      {subpage == "comps" && (
        <Competitions role={organization ? "organization" : "sportsman"}/>
      )}

      {subpage == "comps-create" && organization && (
        <CompetitionsCreate/>
      )}

      {subpage == "results" && (
        <Results role={organization ? "organization" : "sportsman"}/>
      )}

      {subpage == "members" && (
        <Members role={organization ? "organization" : "sportsman"}/>
      )}
    </div>
  )
}
