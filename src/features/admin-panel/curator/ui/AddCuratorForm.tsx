import React from "react";
import {Button, TextInput} from "@/shared/ui";
import {useAddCuratorStore} from "@/features/admin-panel/curator";

export const AddCuratorForm = () => {
  const {addCurator, addCuratorError} = useAddCuratorStore()

  return (
    <div className={"w-full"}>
      <form
        className={"flex flex-col w-full"}
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          addCurator(data);
        }}
      >
        {addCuratorError && (
          <div className={"px-4 py-2 rounded-2xl bg-red-5"}>
            <p className={"text-bodyM_regular text-red-70 text-center"}>{addCuratorError}</p>
          </div>
        )}

        <TextInput name={"email"} title={"Email организации"} type={"email"} required/>

        <div className={"flex flex-col w-full items-center mt-2"}>
          <Button variant={"primary"} size={"S"} className={"w-full max-w-[250px]"} type={"submit"}>
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}
