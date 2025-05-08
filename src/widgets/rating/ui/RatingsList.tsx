"use client";

import React from "react";
import {useRatingsStore} from "@/features/ratings";
import {UserRatingCard} from "@/features/ratings/ui/UserRatingCard";
import {useRouter} from "next/navigation";
import {Icon, Paging} from "@/shared/ui";

export const RatingsList = () => {
  const router = useRouter();
  const { rating, totalPages, totalResults, page, pageSize } = useRatingsStore();

  return (
    <div className={"flex flex-col w-full gap-4"}>
      {rating.length > 0  && page == 0 && (
        <UserRatingCard key={rating[0].id} user={rating[0]} position={1}/>
      )}

      <div>
        {((page == 0 && rating.length > 1) || (page > 0 && rating.length > 0)) && (
          <div className={"flex flex-row items-center px-4 gap-4"}>
            <p className={"block xs:hidden text-bodyM_medium text-base-95 w-[40px] text-center"}>Поз.</p>
            <p className={"hidden xs:block text-bodyM_medium text-base-95 w-[80px] text-center"}>Позиция</p>
            <div className={"w-[36px] h-[36px] rounded-full bg-base-0"}/>
            <p className={"text-bodyM_medium text-base-95 flex-1"}>ФИО</p>

            <div className={"hidden flex-row items-center gap-4 large:flex"}>
              <p className={"text-bodyM_medium text-base-95 w-[35px] text-center"}>Пол</p>
              <p className={"text-bodyM_medium text-base-95 w-[70px] text-center"}>Возраст</p>
              <p className={"text-bodyM_medium text-base-95 w-[80px] text-center"}>Рейтинг</p>
              <p className={"text-bodyM_medium text-base-95 w-[70px] text-center"}>Старты</p>
              <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#FFE79A"}
                                                                                 size={24}/></div>
              <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6C6C6"}
                                                                                 size={24}/></div>
              <div className={"flex w-[28px] items-center justify-center"}><Icon name={"medal"} color={"#C6A791"}
                                                                                 size={24}/></div>
              <p className={"text-bodyM_medium text-base-95 w-[130px] text-center"}>Лучшее время</p>
            </div>
          </div>
        )}

        {rating.length > 0 && rating.map((item, index) => {
          if ((page == 0 && index > 0) || (page > 0)) return <UserRatingCard key={item.id} user={item}
                                                                             position={index + 1 + page * pageSize}/>
        })}
      </div>

      {rating.length === 0 && (
        <p className={"text-bodyM_regular text-base-95 text-center"}>
          Информация о рейтинге по данным фильтрам в данный момент недоступна
        </p>
      )}

      {rating && rating.length > 0 && totalPages && page != undefined && totalPages > 0 && (
        <Paging
          page={page} totalPages={totalPages} totalResults={totalResults}
          onPagePress={(index) => router.push("?p=" + index, {scroll: false})}
          onNextPress={() => router.push("?p=" + Math.min(totalPages - 1, page + 1), {scroll: false})}
        />
      )}
    </div>
  )
}
