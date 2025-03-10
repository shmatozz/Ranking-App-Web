'use client'

import React, {useEffect} from "react";
import {Dropdown, TextInput} from "@/shared/ui";
import {useRatingsStore} from "@/features/ratings";
import {categories, gender} from "@/widgets/competition";
import {useSearchParams} from "next/navigation";

export const RatingsHeader = () => {
  const filters = useRatingsStore((state) => state.filters);
  const filtersActions = useRatingsStore((state) => state.filtersActions);

  const { getRatings, setPage } = useRatingsStore();

  const searchParams = useSearchParams();
  const page = searchParams.get("p");

  useEffect(() => {
    setPage(Number(page ? page : 0));
  }, [setPage, page]);

  useEffect(() => {
    document.title = "Рейтинг"
  }, []);

  useEffect(() => {
    getRatings();
  }, [filters, getRatings, page]);

  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"text-h4 text-base-100"}>Рейтинг спортсменов</label>

      <div className={"flex flex-col gap-3 items-center xs:flex-row"}>
        <Dropdown
          items={gender}
          selectedItems={filters.gender ? [filters.gender] : []}
          onItemSelected={(item) => filtersActions.setGender(item as { id: "MALE" | "FEMALE" | "RESET", name: string })}
          placeholder={"Пол"}
        />

        <Dropdown
          items={categories}
          selectedItems={filters.category ? [filters.category] : []}
          onItemSelected={filtersActions.setCategory}
          placeholder={"Категория"}
        />

        <TextInput
          value={filters.startFrom ? filters.startFrom : ""} onChange={(e) => filtersActions.setStartFrom(Number(e.target.value))}
          title={"Кол-во стартов, от"} animatedLabel={false}
        />
      </div>
    </div>
  )
}
