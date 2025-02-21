import React from "react";
import {Button} from "@/shared/ui";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = (
  props
) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-95 bg-opacity-50 z-[5]">
      <div className="flex flex-col gap-1 bg-white p-6 m-auto rounded-lg container-shadow w-fit text-center items-center">
        {props.children}

        {props.onClose && (
          <Button size={"S"} variant={"tertiary"} palette={"gray"} onClick={props.onClose}>
            Закрыть
          </Button>
        )}
      </div>
    </div>
  );
};
