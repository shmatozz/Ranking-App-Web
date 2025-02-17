"use client"

import React, {useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";
import {CompetitionContent, CompetitionHeader} from "@/widgets/competition";
import {useCompetitionStore} from "@/features/competition/get";

export const CompetitionPage = () => {
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");
  if (!competitionUUID) redirect("/calendar");

  const { getCompetition, hasError, errorMessage} = useCompetitionStore();

  useEffect(() => {
    getCompetition(competitionUUID);
  }, [competitionUUID, getCompetition]);

  useEffect(() => {
    document.title = "Соревнование";
  }, []);

  if (hasError) {
    return (
      <div className={"content-container text-center text-h5 flex-col"}>
        <p>{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className={"content-container flex-col gap-4"}>
      <CompetitionHeader/>

      <CompetitionContent/>
    </div>
  )
}
