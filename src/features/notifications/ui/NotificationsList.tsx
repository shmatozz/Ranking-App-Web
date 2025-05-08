"use client"

import React, {useEffect} from "react";
import clsx from "clsx";
import {IconButton} from "@/shared/ui";
import {useNotificationsStore} from "@/features/notifications";
import {useWhoAmIStore} from "@/features/who-am-i";

export const NotificationsList = () => {
  const {
    isNotificationsOpen, setNotificationsOpen,
    notifications, getNotifications, deleteNotification,
    isLoading
  } = useNotificationsStore();

  const { whoAmI } = useWhoAmIStore();

  useEffect(() => {
    getNotifications();
  }, [whoAmI, getNotifications]);

  return (
    <div className={clsx(
      "fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none",
      isNotificationsOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
    )}>
      <div
        className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
        onClick={() => setNotificationsOpen(false)}
      />

      {/* Sliding panel */}
      <div className={clsx(
        "absolute top-0 right-0 h-full max-w-[400px] bg-white shadow-xl transform transition-all duration-300 ease-in-out",
        isNotificationsOpen ? "w-full" : "w-0"
      )}>
        {/* Panel header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Уведомления</h2>

          <div className={"flex flex-row gap-2"}>
            <IconButton
              icon={'refresh'} size={"S"} variant={"tertiary"} palette={"gray"}
              onClick={() => getNotifications()}
            />

            <IconButton
              icon={'close'} size={"S"} variant={"tertiary"} palette={"gray"}
              onClick={() => setNotificationsOpen(false)}
            />
          </div>
        </div>

        {whoAmI !== undefined ? (
          <div className="h-[calc(100%-60px)] overflow-y-auto">
            {notifications && notifications.length > 0 && !isLoading && notifications.map((item) => (
              <div key={item.id} className={"flex flex-row p-4 items-center"}>
                <p className={"text-bodyM_regular w-full"}>{item.text}</p>

                <IconButton
                  icon={"close"} size={"S"} variant={"tertiary"}
                  onClick={() => deleteNotification(item.id)}
                />
              </div>
            ))}

            {notifications != undefined && notifications.length == 0 && !isLoading && (
              <div className="flex flex-row p-4">
                <p className="text-gray-600">Нет новых уведомлений</p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col p-4 gap-4">
                <p className="text-gray-600 loader">Нет новых уведомлений</p>
                <p className="text-gray-600 loader">Нет новых уведомлений</p>
                <p className="text-gray-600 loader">Нет новых уведомлений</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            <p className="text-gray-600">Вы не авторизованы</p>
          </div>
        )}
      </div>
    </div>
  )
}
