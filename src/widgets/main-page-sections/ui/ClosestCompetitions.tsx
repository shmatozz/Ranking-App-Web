"use client";

import React from "react";
import {Button, IconButton} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {ClosestCompetitionCard, CompetitionCard} from "@/entities/competition";

export const ClosestCompetitions = () => {
  const router = useRouter();

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

      <div className={"flex flex-col flex-1 gap-8 lg-md:flex-row"}>
        <div className={"flex flex-1"}>
          <ClosestCompetitionCard competition={{
            name: "Тестовое название крупного соренвования",
            location: "Бессейнывыф",
            date: "2025-03-22",
            description: "",
            contactLink: "N/D",
            competitionType: "соревнование",
            participantsType: "AMATEURS",
            competitionUuid: "c9ee4e1b-4075-4341-a202-a7f829c7289c",
            events: [
              {
                distance: 100,
                style: "Брас",
                gender: "MALE",
                ageFrom: 0,
                ageTo: 99,
                maxPoints: 100, price: 100, maxParticipants: 100,
                startTime: "2025-02-22T12:00:00Z",
                status: "CREATED",
                eventUuid: "6e59ea23-88f9-4266-a672-0375313c5089"
              },
              {
                distance: 500,
                style: "свободный",
                gender: "MALE",
                ageFrom: 0,
                ageTo: 99,
                maxPoints: 500, price: 100, maxParticipants: 100,
                startTime: "2025-02-22T13:00:00Z",
                status: "CREATED",
                eventUuid: "583e2d18-6a6d-45c6-931c-d9748cb6dee9"
              }
            ],
            organizationInfo: {
              email: "mibaryshev@edu.hse.ru",
              name: "МАТВЕЙ SWIM",
              isOpen: true
            }
          }}/>
        </div>

        <div className={"flex flex-col flex-1 gap-4 justify-center"}>
          <CompetitionCard/>
          <CompetitionCard/>
          <CompetitionCard/>
        </div>
      </div>
    </div>
  )
}
