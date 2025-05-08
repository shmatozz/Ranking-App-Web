"use client";

import React, {useEffect, useState} from "react";
import {useAboutInfoStore} from "@/widgets/about-page-sections/model/AboutInfoStore";
import {useWhoAmIStore} from "@/features/who-am-i";
import {Button, TextInput} from "@/shared/ui";

export const AboutUsText = () => {
  const { aboutUsText, getAboutUsText, setAboutUsText } = useAboutInfoStore();
  const { whoAmI } = useWhoAmIStore();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    if (!aboutUsText) getAboutUsText();
  }, [aboutUsText, getAboutUsText]);

  useEffect(() => {
    if (aboutUsText) setEditingText(aboutUsText);
  }, [aboutUsText]);

  if (!aboutUsText) return (
    <div className={"flex flex-col gap-2"}>
      <div className={"w-full h-[100px] bg-base-5 rounded-md animate-pulse"}/>
      <div className={"w-full h-[70px] bg-base-5 rounded-md animate-pulse"}/>
    </div>
  )

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-row gap-2 items-center justify-between"}>
        <label className={"text-h4 text-base-100"}>О нас</label>

        {whoAmI && whoAmI.admin && (
          <Button variant={"tertiary"} size={"S"} onClick={() => setEditMode(true)}>
            Редактировать
          </Button>
        )}
      </div>

      {!editMode && (
        <p className={"text-bodyM_regular text-base-95 whitespace-pre-wrap"}>
          {aboutUsText}
        </p>
      )}

      {editMode && (
        <>
          <TextInput
            type={"area"} title={"Редактирование"}
            className={"min-h-[170px]"} animatedLabel={false} name={"aboutUs"}
            value={editingText} onChange={(e) => setEditingText(e.target.value)}
          />

          <div className={"flex flex-col xs:flex-row gap-2 justify-end"}>
            <Button
              variant={"tertiary"} size={"S"} palette={"gray"}
              onClick={() => setEditMode(false)}
            >
              Отмена
            </Button>

            <Button
              variant={"primary"} size={"S"} type={"submit"}
              onClick={() => setAboutUsText(editingText, () => setEditMode(false))}
            >
              Сохранить
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
