'use client';

import React, {useEffect} from "react";
import {Competitions, CompetitionsCreate, Info, Members, Photo, Results} from "@/widgets/profile";
import {Subpages} from "@/entities/user";
import {ProfilePages} from "@/widgets/navigation";
import {useRouter, useSearchParams} from "next/navigation";
import {useWhoAmIStore} from "@/features/who-am-i";

interface ProfileProps {
  sessionEmail: string;
}

const TABS: Subpages[] = ["info", "comps", "comps-create", "members", "results"];

export const Profile: React.FC<ProfileProps> = ({
  sessionEmail
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rowTab = searchParams.get("p");
  const activeTab: Subpages = rowTab && TABS.includes(rowTab as Subpages) ? rowTab as Subpages : "info";
  const { whoAmI, getWhoAmI, isLoading } = useWhoAmIStore();

  useEffect(() => {
    if (sessionEmail != whoAmI?.email) getWhoAmI()
  }, [getWhoAmI, sessionEmail, whoAmI]);

  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  const handleSubpageChange = (tab: Subpages) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", tab);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  if (isLoading || !whoAmI) return (
    <div
      className="content-container justify-center">
      <div className="h-7 w-7 border-4 border-transparent border-r-inherit rounded-full animate-spin"/>
    </div>
  );

  const Content = ({ href }: { href: Subpages }) => {
    switch (href) {
      case "info": return <Info role={whoAmI.organization ? "ORGANIZATION" : "USER"}/>
      case "comps": return <Competitions role={whoAmI.organization ? "ORGANIZATION" : "USER"} onCreateCompetitionClick={whoAmI.organization ? () => handleSubpageChange("comps-create") : undefined}/>
      case "comps-create": {
        if (whoAmI.organization) return <CompetitionsCreate onCancel={() => handleSubpageChange("comps")} onSuccess={() => handleSubpageChange("comps")}/>
        else return <Competitions role={whoAmI.organization ? "ORGANIZATION" : "USER"} onCreateCompetitionClick={whoAmI.organization ? () => handleSubpageChange("comps-create") : undefined}/>
      }
      case "members": {
        if (whoAmI.organization) return <Members/>
        else return <Results/>
      }
      case "results": {
        if (!whoAmI.organization) return <Results/>
        else return <Members/>
      }
    }
  }

  return (
    <div className={"content-container flex-col lg-md:flex-row gap-[50px] text-wrap"}>
      <div className={"flex flex-col h-full w-full max-w-full gap-8 items-center lg-md:max-w-[250px]"}>
        {/* USER PHOTO */}
        <Photo/>

        {/* PROFILE NAVIGATION */}
        <ProfilePages role={whoAmI?.organization ? "ORGANIZATION" : "USER"} page={activeTab} setPage={handleSubpageChange}/>
      </div>

      <Content href={activeTab}/>
    </div>
  )
}
