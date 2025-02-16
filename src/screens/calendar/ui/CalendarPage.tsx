import React from "react";
import {FiltersHeader, CompetitionsList} from "@/widgets/calendar";

export const CalendarPage = () => {
  return (
    <div
      className="content-container flex-col gap-4"
    >
      <FiltersHeader/>
      <CompetitionsList/>
    </div>
  )
}
