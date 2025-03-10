"use client"

import React from "react";
import {PointData} from "@/features/training-map";
import {Button} from "@/shared/ui";
import clsx from "clsx";

interface PlacemarkCardProps {
  placemark: PointData;
  selected?: boolean;
  onClick?: () => void;
  admin?: boolean;
  onDeletePress?: () => void;
  className?: string;
}

export const PlacemarkCard: React.FC<PlacemarkCardProps> = (
  props
) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 px-6 py-3 items-center justify-between container-shadow rounded-2xl xs:flex-row xs:px-8",
        props.selected ? "bg-gradient-to-l from-blue-5 to-base-0" : "bg-base-0"
      )}
      onClick={props.onClick}
    >
      <div className={"flex flex-col gap-1 w-full"}>
        <p className={"text-bodyM_medium text-base-95 xs:text-h5_bold"}>{props.placemark.geoJson.properties.name}</p>
        <p className={"text-bodyS_regular text-base-95 xs:text-bodyM_regular whitespace-pre-wrap"}>{props.placemark.geoJson.properties.description}</p>
      </div>

      {props.admin && (
        <Button
          variant={"tertiary"} size={"S"} palette={"blue"}
          onClick={props.onDeletePress}
        >
          Удалить
        </Button>
      )}
    </div>
  )
}
