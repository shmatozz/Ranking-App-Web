'use client';

import React, { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  inputSize?: "S" | "M";
  theme?: "blue" | "orange";
  errorMessage?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  title,
  inputSize = "M",
  theme = "blue",
  errorMessage,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const isError = !!errorMessage;

  const sizeClass = {
    S: "h-[2.375rem] px-[0.75rem] py-[0.375rem] text-bodyS_regular rounded-[0.75rem] focus:text-bodyS_medium",
    M: "h-[2.75rem] px-4 py-[0.375rem] text-bodyM_regular rounded-[0.75rem] focus:text-bodyM_medium",
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
    <div
      className={"relative flex flex-col w-full gap-1"}
    >
      {/* Title with animation */}
      <label
        className={clsx(
          "flex flex-row h-fit transition-transform duration-300 select-none gap-1",
          "pointer-events-none",
          isFocused || hasText ? "translate-y-0" : "translate-y-8",
          inputSize == "M" ? "text-bodyS_regular" : "text-caption_regular",
          isFocused ? themedTextClass : "text-base-40"
        )}
      >
        {title}
        { props.required && <p className={"text-red-50"}>*</p> }
      </label>

      {/* Input Field */}
      <input
        name={props.name}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasText(!!e.target.value); // Check if input has text
        }}
        disabled={props.disabled}
        placeholder={title}
        className={clsx(
          sizeClass,
          themeClass,
          "border placeholder-base-40 transition-opacity",
          "block w-full z-[1] rounded-md outline-none placeholder:italic focus:placeholder:opacity-0",
          props.disabled && "bg-base-5 cursor-not-allowed",
          isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
          className
        )}
      />

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
