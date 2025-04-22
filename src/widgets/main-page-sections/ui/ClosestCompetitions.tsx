"use client";

import React, {useEffect, useState} from "react";
import {Button, IconButton} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {ClosestCompetitionCard, CompetitionCard, CompetitionFull} from "@/entities/competition";
import {useCalendarStore} from "@/features/competition/filter";
import {getCompetitionByID} from "@/features/competition/get";

export const ClosestCompetitions = () => {
  const router = useRouter();
  const { competitions, getCompetitions } = useCalendarStore();

  const [closestCompetition, setClosestCompetition] = useState<CompetitionFull>();

  useEffect(() => {
    getCompetitions()
  }, [getCompetitions]);

  useEffect(() => {
    if (competitions && competitions.length > 0) {
      getCompetitionByID({ uuid: competitions[0].competitionUuid })
        .then((response) => {
          setClosestCompetition(response);
        })
    }
  }, [competitions]);

  return (
    <div className={"content-container flex-col min-h-[450px] gap-4"}>
      <div className={"flex flex-row w-full h-fit items-center justify-between"}>
        <label className={"text-h4 text-base-100"}>Ближайшие соревнования</label>

        <Button
          variant={"tertiary"} size={"S"} className={"hidden xs:block"}
          onClick={() => router.push("/calendar")}
        >
          Все соревнования
        </Button>

        <IconButton
          icon={"chevronRight"} variant={"tertiary"} size={"S"} className={"block xs:hidden"}
          onClick={() => router.push("/calendar")}
        >
          Все соревнования
        </IconButton>
      </div>

      {competitions && competitions.length == 0 && (
        <div className={"flex flex-1 items-end justify-center"}>
          <p className={"text-bodyM_regular text-base-95 text-center"}>В данный момент соревнования отсутвуют</p>
        </div>
      )}

      <div className={"flex flex-col flex-1 gap-8 lg-md:flex-row"}>
        {!closestCompetition && competitions && competitions.length > 0 && (
          <div className={"flex flex-1"}><ClosestCompetitionCard/></div>
        )}

        {closestCompetition && (
          <div className={"flex flex-1"}>
            <ClosestCompetitionCard
              competition={closestCompetition}
              onClick={() => router.push(`/calendar/competition?id=${closestCompetition.competitionUuid}`)}
            />
          </div>
        )}

        {!competitions && (
          <div className={"flex flex-col flex-1 gap-4 justify-center"}>
            <CompetitionCard/>
            <CompetitionCard/>
            <CompetitionCard/>
          </div>
        )}

        {competitions && (
          <div className={"flex flex-col flex-1 gap-4 justify-center"}>
            {competitions.slice(1, 4).map((item) => (
              <CompetitionCard
                key={item.competitionUuid}
                competition={item}
                onClick={() => router.push(`/calendar/competition?id=${item.competitionUuid}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
