import React, {useEffect} from "react";
import {useResultsStore} from "@/widgets/profile";
import {UserResultsCard} from "@/entities/competition";
import {Button} from "@/shared/ui";
import {useRouter} from "next/navigation";

export const Results: React.FC = () => {
  const router = useRouter();
  const results = useResultsStore((state) => state.results);
  const getResults = useResultsStore((state) => state.getResults);
  const isLoading = useResultsStore((state) => state.isLoading);

  useEffect(() => {
    if (!results) getResults();
  }, [results, getResults]);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Результаты</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {!results || isLoading ? (
        <div className={"flex flex-row w-full gap-4 items-center justify-center"}>
          <p className={"text-bodyM_regular text-base-40"}>Всего очков рейтинга:</p>
          <p className={"text-h5 loader"}>Рейтинг пользователя</p>
        </div>
      ) : (
        results.userRating ? (
          <div className={"flex flex-row w-full gap-4 items-center justify-center"}>
            <p className={"text-bodyM_regular text-base-40"}>Всего очков рейтинга:</p>
            <p className={"text-h5 text-blue-90"}>{results.userRating}</p>
          </div>
        ) : (
          <div className={"flex flex-col w-full gap-1 items-center justify-center"}>
            <p className={"text-bodyM_regular text-base-40 text-center"}>Вы ещё не получили рейтинг. Примите участие в любом соревновании.</p>
            <Button
              variant={"tertiary"} size={"S"}
              onClick={() => router.push("/calendar")}
            >
              Подобрать
            </Button>
          </div>
        )
      )}

      {/* RESULTS */}
      {!results || isLoading ? (
        <>
          <UserResultsCard/>
          <UserResultsCard/>
          <UserResultsCard/>
        </>
      ) : (
        results.competitions.map((result) => (
          <UserResultsCard key={result.competitionName + result.events.length} result={result}/>
        ))
      )}
    </div>
  )
}
