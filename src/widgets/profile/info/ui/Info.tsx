import React from "react";
import {UserInfo} from "@/entities/user";
import {OrganizationInfo} from "@/entities/organization";

interface InfoProps {
  role: "sportsman" | "organization";
}

export const Info: React.FC<InfoProps> = ({
  role,
}) => {
  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Данные</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {role == "sportsman" && (
        <UserInfo/>
      )}

      {role == "organization" && (
        <OrganizationInfo/>
      )}
    </div>
  )
}