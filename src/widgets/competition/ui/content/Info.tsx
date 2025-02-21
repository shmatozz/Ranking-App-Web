import React, {useEffect} from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {getDistances} from "@/shared/lib";

export const Info = () => {
  const {competition, isLoading} = useCompetitionStore();

  useEffect(() => {
    if (competition) document.title = competition.name
  }, [competition]);

  if (!competition || isLoading) return <InfoLoading/>

  const InfoRow = ({title, info} : { title: string, info: string | number }) => (
    <div className={"flex flex-row p-2 gap-4 items-center bg-base-0"}>
      <p className={"text-bodyM_regular text-base-95 min-w-[200px]"}>{title}</p>
      <p className={"text-bodyM_regular text-blue-90"}>{info}</p>
    </div>
  )

  return (
    <div className={"flex flex-col w-full p-4 gap-6"}>
      {/* DESCRIPTION */}
      <div className={"flex flex-col w-full gap-1"}>
        <p className={"text-bodyM_medium text-base-95"}>Описание</p>
        <p className={"text-bodyM_regular text-base-95"}>{competition.description ? competition.description : "Организатор не предоставил описания"}</p>
      </div>

      {/* ORGANIZATION */}
      <div
        className={"flex flex-col w-full gap-1"}
      >
        <p className={"text-bodyM_medium text-base-95"}>Организатор</p>

        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Название"} info={competition.organizationInfo.name}/>
          <InfoRow title={"Контакты"} info={competition.contactLink ? competition.contactLink : competition.organizationInfo.email}/>
        </div>
      </div>

      {/* PLACE */}
      <div
        className={"flex flex-col w-full gap-1"}
      >
        <p className={"text-bodyM_medium text-base-95"}>Место проведения</p>

        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Название"} info={competition.location}/>
        </div>
      </div>

      {/* INFO */}
      <div
        className={"flex flex-col w-full gap-1"}
      >
        <p className={"text-bodyM_medium text-base-95"}>Общая информация</p>

        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Тип соревнования"} info={competition.competitionType}/>
          <InfoRow title={"Макс. участников"} info={competition.maxParticipants}/>
          <InfoRow title={"Дистанции"} info={getDistances(competition.events)}/>
        </div>
      </div>
    </div>
  )
}

const InfoLoading = () => {
  const InfoRow = ({title} : { title: string }) => (
    <div className={"flex flex-row p-2 gap-4 items-center bg-base-0"}>
      <p className={"text-bodyM_regular text-base-95 min-w-[200px]"}>{title}</p>
      <p className={"text-bodyM_regular loader"}>Информация</p>
    </div>
  )

  return (
    <div className={"flex flex-col w-full p-4 gap-6"}>
      <div className={"flex flex-col w-full gap-1"}>
        <p className={"text-bodyM_medium text-base-95"}>Описание</p>
        <p className={"text-bodyM_regular loader"}>Тут должно быть описание</p>
      </div>

      <div className={"flex flex-col w-full gap-1"}>
        <p className={"text-bodyM_medium text-base-95"}>Организатор</p>
        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Название"}/>
          <InfoRow title={"Контакты"}/>
        </div>
      </div>

      <div className={"flex flex-col w-full gap-1"}>
        <p className={"text-bodyM_medium text-base-95"}>Место проведения</p>
        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Название"}/>
        </div>
      </div>

      {/* INFO */}
      <div className={"flex flex-col w-full gap-1"}>
        <p className={"text-bodyM_medium text-base-95"}>Общая информация</p>
        <div className={"flex flex-col w-full gap-[2px] bg-base-5"}>
          <InfoRow title={"Тип соревнования"}/>
          <InfoRow title={"Макс. участников"}/>
          <InfoRow title={"Дистанции"}/>
        </div>
      </div>
    </div>
  )
}
