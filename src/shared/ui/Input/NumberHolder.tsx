import React from "react";

interface NumberHolderProps {
  number?: number | string;
}

export const NumberHolder: React.FC<NumberHolderProps> = ({
  number = "_"
}) => {
  return (
    <div
      className={"flex w-9 h-[3.25rem] rounded-lg bg-base-0 text-h5 border-2 border-base-5 items-center justify-center"}
    >
      {number}
    </div>
  )
}
