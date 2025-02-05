import React from "react";
import clsx from "clsx";
import {Icon, IconButton, TextInput} from "@/shared/ui";

interface UserInfoFieldProps {
  title: string;
  value: string;
  editable?: boolean;
  onSubmit?: () => void;
  className?: string;
}

export const UserInfoField: React.FC<UserInfoFieldProps> = ({
  title,
  value,
  editable = false,
  onSubmit = () => console.log("submit placeholder called"),
  className
}) => {
  const [editing, setEditing] = React.useState(false);

  return (
    <div className={"flex flex-row w-full justify-between items-center"}>
      {editing && (
        <div
          className={"flex flex-row w-full gap-2 items-center"}
        >
          <TextInput title={title} animatedLabel={false}/>

          <IconButton size={"S"} icon={"submit"} className={"w-12"} onClick={() => {
            onSubmit();
          }}/>
          <IconButton size={"S"} icon={"close"} className={"w-12"} variant={"tertiary"} palette={"gray"} onClick={() => setEditing(false)}/>
        </div>
      )}

      {!editing && (
        <div className={clsx("flex flex-col gap", className)}>
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