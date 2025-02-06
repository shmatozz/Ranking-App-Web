import React from "react";
import {Role, Subpages} from "@/entities/user";
import {quit} from "@/shared/lib";
import {Button} from "@/shared/ui";

interface ProfilePageProps {
  role: Role;
  page: Subpages;
  setPage: (page: Subpages) => void;
}

export const ProfilePages: React.FC<ProfilePageProps> = ({
  role,
  page, setPage
}) => {
  return (
    <div className={"flex flex-col h-full w-full gap-4 justify-between"}>
      <div className={"flex flex-col gap-4"}>
        <Button
          size={"M"} variant={page == "info" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("info")}
        >
          Мои данные
        </Button>

        <Button
          size={"M"} variant={page == "comps" || page == "comps-create" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("comps")}
        >
          Мои соревнования
        </Button>

        <Button
          size={"M"} variant={(page == "results" || page == "members") ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage(role == "organization" ? "members" : "results")}
        >
          { role == "organization" ? "Мои участники" : "Мои результаты"}
        </Button>
      </div>

      <Button
        size={"S"} variant={"primary"} palette={"gray"}
        className={"w-full"} onClick={quit}
      >
        Выйти
      </Button>
    </div>
  )
}