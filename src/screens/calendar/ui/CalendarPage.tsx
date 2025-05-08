import React, {Suspense} from "react";
import {FiltersHeader, CompetitionsList} from "@/widgets/calendar";

export const CalendarPage = async () => {
  return (
    <div
      className="content-container flex-col gap-4"
    >
      <Suspense>
        <FiltersHeader/>
      </Suspense>
      <CompetitionsList/>
    </div>
  )
}
