"use client";

import React, {useEffect, useState} from "react";
import {Button, FileInput, TextInput} from "@/shared/ui";
import {useAboutInfoStore} from "@/widgets/about-page-sections";
import {useWhoAmIStore} from "@/features/who-am-i";
import {SponsorCard} from "@/features/about-info";

export const Sponsors = () => {
  const { sponsors, getSponsors, addSponsor, updateSponsor, deleteSponsor } = useAboutInfoStore();
  const { whoAmI } = useWhoAmIStore();

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!sponsors) getSponsors();
  }, [sponsors, getSponsors]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addSponsor(data, () => setEditMode(false));
  };

  if (!sponsors) return (
    <div className={"flex flex-col gap-2"}>
      <div className={"w-full h-[150px] bg-base-5 rounded-md animate-pulse"}/>
    </div>
  )

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-row gap-2 items-center justify-between"}>
        <p className={"text-h5_bold text-base-95"}>Спонсоры</p>

        {whoAmI && whoAmI.admin && (
          <Button variant={"tertiary"} size={"S"} onClick={() => setEditMode(true)}>
            Добавить
          </Button>
        )}
      </div>

      <div className={"flex flex-wrap justify-center gap-4"}>
        {sponsors.length > 0 && (
          sponsors.map((item) => (
            <SponsorCard
              key={item.id} sponsor={item} classname={"mx-4 w-fit max-w-[150px] h-fit max-h-[200px]"} admin={whoAmI && whoAmI.admin}
              onSubmitEdit={(data) => updateSponsor(item.id, data)}
              onSubmitDelete={() => deleteSponsor(item.id)}
            />
          ))
        )}
      </div>

      {sponsors.length === 0 && (
        <p
          className={"text-bodyM_regular text-base-95 text-center"}>{"В данный момент информация о партнёрах отсутствует"}</p>
      )}

      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
          <form
            className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[400px] w-fit max-w-[500px] text-center items-center"
            onSubmit={handleSubmit}
          >
            <p className={"text-h5_bold text-base-95"}>Добавление спонсора</p>

            <TextInput title={"Название/Описание"} name={"description"}/>
            <FileInput title={"Логитип"} name={"logo"} accept={"image/*"}/>

            <div className={"flex flex-row gap-4 w-full mt-4"}>
              <Button variant={"tertiary"} size={"S"} onClick={() => setEditMode(false)} className={"w-full"}
                      type={"reset"}>
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
