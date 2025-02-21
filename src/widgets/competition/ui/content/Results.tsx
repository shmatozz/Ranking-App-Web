'use client';

import React from "react";
import {redirect, useSearchParams} from "next/navigation";
import {useCompetitionStore} from "@/features/competition/get";
import {getSwimsDropDown, isPassed} from "@/shared/lib";
import {useSession} from "next-auth/react";
import {Dropdown, FileInput} from "@/shared/ui";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

export const Results = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");
  const { competition, isLoading, uploadSwimResults } = useCompetitionStore();

  const [selectedSwim, setSelectedSwim] = React.useState<DropdownItem>();

  if (!competition || isLoading) {
    return null;
  }

  if (!isPassed(competition.date)) redirect("/calendar/competition?id=" + competitionUUID);

  if (session.data?.user?.email !== competition.organizationInfo.email) {
    return (
      <div className={"p-4 text-center text-blue-90"}>
        Организация ещё не опубликовала результаты
      </div>
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      uploadSwimResults(selectedSwim!.id, file);
    }
  };

  return (
    <div className={"flex flex-col p-4 gap-4"}>
      {/* DROPDOWN SWIM SELECT */}
      <div className={"flex flex-col gap-2"}>
        <p className={"text-bodyM_medium text-base-95"}>Заплыв</p>

        <Dropdown
          items={getSwimsDropDown(competition.events)}
          selectedItems={[selectedSwim ? selectedSwim : getSwimsDropDown(competition.events)[0]]}
          onItemSelected={(item) => {
            setSelectedSwim(item)
          }}
          placeholder={"Заплыв"}
        />
      </div>

      {/* RESULTS */}
      <div className={"flex flex-col items-center"}>
        <FileInput title={"Загрузить файл с результатами"} onChange={handleFileUpload}/>
      </div>
    </div>
  )
}
