"use client";

import React from "react";
import {useCalendarStore} from "@/features/competition/filter";
import {CompetitionCard} from "@/entities/competition";
import {useRouter} from "next/navigation";

export const CompetitionsList = () => {
  const router = useRouter();
  const { competitions, isLoading} = useCalendarStore();

  return (
    <div className={"flex flex-col gap-4 px-2"}>
      {(!competitions || isLoading) && Array(10).fill(1).map((_v, index) => (
        <CompetitionCard key={index} isLoading={isLoading}/>
      ))}

      {competitions && !isLoading && competitions.map((comp) => (
        <CompetitionCard
          key={comp.competitionUuid}
          competition={comp}
          onClick={() => router.push(`/calendar/competition?id=${comp.competitionUuid}`)}
        />
      ))}
    </div>
  )
}
