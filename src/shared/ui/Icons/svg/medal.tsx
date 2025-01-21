import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Medal: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 2H4v2l5.81 4.36a7.004 7.004 0 00-4.46 8.84 6.996 6.996 0 008.84 4.46 7 7 0 000-13.3L20 4V2zm-5.06 17.5L12 17.78 9.06 19.5l.78-3.33-2.59-2.24 3.41-.29L12 10.5l1.34 3.14 3.41.29-2.59 2.24.78 3.33z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
