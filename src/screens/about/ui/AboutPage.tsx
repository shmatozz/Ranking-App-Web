import React from "react";
import {AboutUsText} from "@/widgets/about-page-sections";

export const AboutPage = () => {
  return (
    <div className="content-container flex-col gap-4">
      <label className={"text-h4 text-base-100"}>О нас</label>

      <AboutUsText/>

      <div className={"w-full h-[3px] bg-base-5"}/>

      <div className={"flex flex-col gap-2"}>
        <p className={"text-bodyM_medium text-base-95"}>Партнеры</p>

        <span className={"text-bodyM_regular text-base-95 whitespace-pre-wrap"}>
          <li>{"ООО НФГ \"Сеть фитнес клубов Физкульт\""}</li>
          <li>{"Организатор заплывов и соревнований «Ночная Лига»"}</li>
          <li>{"ФПНО - Федерация Плавания Нижегородской Области"}</li>
          <li>{"ФПОНО - федерация плавания в открытой воде Нижегородской Области"}</li>
          <li>{"ФПМ - федерация плавания мастерс"}</li>
          <li>{"РОО ФПНО - РЕГИОНАЛЬНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ \"ФЕДЕРАЦИЯ ЗИМНЕГО ПЛАВАНИЯ НИЖЕГОРОДСКОЙ ОБЛАСТИ\""}</li>
          <li>{"АНО Виктория Центр"}</li>
          <li>{"ФТНО - федерация триллиона нижегородской области"}</li>
          <li>{"Триатлон клуб - Триатлон НН"}</li>
          <li>{"Беговой клуб - DiM TeaM"}</li>
        </span>
      </div>

      <div className={"w-full h-[3px] bg-base-5"}/>

      <div className={"flex flex-col gap-4"}>
        <p className={"text-bodyM_medium text-base-95"}>Спонсоры</p>

        <span className={"text-bodyM_regular text-base-95 whitespace-pre-wrap"}>
          <li>{"Плавательный бренд Med Weav"}</li>
          <li>{"Спортивное питание Muscle Bar"}</li>
          <li>{"Бренд спортивной одежды glavsport"}</li>
        </span>
      </div>
    </div>
  )
}
