"use client";

import React, {useEffect} from "react";
import {Button, Icon} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {useRatingsStore, UserRatingCard} from "@/features/ratings";

export const Rating = () => {
  const router = useRouter();
  const { rating, getRatings } = useRatingsStore()

  useEffect(() => {
    getRatings();
  }, [getRatings]);

  return (
    <div className={"content-container flex-col h-fit gap-4"}>
      <div className={"flex flex-row w-full h-fit items-center justify-between"}>
        <label className={"text-h4 text-base-100"}>Рейтинг</label>

        <Button
          variant={"tertiary"} size={"S"}
          onClick={() => router.push("/ratings")}
        >
          Весь рейтинг
        </Button>
      </div>

      <div className={"flex flex-col w-full gap-2"}>
        {(!rating) && (
          <div data-testid="ratings-loader" className={"flex flex-col gap-4 h-fit w-full"}>
            <div className={"flex w-full px-4 h-[120px] bg-base-5 rounded-2xl"}/>
            <div className={"flex w-full px-4 h-[50px] bg-base-5 rounded-2xl"}/>
            <div className={"flex w-full px-4 h-[50px] bg-base-5 rounded-2xl"}/>
          </div>
        )}


        {rating && rating.length > 0 && (
          <UserRatingCard key={rating[0].id} user={rating[0]} position={1}/>
        )}

        <div>
          {rating && (rating.length > 1) && (
            <div className={"flex flex-row items-center px-4 gap-4"}>
              <p className={"text-bodyM_medium text-base-95 w-[80px] text-center"}>Позиция</p>
              <div className={"w-[36px] h-[36px] rounded-full bg-base-0"}/>
              <p className={"text-bodyM_medium text-base-95 flex-1"}>ФИО</p>

              <div className={"hidden flex-row items-center gap-4 large:flex"}>
                <p className={"text-bodyM_medium text-base-95 w-[35px] text-center"}>Пол</p>
                <p className={"text-bodyM_medium text-base-95 w-[70px] text-center"}>Возраст</p>
                <p className={"text-bodyM_medium text-base-95 w-[80px] text-center"}>Рейтинг</p>
                <p className={"text-bodyM_medium text-base-95 w-[70px] text-center"}>Старты</p>
                <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#FFE79A"} size={24}/></div>
                <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6C6C6"} size={24}/></div>
                <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6A791"} size={24}/></div>
                <p className={"text-bodyM_medium text-base-95 w-[130px] text-center"}>Лучшее время</p>
              </div>
            </div>
          )}

          <div className={"w-full h-[2px] bg-base-5"}/>

          {rating && rating.length > 0 && rating.slice(0, 10).map((item, index) => {
            if (index > 0) return <UserRatingCard key={item.id} user={item} position={index + 1}/>
          })}
        </div>

        {rating && rating.length === 0 && (
          <p className={"text-bodyM_regular text-base-95 text-center"}>
            Информация о рейтинге по данным фильтрам в данный момент недоступна
          </p>
        )}
      </div>
    </div>
  )
}
