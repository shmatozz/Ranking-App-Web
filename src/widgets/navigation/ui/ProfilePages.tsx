import React from "react";
import {Subpages} from "@/entities/user";
import {quit, Role} from "@/shared/lib";
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
          onClick={() => setPage(role == "ORGANIZATION" ? "members" : "results")}
        >
          {role == "ORGANIZATION" ? "Мои участники" : "Мои результаты"}
        </Button>

        {role == "ADMIN" && (
          <Button
            size={"M"} variant={page == "admin" ? "primary" : "tertiary"}
            className={"w-full"}
            onClick={() => setPage("admin")}
          >
            {"Панель управления"}
          </Button>
        )}
      </div>

      <div className={"flex flex-row w-full gap-4 xs:hidden"}>
        <IconButton
          icon={"account"}
          size={"M"} variant={page == "info" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("info")}
        />

        <IconButton
          icon={"trophy"}
          size={"M"} variant={page == "comps" || page == "comps-create" ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage("comps")}
        />

        <IconButton
          icon={role == "ORGANIZATION" ? "members" : "podium"}
          size={"M"} variant={(page == "results" || page == "members") ? "primary" : "tertiary"}
          className={"w-full"}
          onClick={() => setPage(role == "ORGANIZATION" ? "members" : "results")}
        />

        {role == "ADMIN" && (
          <IconButton
            icon={"admin"}
            size={"M"} variant={page == "admin" ? "primary" : "tertiary"}
            className={"w-full"}
            onClick={() => setPage("admin")}
          />
        )}
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
      />
    </div>
  )
}
