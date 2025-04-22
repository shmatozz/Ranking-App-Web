"use client";

import React from "react";
import {Sponsor} from "@/features/about-info";
import {Button, FileInput, IconButton, ImageLoader, Modal, TextInput} from "@/shared/ui";
import clsx from "clsx";

interface SponsorCardProps {
  sponsor: Sponsor;
  admin?: boolean;
  onSubmitEdit?: (data: FormData) => void;
  onSubmitDelete?: () => void;
  classname?: string;
}

export const SponsorCard: React.FC<SponsorCardProps> = (
  props
) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return (
    <div className={"flex flex-col gap-2 items-center justify-center"}>
      <div className={clsx("relative group rounded-2xl overflow-hidden", props.classname)}>
        <ImageLoader imagePath={props.sponsor.sponsorLogo} className="w-full h-full"/>

        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        >
          <p className="text-white text-center p-2 text-sm">
            {props.sponsor.sponsorDescription}
          </p>
        </div>
      </div>

      {props.admin && (
        <div className={"flex flex-row gap-4"}>
          <IconButton
            icon={"edit"} variant={"tertiary"} size={"S"}
            onClick={() => setIsEditModalOpen(true)}
          />

          <IconButton
            icon={"close"} variant={"tertiary"} size={"S"} palette={"gray"}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <p className={"text-bodyM_regular text-base-95"}>Вы действительно хотите удалить партнёра?</p>
          <p className={"text-bodyM_regular text-blue-90"}>{props.sponsor.sponsorDescription}</p>

          <div className={"flex flex-row gap-4"}>
            <Button variant={"tertiary"} size={"S"} onClick={() => setIsDeleteModalOpen(false)}>
              Отмена
            </Button>

            <Button variant={"primary"} size={"S"} onClick={() => {
              if (props.onSubmitDelete) props.onSubmitDelete();
              setIsDeleteModalOpen(false)
            }}>
              Удалить
            </Button>
          </div>
        </Modal>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
          <form
            className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[400px] w-fit max-w-[500px] text-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget)
              if (props.onSubmitEdit) props.onSubmitEdit(data);
              setIsEditModalOpen(true)
            }}
          >
            <p className={"text-h5_bold text-base-95"}>Добавление партнёра</p>

            <TextInput title={"Название/Описание"} defaultValue={props.sponsor.sponsorDescription}
                       name={"description"}/>
            <FileInput title={"Логитип"} name={"logo"} accept={"image/*"}/>

            <div className={"flex flex-row gap-4 w-full mt-4"}>
              <Button variant={"tertiary"} size={"S"} onClick={() => setIsEditModalOpen(false)} className={"w-full"}
                      type={"reset"}>
                Отмена
              </Button>

              <Button variant={"primary"} size={"S"} className={"w-full"} type={"submit"}>
                Обновить
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
