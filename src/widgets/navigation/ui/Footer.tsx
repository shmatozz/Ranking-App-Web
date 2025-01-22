import React from "react";
import {Button, IconButton, Logo} from "@/shared/ui";

export const Footer = () => {
  return (
    <footer className="flex bg-base-5 h-[12.5rem] justify-center bg-opacity-75">
      {/* Content */}
      <div className={"flex flex-row h-full max-w-[75rem]"}>
        {/* Col 1 */}
        <div className={"flex w-full flex-col items-center justify-between p-6"}>
          <Logo secondaryColor={"#DDDDDD"}/>

          <p className={"text-bodyM_medium text-base-95 text-center"}>
            © 2025 Система подсчёта рейтинга пловцов
          </p>
        </div>

        {/* Col 2 */}
        <div className={"flex w-full flex-col items-center justify-center p-6 gap-1"}>
          <div className={"flex flex-row items-center gap-6"}>
            <IconButton icon={"vk"} palette={"gray"}/>
            <IconButton icon={"tg"} palette={"gray"}/>
          </div>

          <Button palette={"gray"} variant={"tertiary"}>
            Политика конфиденциальности
          </Button>
        </div>

        {/* Col 3 */}
        <div className={"flex w-full flex-col justify-between p-6 text-bodyM_medium text-base-95 text-center"}>
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
