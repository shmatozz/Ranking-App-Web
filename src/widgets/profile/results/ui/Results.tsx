import React from "react";

interface ResultsProps {
}

export const Results: React.FC<ResultsProps> = ({

}) => {
  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Результаты</label>

      <div className={"flex h-1 w-full bg-base-5"}/>
    </div>
  )
}