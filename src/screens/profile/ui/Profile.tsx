'use client';

import React, {useEffect} from "react";
import {Competitions, CompetitionsCreate, Info, Members, Results} from "@/widgets/profile";
import {Subpages, useUserStore} from "@/entities/user";
import {ProfilePages} from "@/widgets/navigation";
import {useRouter, useSearchParams} from "next/navigation";
import {useOrganizationStore} from "@/entities/organization";

interface ProfileProps {
  isOrganization: boolean;
}

const TABS: Subpages[] = ["info", "comps", "comps-create", "members", "results"];

export const Profile: React.FC<ProfileProps> = ({
  isOrganization
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rowTab = searchParams.get("p");
  const activeTab: Subpages = rowTab && TABS.includes(rowTab as Subpages) ? rowTab as Subpages : "info";

  const { organization, getOrganizationInfo } = useOrganizationStore();
  const { user, getUserInfo } = useUserStore();

  const handleSubpageChange = (tab: Subpages) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", tab);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const Content = ({ href }: { href: Subpages }) => {
    switch (href) {
      case "info": return <Info role={isOrganization ? "ORGANIZATION" : "USER"}/>
      case "comps": return <Competitions role={isOrganization ? "ORGANIZATION" : "USER"} onCreateCompetitionClick={isOrganization ? () => handleSubpageChange("comps-create") : undefined}/>
      case "comps-create": {
        if (isOrganization) return <CompetitionsCreate onCancel={() => handleSubpageChange("comps")} onSuccess={() => handleSubpageChange("comps")}/>
        else return <Competitions role={isOrganization ? "ORGANIZATION" : "USER"} onCreateCompetitionClick={isOrganization ? () => handleSubpageChange("comps-create") : undefined}/>
      }
      case "members": {
        if (isOrganization) return <Members/>
        else return <Results/>
      }
      case "results": {
        if (!isOrganization) return <Results/>
        else return <Members/>
      }
    }
  }

  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  useEffect(() => {
    if (isOrganization && !organization) getOrganizationInfo();
    else if (!isOrganization && !user) getUserInfo();
  }, [getOrganizationInfo, getUserInfo, isOrganization, organization, user]);

  return (
    <div className={"content-container flex-col lg-md:flex-row gap-[50px] text-wrap"}>
      <div className={"flex flex-col h-full w-full max-w-full gap-4 items-center lg-md:max-w-[250px]"}>
        {/* USER PHOTO */}
        <div className={"h-[100px] w-[100px] bg-base-5 rounded-full lg-md:h-[250px] lg-md:w-[250px]"}/>

        {/* USER ID */}
        <div className={"flex flex-col gap-1 items-center"}>
          <p className={"text-bodyS_regular text-base-40"}>Уникальный ID участника</p>
          <p className={"text-bodyM_regular text-base-95"}>123123123</p>
        </div>

        {/* PROFILE NAVIGATION */}
        <ProfilePages role={isOrganization ? "ORGANIZATION" : "USER"} page={activeTab} setPage={handleSubpageChange}/>
      </div>

      <Content href={activeTab}/>
    </div>
  )
}
