import React from "react";
import {Role, Subpages} from "@/entities/user";
import {quit} from "@/shared/lib";
import {Button, IconButton} from "@/shared/ui";

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
    <div className={"flex flex-row h-full w-full gap-4 items-center justify-between lg-md:flex-col"}>
      <div className={"hidden xs:flex xs:flex-row w-full gap-4 lg-md:flex-col"}>
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
          {role == "organization" ? "Мои участники" : "Мои результаты"}
        </Button>
      </div>

      <div className={"flex flex-row w-full gap-4 xs:hidden"}>
        <IconButton
          icon={"account"}
          size={"M"} variant={page == "info" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("info")}
        >
          Мои данные
        </IconButton>

        <IconButton
          icon={"trophy"}
          size={"M"} variant={page == "comps" || page == "comps-create" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("comps")}
        >
          Мои соревнования
        </IconButton>

        <IconButton
          icon={role == "organization" ? "members" : "podium"}
          size={"M"} variant={(page == "results" || page == "members") ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage(role == "organization" ? "members" : "results")}
        >
          {role == "organization" ? "Мои участники" : "Мои результаты"}
        </IconButton>
      </div>


      <Button
        size={"S"} variant={"primary"} palette={"gray"}
        className={"hidden xs:flex w-fit lg-md:w-full"} onClick={quit}
      >
        Выйти
      </Button>

      <IconButton
        icon={"logout"}
        size={"S"} variant={"primary"} palette={"gray"}
        className={"xs:hidden"} onClick={quit}
      >
        Выйти
      </IconButton>
    </div>
  )
}