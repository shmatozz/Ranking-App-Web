'use client';

import React, {HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState} from "react";
import clsx from "clsx";
import {Icon, icons} from "@/shared/ui";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLTextAreaElement> & {
  title: string;
  animatedLabel?: boolean;
  type?: HTMLInputTypeAttribute | "area";
  inputSize?: "S" | "M";
  theme?: "blue" | "orange";
  errorMessage?: string;
  icon?: keyof typeof icons,
  tooltipText?: string;
  className?: string
};

export const TextInput: React.FC<TextInputProps> = ({
  title,
  animatedLabel= true,
  type,
  inputSize = "M",
  theme = "blue",
  errorMessage,
  tooltipText,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isError = !!errorMessage;

  useEffect(() => {
    if (props.value != undefined) setHasText(props.value.toString().length != 0)
  }, [props.value]);

  const sizeClass = {
    S: "h-[2.375rem] px-[0.75rem] py-[0.375rem] text-bodyS_regular rounded-r-md focus:text-bodyS_medium",
    M: "h-[2.75rem] px-3 py-[0.375rem] text-bodyM_regular rounded-r-md focus:text-bodyM_medium",
  }[inputSize];

  const themeClass = {
    blue: "focus:border-blue-50",
    orange: "focus:border-orange-50",
  }[theme];

  const themedTextClass = {
    blue: "text-blue-50",
    orange: "text-orange-50",
  }[theme];

  return (
    <div className={"relative flex flex-col w-full gap-0"}>
      {/* Title with animation */}
      {animatedLabel && (
        <label
          className={clsx(
            "flex flex-row h-fit transition-transform duration-300 select-none gap-1",
            "pointer-events-none",
            isFocused || hasText || type == "date" || type == "time" ? "translate-y-0" : "translate-y-8",
            inputSize == "M" ? "text-bodyS_regular" : "text-caption_regular",
            isFocused ? themedTextClass : "text-base-40"
          )}
        >
          {title}
          {props.required && <p className={"text-red-50"}>*</p>}
        </label>
      )}

      {/* Input Field */}
      <div className="flex relative w-full flex-row group">
        {props.icon && (
          <div className={clsx(
            isFocused ? (theme == "blue" ? "border-blue-50" :  "border-orange-50") : "border-base-20",
            isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
            "flex bg-base-5 px-2 border-l border-t border-b justify-center items-center rounded-l-md"
          )}>
            <Icon name={props.icon} size={inputSize == "M" ? 20 : 12} color={"#5E5E5E"}/>
          </div>
        )}

        {type != "area" ? (
          <input
            id={props.id}
            name={props.name}
            value={props.value}
            type={type == "password" ? (showPassword ? "text" : "password") : type}
            onFocus={(e) => {
              setIsFocused(true);

              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasText(!!e.target.value); // Check if input has text

              if (props.onBlur) props.onBlur(e);
            }}
            disabled={props.disabled}
            placeholder={props.placeholder ? props.placeholder : title}
            className={clsx(
              sizeClass,
              themeClass,
              props.icon ? "border-t border-r border-b rounded-r-md" : "border rounded-md",
              "placeholder-base-40 transition-opacity placeholder:overflow-visible",
              "block w-full z-[1] outline-none placeholder:italic focus:placeholder:opacity-0",
              props.disabled && "bg-base-5 cursor-not-allowed",
              isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
              className
            )}
            onChange={(e) => {
              if (e.target.value.length > 0) setHasText(true);
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        ) : (
          <textarea
            id={props.id}
            name={props.name}
            onFocus={(e) => {
              setIsFocused(true);

              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasText(!!e.target.value);

              if (props.onBlur) props.onBlur(e);
            }}
            disabled={props.disabled}
            placeholder={title}
            className={clsx(
              sizeClass,
              themeClass,
              props.icon ? "border-t border-r border-b rounded-r-md" : "border rounded-md",
              "placeholder-base-40 transition-opacity",
              "block w-full z-[1] outline-none placeholder:italic focus:placeholder:opacity-0",
              props.disabled && "bg-base-5 cursor-not-allowed",
              isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
              className
            )}
            onChange={(e) => {
              if (e.target.value.length > 0) setHasText(true);
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        )}


        {/* Show/Hide Password Icon */}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-40"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon name={showPassword ? "eyeOff" : "eye"} size={inputSize == "S" ? 16 : 24} color={"gray"}/>
          </button>
        )}

        {tooltipText && (
          <div
            className="ml-2 relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Icon name={"info"} size={16} color={"#C6C6C6"}/>
            {showTooltip && (
              <div
                className="absolute right-0 z-30 top-6 w-48 bg-base-90 text-white text-caption_regular select-none p-2 rounded shadow-md">
                {tooltipText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper Text (for error messages) */}
      {isError && (
        <span
          className={clsx(
            "text-red-50",
            inputSize === "M" ? "text-bodyS_regular" : "text-caption_regular"
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};
