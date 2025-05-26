"use client"

import React from "react";
import {Button, TextInput} from "@/shared/ui";
import {useMapStore, usePlacemarkCreateStore} from "@/features/training-map";

interface PlacemarkCreateFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  edit?: boolean
}

export const PlacemarkCreateForm: React.FC<PlacemarkCreateFormProps> = (
  props
) => {
  const {
    name, description, email, coordinates, isFormValid,
    setName, setDescription, setEmail
  } = usePlacemarkCreateStore();

  const { isLoading } = useMapStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <div className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[500px] text-center items-center">
        <label className={"text-h5_bold text-base-95 text-center"}>{props.edit ? "Редактирование точки": "Создание точки"}</label>

        <TextInput
          value={name} onChange={(e) => setName(e.target.value)}
          title={"Название"}
        />

        <TextInput
          value={description} onChange={(e) => setDescription(e.target.value)}
          title={"Описание"} type={"area"} className={"min-h-[100px]"}
        />

        <TextInput
          value={coordinates.toString()}
          title={"Координаты"} disabled
        />

        <TextInput
          value={email} onChange={(e) => setEmail(e.target.value)}
          title={"Email"}
        />

        <div className={"flex flex-row gap-4 w-full"}>
          <Button
            variant={"tertiary"} palette={"gray"} className={"w-full"}
            onClick={props.onCancel}
          >
           Отменить
          </Button>

          <Button
            variant={"primary"} palette={"blue"} className={"w-full"}
            onClick={props.onSubmit} disabled={!isFormValid} isLoading={isLoading}
          >
            Добавить метку
          </Button>
        </div>
      </div>
    </div>
  )
}
