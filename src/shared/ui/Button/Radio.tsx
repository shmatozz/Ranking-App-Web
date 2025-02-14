import React from "react";
import {Icon} from "@/shared/ui";
import clsx from "clsx";

type RadioProps = {
  checked: boolean;
  onClick: () => void;
  text: string;
  theme?: "blue" | "orange";
  disabled?: boolean;
  className?: string;
};

export const Radio: React.FC<RadioProps> = ({
  checked,
  onClick,
  text,
  theme = "blue",
  disabled= false,
  className,
}) => {
  const themeClass = {
    blue: "#5884DD",
    orange: "#DB6300"
  }[theme];

  return (
    <div className={clsx("flex flex-row w-full gap-1 items-center", className)} onClick={onClick}>
      <Icon name={checked ? "radioChecked" : "radioBlank"} size={24} color={disabled ? "#C6C6C6" : (checked ? themeClass : "#9B9B9B")}/>

      <p className={clsx(
        "text-bodyS_regular",
        disabled ? " text-base-50" : "text-base-95",
      )}>{text}</p>
    </div>
  )
}