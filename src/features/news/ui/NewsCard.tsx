"use client";

import React from "react";
import {News} from "@/features/news";
import {Icon, ImageLoader} from "@/shared/ui";

interface NewsCardProps {
  news: News,
  onPress?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = (
  props
) => {
  const noImage = props.news.image1 == undefined && props.news.image2 == undefined && props.news.image3 == undefined;

  return (
    <div
      className={"flex relative flex-[0_0_100%] overflow-hidden flex-col justify-end cursor-pointer"}
      onClick={props.onPress}
    >
      <div className={"absolute flex h-full w-full z-0"}>
        { props.news.image1 && (<ImageLoader imagePath={props.news.image1} className={"object-contain"} doubling/>)}
        { props.news.image1 == undefined && props.news.image2 && (<ImageLoader imagePath={props.news.image2} doubling/>)}
        { props.news.image3 == undefined && props.news.image2 == undefined && props.news.image3 && (
          <ImageLoader imagePath={props.news.image3} doubling/>
        )}

        {noImage && (
          <div className={"flex flex-1 items-center justify-center bg-base-5"}>
            <Icon name={"photo"} size={32} color={"#868686"}/>
          </div>
        )}
      </div>

      <div className={"flex w-full bg-base-5 bg-opacity-70 backdrop-blur-xl px-8 py-3 z-10"}>
        <p className={"text-bodyM_medium text-base-95"}>{props.news.topic}</p>
      </div>
    </div>
  )
}
