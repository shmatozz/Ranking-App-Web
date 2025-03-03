'use client'

import React from "react";
import {Button, Dropdown} from "@/shared/ui";
import {ageCategoryFilters, competitionsTypesFilters, useRatingsStore} from "@/features/ratings";

export const RatingsHeader = () => {
  const filters = useRatingsStore((state) => state.filters);
  const filtersActions = useRatingsStore((state) => state.filtersActions);

  const { getRatings, clearFilters } = useRatingsStore();

  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"text-h4 text-base-100"}>Рейтинг спортсменов</label>

      <div className={"flex flex-col gap-3 xs:flex-row"}>
        <Dropdown
          items={ageCategoryFilters}
          selectedItems={filters.ageCategory ? [filters.ageCategory] : []}
          onItemSelected={filtersActions.setAgeCategory}
          placeholder={"Возрастная группа"}
        />

        <Dropdown
          items={competitionsTypesFilters}
          selectedItems={filters.competitionsType ? [filters.competitionsType] : []}
          onItemSelected={filtersActions.setCompetitionsType}
          placeholder={"Вид страртов"}
        />

        <div className={"flex flex-row w-full gap-3"}>
          <Button
            variant={"primary"} palette={"blue"} size={"S"} className={"w-full"}
            onClick={getRatings}
          >
            Применить
          </Button>

          <Button
            variant={"tertiary"} palette={"gray"} size={"S"}
            onClick={() => {
              clearFilters();
              getRatings();
            }} className={"w-full"}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  )
}
