import React from "react";
import {Carousel, ImageLoader} from "@/shared/ui";
import {News} from "@/features/news";

interface ArticleContentProps {
  selectedNews: News;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  selectedNews
}) => {
  const images = [selectedNews.image1, selectedNews.image2, selectedNews.image3].filter(Boolean);

  return (
    <div className={"flex flex-col gap-4"}>
      {images.length > 1 ? (
        <Carousel
          items={images}
          renderItem={(item, index) => (
            <div key={index} className={"flex relative flex-[0_0_100%] overflow-hidden"}>
              <ImageLoader imagePath={item!} className="object-contain max-h-full" doubling />
            </div>
          )}
        />
      ) : images.length === 1 ? (
        <div className={"flex relative overflow-hidden rounded-2xl max-h-[500px]"}>
          <ImageLoader imagePath={images[0]!} className="object-contain max-h-[500px]" doubling />
        </div>
      ) : null}

      <p className="text-bodyM_regular text-base-95 whitespace-pre-wrap">{selectedNews.text}</p>
    </div>
  )
}
