"use client";

import React, {useEffect, useState} from "react";
import {useAboutInfoStore} from "@/widgets/about-page-sections";
import {Button, FileInput, TextInput} from "@/shared/ui";
import {useWhoAmIStore} from "@/features/who-am-i";
import {PartnerCard} from "@/features/about-info";

export const Partners = () => {
  const { partners, getPartners, addPartner, updatePartner, deletePartner } = useAboutInfoStore();
  const { whoAmI } = useWhoAmIStore();

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!partners) getPartners();
  }, [partners, getPartners]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addPartner(data, () => setEditMode(false));
  };

  if (!partners) return (
    <div className={"flex flex-col gap-2"}>
      <div className={"w-full h-[300px] bg-base-5 rounded-md animate-pulse"}/>
    </div>
  )

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex flex-row gap-2 items-center justify-between"}>
        <p className={"text-h5_bold text-base-95"}>Партнеры</p>

        {whoAmI && whoAmI.admin && (
          <Button variant={"tertiary"} size={"S"} onClick={() => setEditMode(true)}>
            Добавить
          </Button>
        )}
      </div>

      <div className={"flex flex-wrap justify-center gap-4"}>
        {partners.length > 0 && (
          partners.map((item) => (
            <PartnerCard
              key={item.id} partner={item} classname={"mx-4"} admin={whoAmI && whoAmI.admin}
              onSubmitEdit={(data) => updatePartner(item.id, data)}
              onSubmitDelete={() => deletePartner(item.id)}
            />
          ))
        )}
      </div>

      {partners.length === 0 && (
        <p className={"text-bodyM_regular text-base-95 text-center"}>{"В данный момент информация о партнёрах отсутствует"}</p>
      )}

      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
          <form
            className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[400px] w-fit max-w-[500px] text-center items-center"
            onSubmit={handleSubmit}
          >
            <p className={"text-h5_bold text-base-95"}>Добавление партнёра</p>

            <TextInput title={"Название/Описание"} name={"description"}/>
            <FileInput title={"Логитип"} name={"logo"} accept={"image/*"}/>

            <div className={"flex flex-row gap-4 w-full mt-4"}>
              <Button variant={"tertiary"} size={"S"} onClick={() => setEditMode(false)} className={"w-full"} type={"reset"}>
                Отмена
              </Button>

              <Button variant={"primary"} size={"S"} className={"w-full"} type={"submit"}>
                Добавить
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
