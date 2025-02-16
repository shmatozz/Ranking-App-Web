"use client";

import React from "react";
import {useCalendarStore} from "@/features/competition/filter";
import {CompetitionCard} from "@/entities/competition";
import {useRouter} from "next/navigation";
import {Icon} from "@/shared/ui";
import clsx from "clsx";

export const CompetitionsList = () => {
  const router = useRouter();
  const {
    competitions, isLoading,
    totalPages, page, setPage
  } = useCalendarStore();

  return (
    <div className={"flex flex-col gap-4 px-2"}>
      {(!competitions || isLoading) && Array(3).fill(1).map((_v, index) => (
        <CompetitionCard key={index} isLoading={isLoading}/>
      ))}

      {competitions && !isLoading && competitions.map((comp) => (
        <CompetitionCard
          key={comp.competitionUuid}
          competition={comp}
          onClick={() => router.push(`/calendar/competition?id=${comp.competitionUuid}`)}
        />
      ))}

      {competitions && competitions.length == 0 && !isLoading && (
        <p className={"text-bodyM_regular text-base-95 text-center"}>По вашему запросу не найдено соревнований</p>
      )}

      {competitions && competitions.length > 0 && totalPages && page != undefined && totalPages > 0 && (
        <div className={"flex flex-row w-full justify-center items-center gap-4"}>
          <div className={"cursor-pointer"} onClick={page == 0 ? undefined : () => setPage(Math.max(0, page - 1))}>
            <Icon name={"chevronLeft"} size={20} color={page == 0 ? "#868686" : "black"}/>
          </div>

          {Array.from({length: totalPages}, (_, index) => (
            <p
              key={index} onClick={() => setPage(index)}
              className={clsx(
                "cursor-pointer select-none",
                index == page ? "text-h5 text-base-95" : "text-h5 text-base-50",
              )}
            >
              {index + 1}
            </p>
          ))}

          <div className={"cursor-pointer"} onClick={page == totalPages - 1 ? undefined : () => setPage(Math.min(totalPages - 1, page + 1))}>
            <Icon name={"chevronRight"} size={20} color={page == totalPages - 1 ? "#868686" : "black"}/>
          </div>
        </div>
      )}
    </div>
  )
}
