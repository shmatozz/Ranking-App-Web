"use client"

import React, {useState} from "react";
import {Button, Checkbox, Radio, TextInput} from "@/shared/ui";

interface CreateUserFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  error?: string;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = (
  props
) => {
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <form
        className="flex flex-col gap-2 bg-white p-6 m-auto rounded-lg container-shadow w-full max-w-[600px] text-center items-center max-h-[90vh] overflow-y-auto"
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          data.append("gender", gender);
          props.onSubmit(data);
        }}
      >
        <label className={"text-h5_bold text-base-95 text-center"}>Регистрация пользователя в организацию</label>

        {props.error && (
          <div className={"px-4 py-2 rounded-2xl bg-red-5"}>
            <p className={"text-bodyM_regular text-red-70 text-center"}>{props.error}</p>
          </div>
        )}

        <TextInput name={"email"} title={"Почта пользователя"} required/>
        <TextInput name={"emergencyPhone"} required title={"Экстренный номер"} type={"tel"}/>

        <TextInput name={"lastName"} required title={"Фамилия"}/>
        <TextInput name={"firstName"} required title={"Имя"}/>
        <TextInput name={"middleName"} title={"Отчество"}/>

        <TextInput name={"birthDate"} title={"Дата рождения"} type={"date"} required/>

        <div className="flex flex-col w-full gap-[0px]">
          <label className={"flex flex-row gap-1 w-full text-bodyS_regular text-base-40"}>
            {"Пол"}
            <p className={"text-red-50"}>*</p>
          </label>

          <div className={"flex flex-row w-full gap-8 justify-center"}>
            <Radio checked={gender == "MALE"} onClick={() => setGender("MALE")} text={"Мужской"}/>
            <Radio checked={gender == "FEMALE"} onClick={() => setGender("FEMALE")} text={"Женский"}/>
          </div>
        </div>

        <div className={"w-full h-[3px] bg-base-5"}/>

        <div className={"flex flex-col w-full"}>
          <TextInput
            name={"password"} title={"Пароль"} type={"password"}
            minLength={8} maxLength={256}
          />

          <TextInput
            name={"confirmPassword"} title={"Повторите пароль"} type={"password"}
            minLength={8} maxLength={256}
          />

          <p>или</p>

          <Checkbox text={"Сгенерировать пароль"} name={"isNeedGeneratePassword"} className={"max-w-fit"}/>
        </div>

        <div className={"flex flex-col w-full gap-4 mt-4 xs:flex-row"}>
          <Button
            variant={"tertiary"} palette={"gray"} className={"w-full"}
            onClick={props.onCancel} type={"reset"}
          >
            Отменить
          </Button>

          <Button variant={"primary"} palette={"blue"} className={"w-full"} type={"submit"}>
            Зарегестрировать
          </Button>
        </div>
      </form>
    </div>
  )
}
