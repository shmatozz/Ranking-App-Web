import React, {useEffect} from "react";
import {Dropdown} from "@/shared/ui";
import {getSwimsDropDown} from "@/shared/lib";
import {useCompetitionStore} from "@/features/competition/get";
import {useParticipantsStore} from "@/widgets/competition";
import {UserParticipantCard} from "@/entities/user";

export const Participants = () => {
  const { competition, isLoading } = useCompetitionStore();
  const { selectedSwim, setSelectedSwim, users, getParticipants } = useParticipantsStore();
  const isParticipantsLoading = useParticipantsStore(state => state.isLoading)

  useEffect(() => {
    if (competition && !selectedSwim) {
      setSelectedSwim(getSwimsDropDown(competition.events)[0])
    }
  }, [competition, selectedSwim, setSelectedSwim]);

  useEffect(() => {
    if (selectedSwim) getParticipants(selectedSwim.id);
  }, [selectedSwim, getParticipants]);

  if (!competition || isLoading || !selectedSwim) {
    return null;
  }

  return (
    <div className={"flex flex-col p-4 gap-4"}>
      <div className={"flex flex-col gap-2"}>
        <p className={"text-bodyM_medium text-base-95"}>Заплыв</p>

        <Dropdown
          items={getSwimsDropDown(competition.events)}
          selectedItems={[selectedSwim]}
          onItemSelected={(item) => setSelectedSwim(item)}
          placeholder={"Заплыв"}
        />
      </div>

      <div className={"flex flex-col w-full gap-2 items-center"}>
        <div className={"flex flex-row w-full gap-[10px] px-4"}>
          <div className={"min-w-9"}/>
          <p className={"text-bodyS_medium text-base-95 w-full xs:text-bodyM_medium"}>ФИО</p>
          <p
            className={"text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium"}>Рейтинг</p>
          <p
            className={"text-bodyS_medium text-base-95 w-full max-w-[80px] text-center xs:text-bodyM_medium"}>Старты</p>
        </div>

        <div className={"h-[2px] w-full bg-base-5"}/>

        {!isParticipantsLoading && users && users.map((member) => (
          <UserParticipantCard key={member.email} user={member}/>
        ))}

        {!isParticipantsLoading && users && users.length == 0 && (
          <p className={"w-full h-[48px] text-center content-center text-bodyM_regular text-base-95"}>
            На данный заплыв ещё никто не зарегистрировался
          </p>
        )}

        {isParticipantsLoading && Array(5).fill(0).map((_item, index) => (
          <UserParticipantCard key={index} isLoading={isParticipantsLoading}/>
        ))}
      </div>
    </div>
  )
}
