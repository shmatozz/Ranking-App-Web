'use client';

import React, {useEffect} from "react";
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

  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  return (
    <div
      className={"flex flex-col h-full max-w-[1100px] w-full justify-self-center gap-[50px] text-wrap bg-base-0 rounded-3xl shadow-md px-[24px] py-8 lg-md:flex-row xs:px-[52px]"}
    >
      <div className={"flex flex-col h-full w-full max-w-full gap-4 items-center lg-md:max-w-[250px]"}>
        {/* USER PHOTO */}
        <div className={"h-[100px] w-[100px] bg-base-5 rounded-full lg-md:h-[250px] lg-md:w-[250px]"}/>

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
        <Competitions role={organization ? "organization" : "sportsman"} onCreateCompetitionClick={organization ? () => setSubpage("comps-create") : undefined}/>
      )}

      {subpage == "comps-create" && organization && (
        <CompetitionsCreate onCancel={() => setSubpage("comps")}/>
      )}

      {subpage == "results" && (
        <Results/>
      )}

      {subpage == "members" && (
        <Members/>
      )}
    </div>
  )
}
