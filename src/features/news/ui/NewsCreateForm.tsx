"use client"

import React, {useCallback} from "react";
import {Button, FileInput, TextInput} from "@/shared/ui";
import {useNewsCreateStore} from "@/features/news/model/NewsCreateStore";
import {useNewsStore} from "@/features/news";

interface PlacemarkCreateFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const NewsCreateForm: React.FC<PlacemarkCreateFormProps> = (
  props
) => {
  const {
    name, description, startDate, endDate, isFormValid,
    setName, setDescription, setStartDate, setEndDate, setMainImage, setAdditionalImage1, setAdditionalImage2
  } = useNewsCreateStore();
  const isCreating = useNewsStore((state) => state.isCreating);

  const fileUploadHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, setter: (file: File) => void) => {
      if (event.target.files) {
        setter(event.target.files[0]);
      }
    }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <div className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[500px] text-center items-center">
        <label className={"text-h5_bold text-base-95 text-center"}>Создание новости</label>

        <TextInput
          value={name} onChange={(e) => setName(e.target.value)}
          title={"Название"} required
        />

        <TextInput
          value={description} onChange={(e) => setDescription(e.target.value)}
          title={"Описание"} type={"area"} className={"min-h-[100px]"} required
        />

        <div className={"flex flex-row w-full gap-4"}>
          <TextInput
            value={startDate} onChange={(e) => setStartDate(e.target.value)}
            title={"Дата показа"} type={"date"} required
          />

          <TextInput
            value={endDate} onChange={(e) => setEndDate(e.target.value)}
            title={"Дата удаления"} type={"date"} required
          />
        </div>

        <FileInput
          onChange={(e) => fileUploadHandler(e, setMainImage)}
          title={"Основаная картинка"} accept={"image/*"}
        />
        <FileInput
          onChange={(e) => fileUploadHandler(e, setAdditionalImage1)}
          title={"Дополнительная картинка 1"} accept={"image/*"}
        />
        <FileInput
          onChange={(e) => fileUploadHandler(e, setAdditionalImage2)}
          title={"Дополнительная картинка 2"} accept={"image/*"}
        />

        <div className={"flex flex-row gap-4 mt-4 w-full"}>
          <Button
            variant={"tertiary"} palette={"gray"} className={"w-full"}
            onClick={props.onCancel}
          >
            Отменить
          </Button>

          <Button
            variant={"primary"} palette={"blue"} className={"w-full"}
            onClick={props.onSubmit} disabled={!isFormValid} isLoading={isCreating}
          >
            Создать новость
          </Button>
        </div>
      </div>
    </div>
  )
}
