'use client'

import React, {useEffect, useState} from "react";
import {Icon, icons, Logo} from "@/shared/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {useNotificationsStore} from "@/features/notifications";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { notifications, isNotificationsOpen, setNotificationsOpen, getNotifications } = useNotificationsStore();

  const isActive = (href: string) => pathname.startsWith(href);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    console.log(notifications && notifications.length > 0);
  }, [notifications]);

  const NavLinks = ({ isActive }: { isActive: (href: string) => boolean }) => (
    <div className="flex flex-col large:flex-row gap-2">
      <NavLink href="/calendar" label="Календарь" isActive={isActive}/>
      <NavLink href="/ratings" label="Рейтинг" isActive={isActive}/>
      <NavLink href="/about" label="О нас" isActive={isActive}/>
      <NavLink href="/useful" label="Полезное" isActive={isActive}/>

      <div  onClick={() => setNotificationsOpen(true)}
            className="flex large:hidden w-[11.25rem] px-8 h-full min-h-10 justify-center group select-none lg-md:min-h-[50px]">
        <div className={clsx(
          "flex items-center justify-center w-full relative transition-colors text-base-0",
          isNotificationsOpen ?"text-blue-10" : "text-base-0"
        )}>
          {"Уведомления"}
          <div className={clsx("absolute bottom-0 w-full transition-all duration-200 group-hover:h-1", isNotificationsOpen ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
        </div>
      </div>
    </div>
  );

  const NavLink = ({href, label, isActive}: { href: string; label: string; isActive: (href: string) => boolean }) => (
    <Link href={href} onClick={toggleMenu}
          className="flex w-[11.25rem] px-8 h-full min-h-10 justify-center group select-none lg-md:min-h-[50px]">
      <div className={clsx(
        "flex items-center justify-center w-full relative transition-colors",
        isActive(href) ? "text-blue-10" : "text-base-0"
      )}>
        {label}
        <div className={clsx("absolute bottom-0 w-full transition-all duration-200 group-hover:h-1", isActive(href) ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
      </div>
    </Link>
  );

  const IconLink = ({href, icon, isActive}: {
    href: string;
    icon: keyof typeof icons;
    isActive: (href: string) => boolean
  }) => (
    <Link
      href={href}
      className="flex items-center justify-center h-full w-full max-w-[11.25rem] relative group"
    >
      <Icon name={icon} size={32} color={isActive(href) ? "#D3DCFF" : "white" } className={"transition-colors"}/>

      <div className={clsx("absolute bottom-0 w-full transition-all duration-200 group-hover:h-1", isActive(href) ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
    </Link>
  );


  return (
    <header
      className="flex flex-row h-[50px] bg-blue-50 sticky top-0 justify-between gap-4 drop-shadow-lg px-4 z-50 large:justify-center xs:px-8"
    >
      {/* Logo */}
      <Link href={"/"}>
        <div
          className="flex px-[1.125rem] py-4 w-fit h-fit bg-base-0 rounded-b-2xl items-center justify-center transition-all duration-200 ease-in-out hover:pt-6 z-[51]"
        >
          <Logo/>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden large:flex w-full max-w-[56.25rem] h-full gap-4">
        <NavLinks isActive={isActive}/>
      </nav>

      <div className={"flex flex-row gap-2"}>
        {/* Icons */}
        <div className="flex flex-row gap-4 justify-end">
          <IconLink href="/profile" icon="account" isActive={isActive}/>

          <div
            className="hidden xs:flex items-center justify-center h-full w-full max-w-[11.25rem] relative group"
            onClick={() => setNotificationsOpen(true)}
          >
            <Icon name={(notifications && notifications.length > 0) ? "bellBadge" : "bell"} size={26} color={isNotificationsOpen ? "#D3DCFF" : "white"}
                  className={"transition-colors"}/>
            <div
              className={clsx("absolute bottom-0 w-full transition-all duration-200 group-hover:h-1", isNotificationsOpen ? "h-1 bg-blue-10" : "h-0 bg-base-0")}/>
          </div>
        </div>

        {/* Бургер-меню для мобильных */}
        <button className="h-full w-[3.25rem] flex items-center justify-center large:hidden" onClick={toggleMenu}>
          <Icon name={isMenuOpen ? "close" : "menu"} size={32} color="white"/>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div
          className="absolute top-[50px] right-0 gap-4 w-fit bg-blue-50 bg-opacity-85 shadow-md flex flex-col items-center py-4 large:hidden rounded-bl-2xl -z-10">
          <NavLinks isActive={isActive}/>
        </div>
      )}
    </header>
  );
};
