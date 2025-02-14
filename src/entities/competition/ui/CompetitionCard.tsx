import React from "react";
import {Competition} from "@/entities/competition";
import Image from "next/image";
import placeholderImage from "@/shared/assets/image/fizcult.png";
import {formatDate} from "@/shared/utils";

interface CompetitionCardProps {
  competition?: Competition;
  onClick?: () => void;
  isLoading?: boolean;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = (
  props
) => {
  if (props.isLoading || !props.competition) {
    return (
      <div
        className={
          "relative flex flex-col w-full h-fit gap-1 px-8 py-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
        }
        onClick={props.onClick}
      >
        <label className={"w-fit px-4 text-bodyM_medium text-base-5 bg-base-5 z-[2] xs:text-h5 animate-pulse rounded-md select-none"}>Название старта</label>
        <p className={"w-fit px-4 text-bodyS_regular text-base-5 bg-base-5 z-[2] xs:text-bodyM_regular animate-pulse rounded-md select-none"}>Дата страта</p>

        <div className="absolute right-4 top-1/2 transition-transform -translate-y-1/2 z-[1] opacity-75 xs:opacity-100">
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        "relative flex flex-col w-full h-fit gap-1 px-8 py-4 shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
      }
      onClick={props.onClick}
    >
      <label className={"text-bodyM_medium text-blue-90 z-[2] xs:text-h5"}>{props.competition.name}</label>
      <p className={"text-bodyS_regular text-base-80 z-[2] xs:text-bodyM_regular"}>{formatDate(props.competition.date)}</p>

      <div className="absolute right-4 top-1/2 transition-transform -translate-y-1/2 z-[1] opacity-75 xs:opacity-100">
        <Image
          src={placeholderImage}
          alt={props.competition.name}
          width={128}
          height={125}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-150"
        />
      </div>
    </div>
  )
}
