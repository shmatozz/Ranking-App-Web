import React, {useEffect} from "react";
import {Dropdown, TextInput} from "@/shared/ui";
import {getSwimsDropDown} from "@/shared/lib";
import {useCompetitionStore} from "@/features/competition/get";
import {categories, gender, useParticipantsStore} from "@/widgets/competition";
import {UserParticipantCard} from "@/entities/user";
import clsx from "clsx";
import {useRouter, useSearchParams} from "next/navigation";

export const Participants = () => {
  const router = useRouter();
  const { competition, isLoading } = useCompetitionStore();
  const {
    selectedSwim, setSelectedSwim, users, getParticipants ,
    totalResults, totalPages, setPage, page
  } = useParticipantsStore();
  const isParticipantsLoading = useParticipantsStore(state => state.isLoading);
  const filters = useParticipantsStore((state) => state.filters);
  const filtersActions = useParticipantsStore((state) => state.filtersActions);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("p");

  useEffect(() => {
    if (selectedSwim) getParticipants(selectedSwim.id);
  }, [selectedSwim, getParticipants, filters]);

  useEffect(() => {
    setPage(Number(pageParam ? pageParam : 0));
  }, [setPage, pageParam]);

  const updatePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page.toString());
    router.push(`?${newParams.toString()}`, { scroll: false });
  }

  if (!competition || isLoading || !selectedSwim) {
    return null;
  }

  return (
    <div className={"flex flex-col px-1 py-4 gap-4 xs:px-4"}>
      <div className={"flex flex-col gap-2"}>
        <p className={"text-bodyM_medium text-base-95"}>Заплыв</p>

        <Dropdown
          items={getSwimsDropDown(competition.events)}
          selectedItems={[selectedSwim]}
          onItemSelected={(item) => setSelectedSwim(item)}
          placeholder={"Заплыв"}
        />
      </div>

      <div className={"flex flex-col"}>
        <p className={"text-bodyS_medium text-base-95"}>Фильтры</p>

        <div className={"flex flex-col gap-4 lg-md:flex-row items-center"}>
          <Dropdown
            items={gender}
            selectedItems={filters.gender ? [filters.gender] : []}
            onItemSelected={(item) => filtersActions.setGender(item as { id: "MALE" | "FEMALE" | "RESET", name: string })}
            placeholder={"Пол"}
          />

          <TextInput
            value={filters.age ? filters.age : ""} onChange={(e) => filtersActions.setAge(Number(e.target.value))}
            title={"Возраст"} type={"number"} animatedLabel={false}
          />

          <Dropdown
            items={categories}
            selectedItems={filters.category ? [filters.category] : []}
            onItemSelected={filtersActions.setCategory}
            placeholder={"Категория"}
          />
        </div>
      </div>

      <div className={"flex flex-col w-full gap-2 items-center"}>
        <div className={"flex flex-row w-full gap-[10px] px-4"}>
          <div className={"min-w-9"}/>
          <p className={"text-bodyS_medium text-base-95 w-full xs:text-bodyM_medium"}>ФИО</p>
          <p
            className={"hidden text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium xs:block"}>Рейтинг</p>
          <p
            className={"hidden text-bodyS_medium text-base-95 w-full max-w-[120px] text-center xs:text-bodyM_medium xs:block"}>Категория</p>
        </div>

        <div className={"h-[2px] w-full bg-base-5"}/>

        {!isParticipantsLoading && users && users.map((member) => (
          <UserParticipantCard key={member.fullName + member.rating} user={member}/>
        ))}

        {!isParticipantsLoading && users && users.length == 0 && (
          <p className={"w-full h-[48px] text-center content-center text-bodyM_regular text-base-95"}>
            На данный заплыв ещё никто не зарегистрировался
          </p>
        )}

        {isParticipantsLoading && Array(5).fill(0).map((_item, index) => (
          <UserParticipantCard key={index} isLoading={isParticipantsLoading}/>
        ))}

        {users && users.length > 0 && totalPages && page != undefined && totalPages > 0 && (
          <div className={"flex flex-col w-full justify-between items-center gap-4 xs:flex-row"}>
            <div className={"flex flex-row justify-center items-center gap-4"}>
              {Array.from({length: totalPages}, (_, index) => (
                <p
                  key={index} onClick={() => updatePage(index)}
                  className={clsx(
                    "cursor-pointer select-none px-4 rounded-full",
                    index == page ? "text-h5_bold text-base-95 bg-base-5" : "text-h5 text-base-70",
                  )}
                >
                  {index + 1}
                </p>
              ))}

              <div className={"flex flex-row cursor-pointer items-center text-bodyS_medium"}
                   onClick={page == totalPages - 1 ? undefined : () => updatePage(Math.min(totalPages - 1, page + 1))}>
                <p className={`select-none ${page == totalPages - 1 ? "text-base-40" : "text-base-95"}`}>дальше</p>
              </div>
            </div>

            <div className={"text-bodyS_medium text-base-90"}>
              {`Всего найдено: ${totalResults}`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
