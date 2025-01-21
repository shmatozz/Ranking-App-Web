'use client'

import React from "react";
import clsx from "clsx";
import {Icon, icons} from "@/shared/ui";

type ButtonProps = {
  palette?: "blue" | "orange" | "gray";
  size?: "S" | "M";
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  icon: keyof typeof icons;
  onClick?: () => void;
  className?: string;
};

export const IconButton: React.FC<ButtonProps> = ({
  palette = "blue",
  size = "M",
  variant = "primary",
  disabled = false,
  icon,
  onClick,
  className,
}) => {
  const baseClass = "flex items-center justify-center focus:outline-none gap-3";

  /* Size styles */
  const sizeClass = {
    S: "h-10 w-10 rounded-xl",
    M: "h-[3.25rem] w-[3.25rem] rounded-2xl",
  }[size];

  /* Color styles */
  const paletteClass = {
    blue: {
      primary: "bg-blue-50 text-base-0 hover:bg-blue-60 active:bg-blue-70 disabled:bg-base-20",
      secondary: "border border-2 border-blue-50 text-blue-50 hover:border-blue-60 hover:text-blue-60 active:border-blue-70 active:text-blue-70 disabled:border-base-20 disabled:text-base-20",
      tertiary: "text-blue-50 hover:text-blue-60 hover:bg-blue-5 active:text-blue-70 active:bg-blue-5 disabled:text-base-30 disabled:bg-transparent",
    },
    orange: {
      primary: "bg-orange-50 text-base-0 hover:bg-orange-60 active:bg-orange-70 disabled:bg-base-20",
      secondary: "border border-2 border-orange-50 text-orange-50 hover:border-orange-60 hover:text-orange-60 active:border-orange-70 active:text-orange-70 disabled:border-base-20 disabled:text-base-20",
      tertiary: "text-orange-50 hover:text-orange-60 hover:bg-orange-5 active:text-orange-70 active:bg-orange-5 disabled:text-base-30 disabled:bg-transparent",
    },
    gray: {
      primary: "bg-base-70 text-base-0 hover:bg-base-80 active:bg-base-95 disabled:bg-base-20",
      secondary: "border border-2 border-base-70 text-base-70 hover:border-base-80 hover:text-base-80 active:border-base-95 active:text-base-95 disabled:border-base-20 disabled:text-base-20",
      tertiary: "text-base-70 hover:text-base-80 hover:bg-base-5 active:text-base-95 active:bg-base-5 disabled:text-base-30 disabled:bg-transparent",
    },
  }[palette][variant];

  /* State styles */
  const stateClass = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={"button"}
      className={clsx(baseClass, sizeClass, paletteClass, stateClass, className)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <Icon name={icon} size={size == "M" ? 32 : 24}/>
    </button>
  );
};
