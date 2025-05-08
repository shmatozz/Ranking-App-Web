import React from "react";
import {Button, IconButton, Logo} from "@/shared/ui";

export const Footer = () => {
  return (
    <footer className="flex bg-base-5 h-fit min-h-[12rem] justify-center items-center bg-opacity-75">
      {/* Content */}
      <div className={"flex flex-col items-center h-full min-h-[12rem] max-w-[75rem] xs:flex-row"}>
        {/* Col 1 */}
        <div className={"flex w-full h-full flex-col items-center justify-between px-6 py-3 gap-4 xs:py-6"}>
          <Logo secondaryColor={"#DDDDDD"}/>

          <p className={"text-base-95 text-center text-bodyS_medium lg-md:text-bodyM_medium"}>
            © 2025 Система подсчёта рейтинга пловцов
          </p>
        </div>

        {/* Col 2 */}
        <div className={"flex w-full flex-col items-center justify-center px-6 py-3 gap-2 xs:py-6"}>
          <div className={"flex flex-row items-center gap-6"}>
            <IconButton icon={"vk"} palette={"gray"}/>
            <IconButton icon={"tg"} palette={"gray"}/>
          </div>

          <Button palette={"gray"} variant={"tertiary"} className={"text-bodyS_medium lg-md:text-bodyM_medium"}>
            Политика конфиденциальности
          </Button>
        </div>

        {/* Col 3 */}
        <div className={"flex w-full flex-col justify-between p-6 text-base-95 text-center text-bodyS_medium px-6 py-3 gap-4 xs:py-6 lg-md:text-bodyM_medium"}>
          <div>
            <p>{"+7 (831) 436-17-52"}</p>
            <p>{"nnov.hse.ru"}</p>
          </div>

          <div>
            <p>{"603093, г. Нижний Новгород,"}</p>
            <p>{"ул. Родионова, д. 136"}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
