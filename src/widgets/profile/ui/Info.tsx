import React from "react";

interface InfoProps {
  type: "user" | "organization";
}

export const Info: React.FC<InfoProps> = ({
  type,
}) => {
  if (type == "user") {
    return (
      <div className={"flex flex-col w-max h-fit gap-4"}>
        <label className={"text-h5_bold text-base-95 text-center"}>Данные</label>

        <div className={"h-1 w-max bg-base-5"}/>

      </div>
    )
  }

  return (
    <div>

    </div>
  )
}