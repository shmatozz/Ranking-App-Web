import React, {useEffect} from "react";
import {useCompetitionsStore} from "@/widgets/profile";
import {CompetitionCard} from "@/entities/competition";
import {Button} from "@/shared/ui";
import {Role} from "@/shared/lib";
import {useRouter} from "next/navigation";
import {useOrganizationStore} from "@/entities/organization";

interface CompetitionsProps {
  role: Role;
  onCreateCompetitionClick?: () => void;
}

export const Competitions: React.FC<CompetitionsProps> = ({
  role,
  onCreateCompetitionClick = () => console.log("onCreateCompetitionClick called"),
}) => {
  const router = useRouter();
  const passed = useCompetitionsStore((state) => state.passed);
  const upcoming = useCompetitionsStore((state) => state.upcoming);
  const getCompetitions = useCompetitionsStore((state) => state.getCompetitions);
  const isCompetitionsLoading = useCompetitionsStore((state) => state.isLoading);
  const isOrgLoading = useOrganizationStore((state) => state.isLoading);

  useEffect(() => {
    if ((!passed || !upcoming) && role == "ORGANIZATION" && !isCompetitionsLoading && !isOrgLoading) {
      console.log("[getCompetitions, passed, role, upcoming]")
      getCompetitions();
    }
  }, [getCompetitions, isCompetitionsLoading, isOrgLoading, passed, role, upcoming]);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Соревнования</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {role == "ORGANIZATION" && (
        <div className={"flex flex-col w-full gap-1"}>
          <div className={"flex flex-row w-full items-center gap-4"}>
            <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Проведено
              стартов</p>
            <p className={"w-full text-bodyS_regular text-base-95 text-center xs:text-bodyM_regular"}>Среднее количество
              участников</p>
          </div>

          {!isCompetitionsLoading && passed && (
            <div className={"flex flex-row w-full gap-1"}>
              <p className={"w-full text-h5_bold text-blue-80 text-center"}>{passed.length != 0 ? passed.length : "-"}</p>
              <p className={"w-full text-h5_bold text-blue-80 text-center"}>{passed.length != 0 ? 65 : "-"}</p>
            </div>
          )}

          {isCompetitionsLoading && (
            <div className={"flex flex-row w-full gap-1 text-h5_bold text-base-5"}>
              <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>50</p></div>
              <div className={"flex w-full justify-center"}><p className={"w-fit px-4 bg-base-5 text-center rounded-md animate-pulse"}>65</p></div>
            </div>
          )}
        </div>
      )}

      {/* UPCOMING */}
      {upcoming && upcoming.length > 0 && (
        <div className={"flex flex-col w-full gap-4 items-center"}>
          <label className={"w-full text-bodyM_medium text-base-95"}>Предстоящие</label>

          {!isCompetitionsLoading && upcoming && upcoming.map((comp) => (
            <CompetitionCard key={comp.competitionUuid} competition={comp} onClick={() => router.push(`/calendar/competition?id=${comp.competitionUuid}`)} />
          ))}
        </div>
      )}

      {isCompetitionsLoading && Array(1).fill(0).map((_comp, index) => (
        <CompetitionCard key={index} isLoading={isCompetitionsLoading}/>
      ))}

      {((upcoming && upcoming.length == 0) || (!isCompetitionsLoading && !upcoming)) && (
        <p className={"flex flex-col w-full text-center items-center text-bodyM_regular text-base-90 gap-1"}>
          Нет предстоящих соревнований

          {role == "USER" && (
            <Button
              variant={"tertiary"} size={"S"}
              onClick={() => router.push("/calendar")}
            >
              Подобрать
            </Button>
          )}
        </p>
      )}

      {/* ADD NEW COMPETITION */}
      {role == "ORGANIZATION" && (
        <Button variant={"secondary"} size={"M"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
                onClick={onCreateCompetitionClick}>
          Добавить соревнование
        </Button>
      )}

      {/* PASSED */}
      {passed && passed.length > 0 && (
        <div className={"flex flex-col w-full gap-4"}>
          <label className={"text-bodyM_medium text-base-95"}>Прошедшие</label>

          {!isCompetitionsLoading && passed && passed.map((comp) => (
            <CompetitionCard key={comp.competitionUuid} competition={comp} onClick={() => router.push(`/calendar/competition?id=${comp.competitionUuid}`)}/>
          ))}
        </div>
      )}
    </div>
  )
}
