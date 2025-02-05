import React from "react";

interface CompetitionsCreateProps {
  role: "sportsman" | "organization";
}

export const CompetitionsCreate: React.FC<CompetitionsCreateProps> = ({
  role,
}) => {
  if (role == "sportsman") {
    return (
      <div className={"flex flex-col w-max h-fit gap-4"}>
        <label className={"text-h5_bold text-base-95 text-center"}>Создание соревнования</label>

        <div className={"h-1 w-max bg-base-5"}/>

      </div>
    )
  }

  return (
    <div>

    </div>
  )
}