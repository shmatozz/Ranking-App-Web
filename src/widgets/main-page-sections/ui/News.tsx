"use client";

import React, {useCallback, useEffect} from "react";
import {useNewsStore} from "@/features/news/model/NewsStore";
import {NewsCard} from "@/features/news/ui/NewsCard";
import useEmblaCarousel from "embla-carousel-react";
import {Button, Icon} from "@/shared/ui";
import Autoplay from "embla-carousel-autoplay";
import {EmblaCarouselType} from "embla-carousel";
import {useSession} from "next-auth/react";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useNewsCreateStore} from "@/features/news/model/NewsCreateStore";
import {NewsCreateForm} from "@/features/news";

export const News = () => {
  const session = useSession()
  const { news, getNews, createNews } = useNewsStore();
  const { formVisible, setFormVisible, clearForm, getFilledNews } = useNewsCreateStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { whoAmI, getWhoAmI } = useWhoAmIStore();

  useEffect(() => {
    if (!whoAmI && session.data) getWhoAmI()
  }, [whoAmI, getWhoAmI, session.data]);


  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  useEffect(() => {
    if (!news) getNews();
  }, [news, getNews]);
  return (
    <div className={"content-container relative flex-col gap-4 min-h-[600px] max-h-[600px]"}>
      <div className={"flex flex-row items-center justify-between"}>
        <label className={"text-h4 text-base-95"}>Новости</label>

        {whoAmI && whoAmI.admin && (
          <Button
            variant={"tertiary"} size={"S"} palette={"blue"}
            onClick={() => setFormVisible(true)}
          >
            Создать новость
          </Button>
        )}
      </div>

      <button
        aria-label='go to previous slide'
        onClick={onPrevButtonClick}
        className='h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-40  absolute top-1/2 -translate-y-1/2 z-10 left-4 text-black'
      >
        <Icon name={"chevronLeft"} size={32} color={"#868686"}/>
      </button>
      <button
        aria-label='go to next slide'
        onClick={onNextButtonClick}
        className='h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-40 absolute top-1/2 -translate-y-1/2 z-10 right-4 text-black'
      >
        <Icon name={"chevronRight"} size={32} color={"#868686"}/>
      </button>

      <div className='flex flex-1 overflow-hidden rounded-2xl container-shadow' ref={emblaRef}>
        <div className={"flex flex-1"}>
          {news && news.map((item) => (
            <NewsCard key={item.id} news={item}/>
          ))}
        </div>
      </div>


      <div className="flex w-full justify-center">
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-4 h-4 rounded-full opacity-75 border-[3px] ${
                index === selectedIndex ? "border-blue-70" : "border-base-10"
              }`}
            >
              <span className='sr-only'>go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

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


type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}
