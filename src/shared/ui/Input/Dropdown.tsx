'use client';

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Icon } from "@/shared/ui";

interface DropdownProps {
  items: DropdownItem[];
  selectedItems: DropdownItem[];
  onItemSelected: (item: DropdownItem) => void;
  placeholder: string;
  multiple?: boolean;
  className?: string;
}

export type DropdownItem = {
  id: string;
  name: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [opened, setOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={clsx("flex flex-col w-full relative", props.className)}>
      <div
        className={"flex justify-between items-center h-[40px] w-full bg-base-5 rounded-[8px] px-4 py-2 cursor-pointer z-[10]"}
        onClick={() => setOpen(!opened)}
      >
        {props.selectedItems.length === 0 && (
          <p className={"text-bodyS_regular text-base-70 select-none xs:text-bodyM_regular"}>{props.placeholder}</p>
        )}

        {props.selectedItems.length > 0 && (
          <p className={"text-bodyS_regular text-base-90 select-none text-nowrap xs:text-bodyM_regular"}>{props.selectedItems.map((item) => item.name).join(", ")}</p>
        )}

        <Icon name={"chevronDown"} size={24} className={"text-base-60"} />
      </div>

      <div
        className={clsx(
          "flex flex-col w-full absolute bg-white container-shadow rounded-md overflow-y-auto transition-all duration-300 ease-in-out z-[20] scrollbar-hide",
          opened ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ maxHeight: opened ? '300px' : '0px' }}
      >
        {props.items.map((item, index) => (
          <p
            key={index}
            className={"text-bodyM_regular text-base-70 select-none px-4 py-2 hover:bg-gray-100 cursor-pointer"}
            onClick={() => {
              props.onItemSelected(item);
              if (!props.multiple) setOpen(false)
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};
