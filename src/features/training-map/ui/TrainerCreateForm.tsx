"use client"

import React from "react";
import {Button, FileInput, TextInput} from "@/shared/ui";

interface TrainerCreateFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
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
        <label className={"text-h5_bold text-base-95 text-center"}>Создание точки</label>

        <TextInput title={"Фамилия"} name={"lastName"} required/>
        <TextInput title={"Имя"} name={"firstName"} required/>
        <TextInput title={"Отчество"} name={"middleName"}/>

        <TextInput
          type={"area"} className={"min-h-[100px]"}
          title={"Информация"} name={"description"}
        />

        <FileInput title={"Фото"} name={"image"}/>

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
            Добавить тренера
          </Button>
        </div>
      </form>
    </div>
  )
}
