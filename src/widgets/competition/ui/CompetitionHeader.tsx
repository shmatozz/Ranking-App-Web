import React, { useState } from "react";
import { useCompetitionStore } from "@/features/competition/get";
import { formatDate } from "@/shared/utils";
import { useSession } from "next-auth/react";
import {Button, Modal} from "@/shared/ui";
import {useRouter} from "next/navigation";

export const CompetitionHeader = () => {
  const router = useRouter();
  const {
    competition, deleteCompetition, isDeleting, isLoading
  } = useCompetitionStore();
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!competition || isLoading) {
    return (
      <div className={"flex flex-col gap-1"}>
        <label className={"loader text-h4"}>Название соревнования</label>
        <p className={"loader text-bodyM_regular"}>Дата соревнования</p>
      </div>
    );
  }

  const handleDelete = () => {
    deleteCompetition(competition.competitionUuid, () => {
      setIsModalOpen(false);

      if (window.history.length > 1) router.back();
      else router.replace("/calendar");
    });
  };

  return (
    <div className={"flex flex-row w-full gap-4 items-center"}>
      <div className={"flex flex-col w-full gap-1"}>
        <label className={"text-h4 text-base-95"}>{competition.name}</label>
        <p className={"text-bodyM_regular text-base-95"}>{formatDate(competition.date)}</p>
      </div>

      {session.data?.user?.email === competition.organizationInfo.email && (
        <>
          <Button
            variant={"tertiary"}
            palette={"gray"}
            size={"S"}
            onClick={() => setIsModalOpen(true)}
          >
            Удалить
          </Button>

          {isModalOpen && (
            <Modal>
              <p>Вы уверены, что хотите удалить своё соревнование?</p>
              <div className="flex gap-4 mt-4 justify-evenly">
                <Button variant="primary" size={"S"} onClick={handleDelete} isLoading={isDeleting}>Удалить</Button>
                <Button variant="secondary" size={"S"} onClick={() => setIsModalOpen(false)}>Отмена</Button>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
