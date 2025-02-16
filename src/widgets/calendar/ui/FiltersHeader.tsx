"use client";

import React, {useEffect} from "react";
import {Button, Dropdown, TextInput} from "@/shared/ui";
import {arrangeFilters, useCalendarStore} from "@/features/competition/filter";
import {ArrangeOption} from "@/shared/lib";

export const FiltersHeader = () => {
  const state = useCalendarStore();
  const getCompetitions = useCalendarStore((state) => state.getCompetitions);

  useEffect(() => {
    getCompetitions();
  }, [getCompetitions, state.filters]);

  useEffect(() => {
    document.title = "Календарь"
  }, []);

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-row justify-between"}>
        <label className={"text-h4 text-base-100"}>Календарь стартов</label>

        <div className={"flex flex-row w-[400px] gap-2 items-center"}>
          <p className={"text-bodyM_regular text-base-95 select-none text-nowrap"}>Упорядочить по</p>

          <Dropdown
            items={arrangeFilters}
            selectedItems={[state.arrange]}
            onItemSelected={(item) => state.setArrange({ id: item.id as ArrangeOption, name: item.name })}
            placeholder={"Сортировка"}
          />
        </div>
      </div>

      <div className={"flex flex-row w-full gap-3"}>
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

      <div className={"flex flex-row w-full gap-3"}>
        <TextInput
          title={"Участники (от)"}
          value={state.filters.minParticipants ? state.filters.minParticipants : ""} onChange={(e) => state.filtersActions.setMinParticipants(Number(e.target.value))}
          type={"number"}
          min={0}
          inputSize={"S"}
          animatedLabel={false}
        />

        <TextInput
          title={"Участники (до)"}
          value={state.filters.maxParticipants ? state.filters.maxParticipants : ""} onChange={(e) => state.filtersActions.setMaxParticipants(Number(e.target.value))}
          type={"number"}
          min={0}
          inputSize={"S"}
          animatedLabel={false}
        />

        <Button
          variant={"tertiary"} palette={"gray"} size={"S"} className={"w-full"}
          onClick={state.clearFilters}
        >
          Сбросить
        </Button>
      </div>
    </div>
  )
}
