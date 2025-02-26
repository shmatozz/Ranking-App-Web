"use client";

import React, {useEffect} from "react";
import {Button, Dropdown, TextInput} from "@/shared/ui";
import {arrangeFilters, useCalendarStore} from "@/features/competition/filter";
import {ArrangeOption} from "@/shared/lib";
import {useRouter, useSearchParams} from "next/navigation";

export const FiltersHeader = () => {
  const router = useRouter();
  const state = useCalendarStore();
  const getCompetitions = useCalendarStore((state) => state.getCompetitions);
  const setPage = useCalendarStore((state) => state.setPage);

  const searchParams = useSearchParams();
  const page = searchParams.get("p");

  useEffect(() => {
    getCompetitions()
  }, [getCompetitions, state.page]);

  useEffect(() => {
    setPage(Number(page ? page : 0));
  }, [setPage, page]);

  useEffect(() => {
    document.title = "Календарь"
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        getCompetitions()
        router.push("?", { scroll: false });
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [getCompetitions, router]);

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-col justify-between gap-1 lg-md:flex-row"}>
        <label className={"text-h4 text-base-100"}>Календарь стартов</label>

        <div className={"flex flex-col w-full gap-0 items-center 2xs:flex-row 2xs:gap-2 lg-md:w-[400px]"}>
          <p className={"w-full text-bodyS_regular text-base-95 select-none text-nowrap 2xs:w-fit fxs:text-bodyM_regular"}>Упорядочить по</p>

          <Dropdown
            items={arrangeFilters}
            selectedItems={[state.arrange]}
            onItemSelected={(item) => state.setArrange({ id: item.id as ArrangeOption, name: item.name })}
            placeholder={"Сортировка"}
          />
        </div>
      </div>

      <div className={"flex flex-col w-full gap-3 lg-md:flex-row"}>
        <TextInput
          title={"Название"}
          value={state.filters.name ? state.filters.name : ""} onChange={(e) => state.filtersActions.setName(e.target.value)}
          inputSize={"S"}
          animatedLabel={false}
        />

        <TextInput
          title={"Дата"}
          value={state.filters.date ? state.filters.date : ""} onChange={(e) => state.filtersActions.setDate(e.target.value)}
          type={"date"}
          inputSize={"S"}
          animatedLabel={false}
        />
      </div>

      <div className={"flex flex-col w-full gap-3 lg-md:flex-row"}>
        <div className={"flex flex-row w-full gap-3 lg-md:w-1/2"}>
          <TextInput
            title={"Участники (от)"}
            value={state.filters.minParticipants ? state.filters.minParticipants : ""}
            onChange={(e) => state.filtersActions.setMinParticipants(Number(e.target.value))}
            type={"number"}
            min={0}
            inputSize={"S"}
            animatedLabel={false}
          />

          <TextInput
            title={"Участники (до)"}
            value={state.filters.maxParticipants ? state.filters.maxParticipants : ""}
            onChange={(e) => state.filtersActions.setMaxParticipants(Number(e.target.value))}
            type={"number"}
            min={0}
            inputSize={"S"}
            animatedLabel={false}
          />
        </div>

        <div className={"flex flex-col w-full gap-3 lg-md:w-1/2 2xs:flex-row"}>
          <Button
            variant={"primary"} palette={"blue"} size={"S"} className={"w-full"}
            onClick={state.getCompetitions}
          >
            Применить
          </Button>

          <Button
            variant={"tertiary"} palette={"gray"} size={"S"}
            onClick={() => {
              state.clearFilters();
              getCompetitions();
            }} className={"w-full"}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  )
}
