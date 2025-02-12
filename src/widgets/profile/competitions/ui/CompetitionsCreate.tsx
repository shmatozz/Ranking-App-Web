import React from "react";
import {Button, Checkbox, FileInput, TextInput} from "@/shared/ui";
import {useCompetitionsCreateStore} from "@/widgets/profile";

interface CompetitionsCreateProps {
  onCancel: () => void;
}

export const CompetitionsCreate: React.FC<CompetitionsCreateProps> = ({
  onCancel
}) => {
  const state = useCompetitionsCreateStore();

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Создание соревнования</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* COMMON INFO */}
      <div className={"flex flex-col w-full gap-2"}>
        <label className={"w-full text-bodyM_medium text-base-95"}>Общая информация</label>

        <TextInput inputSize={"M"} title={"Название старта"} icon={"trophy"}/>

        <TextInput inputSize={"M"} title={"Место проведения"} icon={"location"}/>

        <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
          <TextInput inputSize={"M"} title={"Дата"} type={"date"}/>
          <TextInput inputSize={"M"} title={"Макс. кол-во участников"} type={"number"} min={0} icon={"members"}/>
        </div>

        <TextInput inputSize={"M"} title={"Описание"} type={"area"} className={"h-40"}/>

        <div className={"flex flex-col gap-1"}>
          <TextInput
            value={state.contact} onChange={(e) => state.setContact(e.target.value) }
            inputSize={"M"} title={"Контакт"} type={"text"} icon={"forum"}
          />

          <Checkbox
            checked={state.contactFromProfile}
            text={"Использовать контакт из профиля"}
            onClick={() => { state.setContactFromProfile(!state.contactFromProfile) }}
          />
        </div>

        <FileInput
          title={"Положение"} accept={".pdf"}
        />
      </div>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* EVENTS */}
      <div className={"flex flex-col w-full gap-4 items-center"}>
        <label className={"w-full text-bodyM_medium text-base-95"}>Заплывы</label>

        <Button variant={"secondary"} size={"M"} rightIcon={"plus"} className={"w-full max-w-[350px]"}>
          Добавить заплыв
        </Button>
      </div>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* BUTTONS */}
      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
        <Button
          variant={"tertiary"} size={"M"} className={"w-full"} onClick={onCancel}
        >
          Отменить создание
        </Button>

        <Button
          variant={"primary"} size={"M"} className={"w-full"}
        >
          Создать
        </Button>
      </div>
    </div>
  )
}
