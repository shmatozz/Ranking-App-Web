"use client"

import React from "react";
import {RecordsTable} from "@/features/admin-panel/records";
import {AddCuratorForm} from "@/features/admin-panel/curator";

export const Admin = () => {
  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Панель управления</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      <div className={"w-full"}>
        <p className={"text-bodyS_medium text-base-95 w-full"}>Добавить куратора</p>
        <AddCuratorForm/>
      </div>

      <div className={"flex h-1 w-full bg-base-5"}/>

      <p className={"text-bodyS_medium text-base-95 w-full"}>Рекорды</p>
      <RecordsTable/>
    </div>
  )
}
