"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { Icon } from "@/shared/ui";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const Carousel = <T,>({ items, renderItem}: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <div className="relative flex flex-col gap-4 h-[600px]">
      <button
        aria-label="go to previous slide"
        onClick={onPrevButtonClick}
        className="h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-50 absolute top-1/2 -translate-y-1/2 z-10 left-4 text-black"
      >
        <Icon name="chevronLeft" size={32} color="#868686" />
      </button>
      <button
        aria-label="go to next slide"
        onClick={onNextButtonClick}
        className="h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-50 absolute top-1/2 -translate-y-1/2 z-10 right-4 text-black"
      >
        <Icon name="chevronRight" size={32} color="#868686" />
      </button>

      <div className="flex flex-1 overflow-hidden rounded-2xl container-shadow" ref={emblaRef}>
        <div className="flex flex-1 w-full">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-4 h-4 rounded-full opacity-75 border-[3px] ${index === selectedIndex ? "border-blue-70" : "border-base-10"}`}
            >
              <span className="sr-only">go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("reInit", () => setScrollSnaps(emblaApi.scrollSnapList()));
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void) => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  return { onPrevButtonClick, onNextButtonClick };
};
