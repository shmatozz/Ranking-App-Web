import React from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {SwimCard} from "@/entities/swim/ui/SwimCard";
import {Button} from "@/shared/ui";

export const Swims = () => {
  const { competition, isLoading } = useCompetitionStore();

  if (!competition || isLoading) {
    return (
      <div className={"flex flex-col w-full p-4 gap-6"}>
        {Array.from({ length: 3 }).map((_i, index) => (
          <SwimCard key={index} isLoading={isLoading}/>
        ))}
      </div>
    )
  }

  return (
    <div className={"flex flex-col w-full p-4 gap-6"}>
      {competition.events.map((swim) => (
        <SwimCard key={swim.competitionUUID + swim.ageCategory + swim.distance + swim.startTime} swim={swim}>
          <Button size={"S"} variant={"tertiary"} rightIcon={"link"}>Регистрация</Button>
        </SwimCard>
      ))}
    </div>
  )
}
