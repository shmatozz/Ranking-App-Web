import React, { useEffect, useState } from "react";
import {CompetitionFull} from "@/entities/competition";
import {formatDate} from "@/shared/utils";
import {getSwimShort} from "@/shared/lib";

interface ClosestCompetitionCardProps {
  competition?: CompetitionFull;
  onClick?: () => void;
  isLoading?: boolean
}

export const ClosestCompetitionCard: React.FC<ClosestCompetitionCardProps> = (props) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!props.competition) return;

    setTimeLeft(calculateTimeLeft(props.competition.date));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(props.competition!.date));
    }, 1000);

    return () => clearInterval(timer);
  }, [props.competition]);

  if (!props.competition || props.isLoading) {
    return (
      <div className="flex flex-col w-full h-[330px] rounded-2xl container-shadow px-8 py-6 gap-2">
        <p className="loader">Название соревнования</p>
        <p className="loader">Дата соревнования</p>

        <div className="flex flex-col gap-1">
          <p className="text-bodyM_medium text-base-95">Заплывы:</p>
          {Array(3)
            .fill(0)
            .map((_event, index) => (
              <p key={index} className="loader">Заплыв</p>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full min-h-[330px] rounded-2xl container-shadow px-8 py-6 gap-2 cursor-pointer"
      onClick={props.onClick}
    >
      <p className="text-h5_bold text-base-95">{props.competition.name}</p>
      <p className="text-bodyM_regular text-base-95">{formatDate(props.competition.date)}</p>

      <div className="flex flex-col">
        <p className="text-bodyM_medium text-base-95">Заплывы:</p>
        {props.competition.events.slice(0, 3).map((event) => (
          <p key={event.eventUuid} className="text-bodyM_regular text-base-95">{getSwimShort(event)}</p>
        ))}
        {props.competition.events.length > 3 && (
          <p className="text-bodyS_regular text-base-10">{`и ещё ${props.competition.events.length - 3}`}</p>
        )}
      </div>

      {timeLeft && (
        <div className={"flex flex-col w-full m-auto"}>
          <div className={"flex flex-row w-full"}>
            <p className={"text-h5_bold text-base-95 text-center w-full xs:text-h4"}>{timeLeft.days}</p>
            <p className={"text-h5_bold text-base-95 text-center w-full xs:text-h4"}>{timeLeft.hours}</p>
            <p className={"text-h5_bold text-base-95 text-center w-full xs:text-h4"}>{timeLeft.minutes}</p>
            <p className={"text-h5_bold text-base-95 text-center w-full xs:text-h4"}>{timeLeft.seconds}</p>
          </div>

          <div className={"flex flex-row w-full"}>
            <p className={"text-bodyS_medium text-base-95 text-center w-full xs:text-h5"}>дней</p>
            <p className={"text-bodyS_medium text-base-95 text-center w-full xs:text-h5"}>часов</p>
            <p className={"text-bodyS_medium text-base-95 text-center w-full xs:text-h5"}>минут</p>
            <p className={"text-bodyS_medium text-base-95 text-center w-full xs:text-h5"}>секунд</p>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateTimeLeft = (competitionDate: string) => {
  const targetDate = new Date(competitionDate).getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};
