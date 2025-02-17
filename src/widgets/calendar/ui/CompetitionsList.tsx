"use client";

import React from "react";
import {useCalendarStore} from "@/features/competition/filter";
import {CompetitionCard} from "@/entities/competition";
import {useRouter} from "next/navigation";
import clsx from "clsx";

export const CompetitionsList = () => {
  const router = useRouter();
  const {
    competitions, isLoading,
    totalPages, page, totalResults
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
        <div className={"flex flex-row w-full justify-between items-center gap-4"}>
          <div className={"flex flex-row justify-center items-center gap-4"}>
            {Array.from({length: totalPages}, (_, index) => (
              <p
                key={index} onClick={() => router.push("?p=" + index, { scroll: false })}
                className={clsx(
                  "cursor-pointer select-none px-4 rounded-full",
                  index == page ? "text-h5_bold text-base-95 bg-base-5" : "text-h5 text-base-70",
                )}
              >
                {index + 1}
              </p>
            ))}

            <div className={"flex flex-row cursor-pointer items-center text-bodyS_medium"}
                 onClick={page == totalPages - 1 ? undefined : () => router.push("?p=" + Math.min(totalPages - 1, page + 1), { scroll: false })}>
              <p className={`select-none ${page == totalPages - 1 ? "text-base-40" : "text-base-95"}`}>дальше</p>
            </div>
          </div>

          <div className={"text-bodyS_medium text-base-90"}>
            {`Всего найдено: ${totalResults}`}
          </div>
        </div>
      )}
    </div>
  )
}
