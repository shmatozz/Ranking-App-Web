"use client";

import React from "react";
import clsx from "clsx";

interface PagingProps {
  page: number;
  totalPages: number;
  totalResults: number;
  onPagePress: (index: number) => void;
  onNextPress: () => void;
}

export const Paging: React.FC<PagingProps> = (
  props
) => {
  return (
    <div className={"flex flex-col w-full justify-between items-center gap-4 xs:flex-row"}>
      <div className={"flex flex-row justify-center items-center gap-4"}>
        {Array.from({length: props.totalPages}, (_, index) => (
          <p
            key={index} onClick={() => props.onPagePress(index)}
            className={clsx(
              "cursor-pointer select-none px-4 rounded-full",
              index ==  props.page ? "text-h5_bold text-base-95 bg-base-5" : "text-h5 text-base-70",
            )}
          >
            {index + 1}
          </p>
        ))}

        <div
          className={"flex flex-row cursor-pointer items-center text-bodyS_medium"}
          onClick={props.page ==  props.totalPages - 1 ?
            undefined :
            props.onNextPress
        }>
          <p className={`select-none ${ props.page ==  props.totalPages - 1 ? "text-base-40" : "text-base-95"}`}>дальше</p>
        </div>
      </div>

      <div className={"text-bodyS_medium text-base-90"}>
        {`Всего найдено: ${ props.totalResults }`}
      </div>
    </div>
  )
}
