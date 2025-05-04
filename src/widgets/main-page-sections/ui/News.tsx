"use client";

import React, {useEffect} from "react";
import {useNewsStore} from "@/features/news/model/NewsStore";
import {NewsCard} from "@/features/news/ui/NewsCard";
import {Button, Carousel, ImageLoader} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useNewsCreateStore} from "@/features/news/model/NewsCreateStore";
import {NewsCreateForm} from "@/features/news";
import {useRouter} from "next/navigation";

export const News = () => {
  const session = useSession();
  const router = useRouter();
  const { news, getNews, createNews } = useNewsStore();
  const { formVisible, setFormVisible, clearForm, getFilledNews } = useNewsCreateStore();
  const { whoAmI, getWhoAmI } = useWhoAmIStore();

  useEffect(() => {
    if (!whoAmI && session.data) getWhoAmI()
  }, [whoAmI, getWhoAmI, session.data]);

  useEffect(() => {
    if (!news) getNews();
  }, [news, getNews]);

  useEffect(() => {
    document.title = "Заплыв НН - Главная"
  }, []);

  return (
    <div className={"content-container relative flex-col gap-4 min-h-fit max-h-[600px]"}>
      <div className={"flex flex-row items-center justify-between"}>
        <label className={"text-h4 text-base-95"}>Новости ТЕСТ деплоя</label>

        {whoAmI && whoAmI.admin && (
          <Button
            variant={"tertiary"} size={"S"} palette={"blue"}
            onClick={() => setFormVisible(true)}
          >
            Создать новость
          </Button>
        )}
      </div>

      {!news && (
        <div className={"flex h-[600px] w-full rounded-2xl bg-base-5 animate-pulse"}/>
      )}

      {news && news.length > 0 && (
        <Carousel
          items={news}
          renderItem={(item) => (
            <NewsCard key={item.id} news={item} onPress={() => router.push(`/article?id=${item.id}`)}/>
          )}
          renderThumbnail={(item) => {
            if (item.image1) return <ImageLoader imagePath={item.image1} className={"object-cover"}/>
            else return <div className={"flex w-full h-full bg-base-5"}/>
          }}
        />
      )}

      {news && news.length == 0 && (
        <p className={"text-bodyM_regular text-base-95"}>В данный момент новости отсутвуют</p>
      )}

      {formVisible && (
        <NewsCreateForm
          onSubmit={() => {
            createNews(getFilledNews(), () => setFormVisible(false))
            clearForm();
          }}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  )
}
