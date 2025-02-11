import React, {useEffect} from "react";
import {useCompetitionsStore} from "@/widgets/profile";
import {CompetitionCard} from "@/entities/competition";
import {Button} from "@/shared/ui";
import {Role} from "@/shared/lib";

interface CompetitionsProps {
  role: Role;
  onCreateCompetitionClick?: () => void;
}

export const Competitions: React.FC<CompetitionsProps> = ({
  role,
  onCreateCompetitionClick = () => console.log("onCreateCompetitionClick called"),
}) => {
  const passed = useCompetitionsStore((state) => state.passed);
  const upcoming = useCompetitionsStore((state) => state.upcoming);
  const getCompetitions = useCompetitionsStore((state) => state.getCompetitions);

  useEffect(() => {
    getCompetitions();
  }, [getCompetitions])
  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Соревнования</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {role == "ORGANIZATION" && (
        <div className={"flex flex-col w-full gap-1"}>
          <div className={"flex flex-row w-full items-center gap-4"}>
            <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Проведено стартов</p>
            <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Среднее количество
              участников</p>
          </div>

          <div className={"flex flex-row w-full gap-1"}>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>10</p>
            <p className={"w-full text-h5_bold text-blue-80 text-center"}>65</p>
          </div>
        </div>
      )}

      {/* UPCOMING */}
      <div className={"flex flex-col w-full gap-4 items-center"}>
        <label className={"w-full text-bodyM_medium text-base-95"}>Предстоящие</label>

        {upcoming.map((comp) => (
          <CompetitionCard key={comp.competitionUuid} competition={comp}/>
        ))}

        {role == "ORGANIZATION" && (
          <Button variant={"secondary"} size={"M"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
                  onClick={onCreateCompetitionClick}>
            Добавить соревнование
          </Button>
        )}
      </div>

      {/* PASSED */}
      <div className={"flex flex-col w-full gap-4"}>
        <label className={"text-bodyM_medium text-base-95"}>Прошедшие</label>

        {passed.map((comp) => (
          <CompetitionCard key={comp.competitionUuid} competition={comp}/>
        ))}
      </div>
    </div>
  )
}
