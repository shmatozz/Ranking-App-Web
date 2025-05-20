"use client";

import React from "react";
import {Button, Dropdown, Radio, TextInput} from "@/shared/ui";
import {swimStyles, useSwimCreateStore} from "@/features/competition/create";

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

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-4"}>
        <TextInput
          value={state.distance} onChange={(e) => state.setDistance(Number(e.target.value))}
          title={"Дистанция"} id={"swim-distance"} type={"number"} min={0}
        />


        <TextInput
          value={state.maxParticipants} onChange={(e) => state.setMaxParticipants(Number(e.target.value))}
          title={"Макс. участников"} id={"swim-max-participants"} type={"text"}
        />

        <TextInput
          value={state.ageFrom} onChange={(e) => state.setAgeFrom(Number(e.target.value))}
          title={"Возраст (от)"} id={"swim-age-from"} type={"text"}
        />

        <TextInput
          value={state.ageTo} onChange={(e) => state.setAgeTo(Number(e.target.value))}
          title={"Возраст (до)"} id={"swim-age-to"} type={"text"}
        />
      </div>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-4"}>
        <div className={"flex flex-col w-full justify-between"}>
          <p className={"text-bodyS_regular text-base-40"}>Стиль плаванья</p>

          <Dropdown
            items={swimStyles}
            selectedItems={[state.style]}
            onItemSelected={state.setStyle}
            placeholder={"Стиль"}
          />
        </div>

        <div className="flex flex-row w-full gap-4">
          <TextInput
            value={state.price} onChange={(e) => state.setPrice(Number(e.target.value))}
            title={"Стартовый взнос, ₽"} id={"swim-payment-amount"} type={"number"} min={0}
          />
        </div>
      </div>

      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-4 items-center"}>
        <div className="flex flex-col w-full gap-[0px]">
          <label
            className={"flex flex-row gap-1 w-full text-bodyS_regular text-base-40"}
          >
            {"Пол"}
          </label>

          <div className={"flex flex-row w-full gap-4 justify-center"}>
            <Radio checked={state.gender == "MIXED"} onClick={() => state.setGender("MIXED")} text={"Все"}/>
            <Radio checked={state.gender == "MALE"} onClick={() => state.setGender("MALE")} text={"Мужской"}/>
            <Radio checked={state.gender == "FEMALE"} onClick={() => state.setGender("FEMALE")} text={"Женский"}/>
          </div>
        </div>

        <div className="flex flex-row w-full gap-4">
          <TextInput
            value={state.startTime} onChange={(e) => state.setStartTime(e.target.value)}
            title={"Время начала"} id={"swim-time-start"} type={"time"}
          />

          <TextInput
            value={state.duration} onChange={(e) => state.setDuration(e.target.value)}
            title={"Длительность"} id={"swim-duration"} type={"time"} step="1"
            tooltipText={"Расчётное время за которое планируется провести заплыв"}
          />
        </div>
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
