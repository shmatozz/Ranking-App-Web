import React, {useEffect} from "react";
import {useResultsStore} from "@/widgets/profile";
import {UserResultsCard} from "@/entities/competition";

export const Results: React.FC = () => {
  const results = useResultsStore((state) => state.results);
  const getResults = useResultsStore((state) => state.getResults);

  useEffect(() => {
    getResults();
  }, [getResults]);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Результаты</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      <div className={"flex flex-row w-full gap-4 items-center justify-center"}>
        <p className={"text-bodyM_regular text-base-40"}>Всего очков рейтинга:</p>
        <p className={"text-h5 text-blue-90"}>399</p>
      </div>

      {/* RESULTS */}
      {results.map((result) => (
        <UserResultsCard key={result.competitionUuid} result={result}/>
      ))}
    </div>
  )
}