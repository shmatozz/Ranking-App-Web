import React from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {formatDate} from "@/shared/utils";

export const CompetitionHeader = () => {
  const competition = useCompetitionStore((state) => state.competition);
  const isLoading = useCompetitionStore((state) => state.isLoading);

  if (!competition || isLoading) {
    return (
      <div className={"flex flex-col gap-1"}>
        <label className={"loader text-h4"}>Название соревнования</label>
        <p className={"loader text-bodyM_regular"}>Дата соревнования</p>
      </div>
    )
  }

  return (
    <div
      className={"flex flex-col w-full gap-1"}
    >
      <label className={"text-h4 text-base-95"}>{competition.name}</label>
      <p className={"text-bodyM_regular text-base-95"}>{formatDate(competition.date)}</p>
    </div>
  )
}
