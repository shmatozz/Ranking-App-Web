"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import {Button} from "@/shared/ui";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderThumbnail?: (item: T, index: number) => React.ReactNode;
  useThumbnails?: boolean;
}

export const Carousel = <T,>({ items, renderItem, renderThumbnail, useThumbnails = false }: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const onThumbClick = useCallback((index: number) => {
    if (!emblaApi || !thumbsApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi, thumbsApi]);

  return (
    <div className="relative flex flex-col gap-2 h-[600px]">
      <div className="flex flex-1 overflow-hidden rounded-2xl container-shadow" ref={emblaRef}>
        <div className="flex flex-1 w-full">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      <div className={"flex flex-col justify-between gap-2 xs:flex-row"}>
        <div className={"flex flex-row gap-4 h-full pl-4"}>
          <Button variant={"tertiary"} size={"S"} palette={"gray"} onClick={onPrevButtonClick}>
            назад
          </Button>

          <Button variant={"tertiary"} size={"S"} palette={"gray"} onClick={onNextButtonClick}>
            далее
          </Button>
        </div>

        {useThumbnails && renderThumbnail ? (
          <div className="flex justify-center mt-2" ref={thumbsRef}>
            <div className="flex gap-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={`w-32 h-16 rounded-lg overflow-hidden border-2 ${index === selectedIndex ? "border-blue-70" : "border-base-10"}`}
                >
                  {renderThumbnail(item, index)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-end items-center pr-4">
            <div className="flex gap-2 overflow-hidden">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`w-4 h-4 rounded-full opacity-75 border-[3px] ${index === selectedIndex ? "border-blue-70" : "border-base-10"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("reInit", () => setScrollSnaps(emblaApi.scrollSnapList()));
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return { onPrevButtonClick, onNextButtonClick };
};
