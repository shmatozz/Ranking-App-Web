"use client"

import React, {useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";
import {CompetitionContent, CompetitionHeader} from "@/widgets/competition";
import {useCompetitionStore} from "@/features/competition/get";

export const CompetitionPage = () => {
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");
  if (!competitionUUID) redirect("/calendar");

  const { getCompetition } = useCompetitionStore();

  useEffect(() => {
    getCompetition(competitionUUID);
  }, [competitionUUID, getCompetition]);

  return (
    <div
      className={"flex flex-col w-full max-w-[1100px] h-fit bg-base-0 place-self-center px-8 py-4 rounded-3xl gap-4"}
    >
      <CompetitionHeader/>

      <CompetitionContent/>
    </div>
  )
}
