"use client"

import React, {useEffect} from "react";
import Marquee from "react-fast-marquee";
import {useAboutInfoStore} from "@/widgets/about-page-sections";
import {PartnerCard} from "@/features/about-info";

export const Partners = () => {
  const { partners, getPartners } = useAboutInfoStore();

  useEffect(() => {
    if (!partners) getPartners();
  }, [partners, getPartners]);

  if (!partners) return null

  return (
    <div className={"flex h-full w-full max-w-[1100px] m-auto rounded-3xl bg-base-0 lg-md:shadow-[0_4px_16px_0px_rgba(0,0,0,0.08)] lg-md:py-8 flex-col gap-4"}>
      <label className={"text-h4 text-base-95 px-[24px] xs:px-[52px]"}>Партнеры</label>

      <Marquee pauseOnHover gradient>
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} classname={"mx-[16px] w-[200px] h-[200px]"}/>
        ))}
      </Marquee>
    </div>
  )
}
