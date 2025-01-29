'use client'

import React from "react";

import {Icon, Logo} from "@/shared/ui";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

export const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const pageDivStyle: string = "flex items-center justify-center w-full relative transition-colors";
  const activePageIndicatorStyle: string = "absolute bottom-0 w-full transition-all duration-200 group-hover:h-1";
  const linkStyle: string = "flex w-[11.25rem] px-8 h-full justify-center group select-none";

  return (
    <header
      className="flex flex-row h-14 bg-blue-50 sticky top-0 justify-center gap-4 drop-shadow-lg z-10"
    >
      {/* Logo */}
      <Link href={"/"}>
        <div
          className="flex px-[1.125rem] py-4 w-fit h-fit bg-base-0 rounded-b-2xl items-center justify-center transition-all duration-200 ease-in-out hover:pt-6"
        >
          <Logo/>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex w-full max-w-[56.25rem] h-full gap-4">

        {/* Page buttons */}
        <div className="flex w-full">
          {/* Calendar (competitions list) link */}
          <Link
            href={"/calendar"}
            className={linkStyle}
          >
            <div className={clsx(pageDivStyle, isActive("/calendar") ? "text-blue-10" : "text-base-0")}>
              Календарь
              <div className={clsx(activePageIndicatorStyle, isActive("/calendar") ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
            </div>
          </Link>

          {/* Ratings link */}
          <Link
            href={"/ratings"}
            className={linkStyle}
          >
            <div className={clsx(pageDivStyle, isActive("/ratings") ? "text-blue-10" : "text-base-0")}>
              Рейтинг
              <div className={clsx(activePageIndicatorStyle, isActive("/ratings") ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
            </div>
          </Link>

          {/* About us link */}
          <Link
            href={"/about"}
            className={linkStyle}
          >
            <div className={clsx(pageDivStyle, isActive("/about") ? "text-blue-10" : "text-base-0")}>
              О нас
              <div className={clsx(activePageIndicatorStyle, isActive("/about") ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
            </div>
          </Link>
        </div>

        {/* Icon pages */}
        <div className="flex flex-row items-center gap-4">
          {/* Account link */}
          <Link
            href={"/profile"}
            className="flex items-center justify-center h-full w-full relative group"
          >
            <Icon name={"account"} size={32} color={isActive("/profile") ? "#D3DCFF" : "white" } className={"transition-colors"}/>

            <div className={clsx(activePageIndicatorStyle, isActive("/profile") ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
          </Link>

          {/* Notifications modal */}
          <div className="flex items-center justify-center h-full w-[3.25rem] relative group">
            <Icon name={"bell"} size={30} color={"white"}/>

            <div className={activePageIndicatorStyle}/>
          </div>
        </div>
      </div>
    </header>
  )
}
