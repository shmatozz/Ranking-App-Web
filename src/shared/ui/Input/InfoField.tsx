import React, {HTMLInputTypeAttribute} from "react";
import clsx from "clsx";
import {Icon, IconButton, TextInput} from "@/shared/ui";

interface InfoFieldProps {
  title: string;
  value: string | undefined;
  editable?: boolean;
  type?: HTMLInputTypeAttribute;
  onSubmit?: (value: string) => void;
  submitLoading?: boolean,
  isLoading?: boolean;
  className?: string;
}

export const InfoField: React.FC<InfoFieldProps> = ({
  title,
  value,
  editable = false,
  onSubmit = (value: string) => console.log("submit placeholder called", value),
  submitLoading,
  type= "text",
  isLoading = false,
  className
}) => {
  const [editing, setEditing] = React.useState(false);

  if (isLoading || !value) {
    return (
      <div className={clsx("flex flex-col w-full", className)}>
        <p className={"text-bodyS_regular text-base-40"}>{title}</p>
        <div className={"w-fit px-8 text-bodyM_regular text-base-5 bg-base-5 rounded-md animate-pulse"}>{value ? value : "some value"}</div>
      </div>
    )
  }

  return (
    <div className={"flex flex-row w-full justify-between items-center"}>
      {editing && (
        <div
          className={"flex flex-row w-full gap-2 items-center"}
        >
          <TextInput id={"new-value-input"} title={title} type={type} animatedLabel={false}/>

          <IconButton size={"S"} icon={"submit"} className={"w-12"} isLoading={submitLoading} onClick={() => {
            onSubmit((document.getElementById("new-value-input") as HTMLInputElement)!.value);
          }}/>
          <IconButton size={"S"} icon={"close"} className={"w-12"} variant={"tertiary"} palette={"gray"} onClick={() => setEditing(false)}/>
        </div>
      )}

      {!editing && (
        <div className={clsx("flex flex-col", className)}>
          <p className={"text-bodyS_regular text-base-40"}>{title}</p>
          <p className={"text-bodyM_regular text-base-95"}>{value}</p>
        </div>
      )}

      {editable && !editing && (
        <div
          className={"cursor-pointer"}
          onClick={() => setEditing(true)}
        >
          <Icon name={"edit"} size={24} color={"#9B9B9B"}/>
        </div>
      )}
    </div>
  )
}
