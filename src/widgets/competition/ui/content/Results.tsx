'use client';

import React from "react";
import {redirect, useSearchParams} from "next/navigation";
import {useCompetitionStore} from "@/features/competition/get";
import {isPassed} from "@/shared/lib";

export const Results = () => {
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");
  const { competition, isLoading } = useCompetitionStore();

  if (!competition || isLoading) {
    return null;
  }

  if (!isPassed(competition.date)) redirect("/calendar/competition?id=" + competitionUUID);

  return (
    <div className={"p-4 text-center text-blue-90"}>
      Организация ещё не опубликовала результаты
    </div>
  )
}
