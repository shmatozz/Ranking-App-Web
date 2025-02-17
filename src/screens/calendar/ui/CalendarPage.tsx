import React from "react";
import {FiltersHeader, CompetitionsList} from "@/widgets/calendar";
import {auth} from "@/shared/lib";
import {redirect} from "next/navigation";

export const CalendarPage = async () => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div
      className="content-container flex-col gap-4"
    >
      <FiltersHeader/>
      <CompetitionsList/>
    </div>
  )
}
