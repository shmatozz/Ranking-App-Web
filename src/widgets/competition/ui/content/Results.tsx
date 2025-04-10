'use client';

import React, {useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";
import {SwimResultsForm, useCompetitionStore} from "@/features/competition/get";
import {getSwimsDropDown, isPassed} from "@/shared/lib";
import {useSession} from "next-auth/react";
import {Button, Dropdown, FileInput} from "@/shared/ui";
import {useParticipantsStore} from "@/widgets/competition";

export const Results = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const competitionUUID = searchParams.get("id");

  const { competition, isLoading, uploadSwimResults, uploadSwimResultsByForm } = useCompetitionStore();
  const { selectedSwim, swimDistance, usersFull, getSwimFull, setSelectedSwim } = useParticipantsStore();

  const [resultsFormVisible, setResultsFormVisible] = React.useState(false);

  const [resultsInputs, setResultsInputs] = React.useState<SwimResultsForm[]>([]);

  useEffect(() => {
    if (!usersFull && selectedSwim) getSwimFull(selectedSwim.id)
  }, [getSwimFull, selectedSwim, usersFull]);

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

      <div className={"hidden flex-col w-full gap-2 lg:flex"}>
        <p className={"text-bodyM_medium text-center"}>или</p>

        <Button
          className={"self-center w-full max-w-[350px]"}
          onClick={() => setResultsFormVisible(true)}
        >
          Заполнить вручную
        </Button>
      </div>

      {resultsFormVisible && (
        <div className="hidden flex-col fixed inset-0 z-50 bg-white overflow-auto p-6 lg:flex">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ручной ввод результатов</h2>
            <button
              onClick={() => setResultsFormVisible(false)}
              className="text-gray-500 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {usersFull?.map((user) => (
              <div
                key={user.email}
                className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center border-b pb-2"
              >
                <span className="col-span-2">{`${user.lastName} ${user.firstName} ${user.middleName} - ${user.email}`}</span>

                {["hour", "minute", "second", "nano"].map((unit) => (
                  <input
                    key={unit}
                    type="number"
                    min={0}
                    max={unit === "hour" ? 23 : 59}
                    placeholder={unit == "hour" ? "Часы" : (unit == "minute" ? "Минуты" : (unit == "second" ? "Секунды" : "Милисекунды"))}
                    className="border rounded p-1 w-full"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setResultsInputs((prev) => {
                        const existing = prev.find((res) => res.userEmail === user.email);
                        const updated = {
                          userEmail: user.email,
                          distance: swimDistance,
                          gender: user.gender,
                          userTime: {
                            hour: existing?.userTime.hour ?? 0,
                            minute: existing?.userTime.minute ?? 0,
                            second: existing?.userTime.second ?? 0,
                            nano: 0,
                            ...(existing?.userTime || {})
                          },
                          ...existing
                        };

                        updated.userTime[unit as "hour" | "minute" | "second"] = isNaN(value) ? 0 : value;

                        return [
                          ...prev.filter((r) => r.userEmail !== user.email),
                          updated
                        ];
                      });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <Button
            className="mt-6 w-full max-w-[350px] self-center"
            onClick={() => {
              console.log("Sending to backend:", resultsInputs);
              if (selectedSwim) uploadSwimResultsByForm(selectedSwim.id, resultsInputs)
              setResultsFormVisible(false);
            }}
            disabled={usersFull && resultsInputs.length < usersFull.length}
          >
            Отправить результаты
          </Button>
        </div>
      )}
    </div>
  )
}
