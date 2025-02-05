import React from "react";
import {UserInfoField} from "@/entities/user/ui/UserInfoField";
import {Checkbox} from "@/shared/ui";

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

      {
        role == "sportsman" && (
          <div className={"flex flex-col w-full max-w-[500px] gap-4"}>
            <UserInfoField title={"Фамилия"} value={"Барышев"}/>
            <UserInfoField title={"Имя"} value={"Матвей"}/>
            <UserInfoField title={"Отчество"} value={"Ильич"}/>
            <UserInfoField title={"Дата рождения"} value={"19.09.2003"}/>
            <UserInfoField title={"Email"} value={"matvey33.baryshev@mail.ru"} editable/>
            <UserInfoField title={"Номер телефона"} value={"+79157797661"} editable/>
            <UserInfoField title={"Экстренный телефон"} value={"+79157797661"}/>
            <UserInfoField title={"Пол"} value={"Мужской"}/>
          </div>
        )
      }

      {
        role == "organization" && (
          <div className={"flex flex-col w-full max-w-[500px] gap-4"}>
            <UserInfoField title={"Название организации"} value={"Физкульт"}/>
            <UserInfoField title={"Email"} value={"fizcult@mail.com"} editable/>
            <UserInfoField title={"Контактный номер организации"} value={"+79999999999"}/>

            <Checkbox
              name={"isOpen"} text={"Открытая организация"}
              tooltipText={"Любой спортсмен сможет присоединиться к организации без подтверждения"}
            />
          </div>
        )
      }
    </div>
  )
}