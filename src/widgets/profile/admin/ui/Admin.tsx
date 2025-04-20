"use client"

import React from "react";
import {Button, TextInput} from "@/shared/ui";
import {useAdminPanelStore} from "@/widgets/profile/admin";
import {RecordsTable} from "@/features/admin-panel/records";

export const Admin = () => {
  const { addCurator, addCuratorError } = useAdminPanelStore()

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Панель управления</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      <form
        className={"flex flex-col w-full"}
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          addCurator(data);
        }}
      >
        <p className={"text-bodyS_medium text-base-95"}>Добавить куратора</p>

        {addCuratorError && (
          <div className={"px-4 py-2 rounded-2xl bg-red-5"}>
            <p className={"text-bodyM_regular text-red-70 text-center"}>{addCuratorError}</p>
          </div>
        )}

        <TextInput name={"email"} title={"Email организации"} type={"email"} required/>

        <div className={"flex flex-col w-full items-center mt-2"}>
          <Button variant={"primary"} size={"S"} className={"w-full max-w-[250px]"} type={"submit"}>
            Добавить
          </Button>
        </div>
      </form>

      <div className={"h-[3px] w-full bg-base-5"}/>

      <p className={"text-bodyS_medium text-base-95 w-full"}>Рекорды</p>

      <RecordsTable/>
    </div>
  )
}
