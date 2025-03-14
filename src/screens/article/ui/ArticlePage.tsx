"use client";

import React, { useEffect, useState } from "react";
import {redirect, useSearchParams} from "next/navigation";
import { News, useNewsStore } from "@/features/news";
import {ArticleContent, ArticleHeader} from "@/widgets/article-sections";

export const ArticlePage = () => {
  const params = useSearchParams();
  const id = params.get("id");
  if (!id) redirect("/");

  const { news, getNews } = useNewsStore();
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    if (!news) getNews();
    else setSelectedNews(news.find((item) => item.id.toString() === id) || null);
  }, [news, getNews, id]);

  useEffect(() => {
    if (!selectedNews) document.title = "Новость";
    else document.title = selectedNews.topic;
  }, [selectedNews]);

  if (!selectedNews) return (
    <div
      className="content-container justify-center">
      <div className="h-7 w-7 border-4 border-transparent border-r-inherit rounded-full animate-spin"/>
    </div>
  )

  return (
    <div className="content-container relative flex-col gap-4">
      <ArticleHeader selectedNews={selectedNews}/>
      <ArticleContent selectedNews={selectedNews}/>
    </div>
  );
};
