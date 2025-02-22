"use client"

import React, {useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";
import {CompetitionContent, CompetitionHeader} from "@/widgets/competition";
import {useCompetitionStore} from "@/features/competition/get";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useSession} from "next-auth/react";

export const CompetitionPage = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");
  if (!competitionUUID) redirect("/calendar");

  const { getCompetition, hasError, errorMessage} = useCompetitionStore();
  const { whoAmI, getWhoAmI, isLoading } = useWhoAmIStore();

  useEffect(() => {
    getCompetition(competitionUUID);
  }, [competitionUUID, getCompetition]);

  useEffect(() => {
    document.title = "Соревнование";
  }, []);

  useEffect(() => {
    if (((whoAmI === undefined) || (session.data?.user?.email !== whoAmI?.email)) && !isLoading) getWhoAmI()
  }, [getWhoAmI, isLoading, session.data?.user?.email, whoAmI]);

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
