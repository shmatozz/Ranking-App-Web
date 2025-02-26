'use client';

import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import clsx from "clsx";
import {Info, Swims, Participants, Results, Live} from "./content";
import {isPassed} from "@/shared/lib";
import {useCompetitionStore} from "@/features/competition/get";
import {Icon} from "@/shared/ui";

type Tab = "info" | "swims" | "participants" | "live" | "results";
const TABS: Tab[] = ["info", "swims", "participants", "live", "results"];

export const CompetitionContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rowTab = searchParams.get("tab");
  const activeTab: Tab = rowTab && TABS.includes(rowTab as Tab) ? rowTab as Tab : "info";
  const competition = useCompetitionStore((state) => state.competition);

  const handleTabChange = (tab: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", tab);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const isActive = (tab: string) => activeTab == tab;

  const getIcon = (tab: Tab): "info" | "swim" | "members" | "live" | "podium" => {
    switch (tab) {
      case "info": return "info";
      case "swims": return "swim";
      case "participants": return "members";
      case "results": return "podium";
      case "live": return "live";
    }
  }

  const Tab = ({ href, label }: { href: Tab; label: string; }) => (
    <div
      className={clsx(
        "relative w-full h-full text-center content-center group select-none"
      )}
      onClick={(href == "results" && !isPassed(competition?.date)) || href == "live" ? undefined : () => handleTabChange(href)}
    >
      <p className={clsx(
        (href == "results" && !isPassed(competition?.date)) || href == "live" ? "text-base-50" : "text-base-95",
        "hidden xs:block"
        )}
      >
        {label}
      </p>

      <div className={"w-full flex flex-row justify-center xs:hidden"}>
        <Icon
          name={getIcon(href)}
          className={(href == "results" && !isPassed(competition?.date)) || href == "live" ?
            "text-base-40" : (isActive(href) ? "text-blue-50" : "text-base-70")}
        />
      </div>

      <div className={clsx(
        "absolute bottom-0 w-full transition-all duration-200",
        isActive(href) ? "h-1 bg-blue-50" : "h-0 bg-base-10",
        (href == "results" && !isPassed(competition?.date)) || href == "live" ? "group-hover:h-0" : "group-hover:h-1"
      )}/>
    </div>
  );

  const Content = ({ href }: { href: Tab }) => {
    switch (href) {
      case "info": return <Info/>
      case "swims": return <Swims/>
      case "participants": return <Participants/>
      case "results": return <Results/>
      case "live": return <Live/>
    }
  }

  return (
    <div className={"flex flex-col"}>
      <div
        className={"flex flex-row w-full h-[36px] gap-4"}
      >
        <Tab href={"info"} label={"Информация"}/>
        <Tab href={"swims"} label={"Заплывы"}/>
        <Tab href={"participants"} label={"Участники"}/>
        <Tab href={"live"} label={"Трансляция"}/>
        <Tab href={"results"} label={"Результаты"}/>
      </div>

      <Content href={activeTab}/>
    </div>
  )
}
