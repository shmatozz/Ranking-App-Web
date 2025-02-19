import React from "react";
import {Button, Radio, TextInput} from "@/shared/ui";
import {useSwimCreateStore} from "@/widgets/profile";

interface SwimCreateFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export const SwimCreateForm: React.FC<SwimCreateFormProps> = (
  props
) => {
  const state = useSwimCreateStore();

  return (
    <div className={"flex flex-col w-full h-fit gap-2"}>
      <label className={"text-bodyM_regular text-base-90 text-center"}>Новый заплыв</label>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
        <TextInput
          value={state.distance} onChange={(e) => state.setDistance(Number(e.target.value))}
          title={"Дистанция"} type={"number"} min={0}
        />

        <TextInput
          value={state.ageFrom} onChange={(e) => state.setAgeFrom(Number(e.target.value))}
          title={"Возраст (от)"} type={"text"}
        />

        <TextInput
          value={state.ageTo} onChange={(e) => state.setAgeTo(Number(e.target.value))}
          title={"Возраст (до)"} type={"text"}
        />
      </div>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
        <TextInput
          value={state.style} onChange={(e) => state.setStyle(e.target.value)}
          title={"Стиль"} type={"text"}
        />

        <TextInput
          value={state.maxPoints} onChange={(e) => state.setMaxPoints(Number(e.target.value))}
          title={"Макс. очки"} type={"number"} min={0}
        />
      </div>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8 items-center"}>
        <div className="flex flex-col w-full gap-[0px]">
          <label
            className={"flex flex-row gap-1 w-full text-bodyS_regular text-base-40"}
          >
            {"Пол"}
          </label>

          <div className={"flex flex-row w-full gap-8 justify-center"}>
            <Radio checked={state.gender == "MIXED"} onClick={() => state.setGender("MIXED")} text={"Все"}/>
            <Radio checked={state.gender == "MALE"} onClick={() => state.setGender("MALE")} text={"Мужской"}/>
            <Radio checked={state.gender == "FEMALE"} onClick={() => state.setGender("FEMALE")} text={"Женский"}/>
          </div>
        </div>

        <TextInput
          value={state.startTime} onChange={(e) => state.setStartTime(e.target.value)}
          title={"Время начала"} type={"time"}
        />
      </div>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
        <Button
          onClick={props.onCancel}
          variant={"tertiary"} size={"S"} className={"w-full"}
        >
          Отмена
        </Button>

        <Button
          onClick={() => {
            props.onSubmit();
            state.clearForm();
          }}
          variant={"primary"} size={"S"} className={"w-full"} disabled={!state.isFormValid}
        >
          Создать заплыв
        </Button>
      </div>
    </div>
  )
}
