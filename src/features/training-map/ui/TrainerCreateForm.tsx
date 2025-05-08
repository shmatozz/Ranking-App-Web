"use client"

import React from "react";
import {Button, FileInput, TextInput} from "@/shared/ui";
import {Trainer} from "@/features/training-map";

interface TrainerCreateFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  predefinedData?: Trainer;
}

export const TrainerCreateForm: React.FC<TrainerCreateFormProps> = (
  props
) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    props.onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <form
        className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[500px] text-center items-center"
        onSubmit={handleSubmit}
      >
        <label className={"text-h5_bold text-base-95 text-center"}>
          {props.predefinedData ? "Редактирование тренера" : "Добавление тренера"}
        </label>

        <TextInput
          title={"Фамилия"} name={"lastName"} required
          defaultValue={props.predefinedData ? props.predefinedData.lastName : ""}
        />

        <TextInput
          title={"Имя"} name={"firstName"} required
          defaultValue={props.predefinedData ? props.predefinedData.firstName : ""}
        />

        <TextInput
          title={"Отчество"} name={"middleName"}
          defaultValue={props.predefinedData && props.predefinedData.middleName ? props.predefinedData.middleName : ""}
        />

        <TextInput
          type={"area"} className={"min-h-[75px]"}
          title={"Образование"} name={"education"}
          defaultValue={props.predefinedData && props.predefinedData.education ? props.predefinedData.education : ""}
        />

        <TextInput
          type={"area"} className={"min-h-[75px]"}
          title={"Специализация"} name={"specialization"}
          defaultValue={props.predefinedData && props.predefinedData.specialization ? props.predefinedData.specialization : ""}
        />

        <TextInput
          type={"area"} className={"min-h-[75px]"}
          title={"Достижения"} name={"achievements"}
          defaultValue={props.predefinedData && props.predefinedData.achievements ? props.predefinedData.achievements : ""}
        />

        <FileInput
          title={"Фото"} name={"image"}
        />

        <div className={"flex flex-row gap-4 w-full"}>
          <Button
            variant={"tertiary"} palette={"gray"} className={"w-full"}
            onClick={props.onCancel}
          >
            Отменить
          </Button>

          <Button
            variant={"primary"} palette={"blue"} className={"w-full"} type={"submit"}
          >
            {props.predefinedData ? "Сохранить" : "Добавить тренера"}
          </Button>
        </div>
      </form>
    </div>
  )
}
