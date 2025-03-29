"use client"

import React from "react";
import {Button, TextInput} from "@/shared/ui";

interface InviteUserFormProps {
  byInvite: boolean;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  error?: string;
}

export const AddUserForm: React.FC<InviteUserFormProps> = (
  props
) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <form
        className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow min-w-[500px] text-center items-center"
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          props.onSubmit(data);
        }}
      >
        <label className={"text-h5_bold text-base-95 text-center"}>Добавление пользователя в организацию</label>

        {props.error && (
          <div className={"px-4 py-2 rounded-2xl bg-red-5"}>
            <p className={"text-bodyM_regular text-red-70 text-center"}>{props.error}</p>
          </div>
        )}

        <TextInput
          name={"email"}
          title={"Почта пользователя"} required
        />

        <div className={"flex flex-row gap-4 mt-4 w-full"}>
          <Button
            variant={"tertiary"} palette={"gray"} className={"w-full"}
            onClick={props.onCancel} type={"reset"}
          >
            Отменить
          </Button>

          <Button variant={"primary"} palette={"blue"} className={"w-full"} type={"submit"}>
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}
