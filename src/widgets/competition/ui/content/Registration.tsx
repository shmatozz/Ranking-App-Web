"use client"

import React, {useEffect} from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {getSwimShort} from "@/shared/lib";
import {useUserStore} from "@/entities/user";
import {Button, FileInput, TextInput} from "@/shared/ui";
import {formatDate, getTime} from "@/shared/utils";
import {redirect, useSearchParams} from "next/navigation";
import {usePaymentStore} from "@/features/participation-payment";

export const Registration = () => {
  const { competition, selectedSwim } = useCompetitionStore();
  const { user, getUserShortInfo } = useUserStore();
  const isUserLoading = useUserStore(state => state.isLoading)
  const { payment, paymentURL , createPayment, isLoading } = usePaymentStore();

  useEffect(() => {
    if (!user && !isUserLoading) getUserShortInfo()
  }, [getUserShortInfo, isUserLoading, user]);

  useEffect(() => {
    if (paymentURL && payment) {
      localStorage.setItem("payment", payment.id);
      localStorage.setItem("swimID", selectedSwim!.eventUuid);
      redirect(paymentURL);
    }
  }, [payment, paymentURL, selectedSwim]);

  const params = useSearchParams()
  if (!competition || !selectedSwim) {
    const newParams = new URLSearchParams(params);
    newParams.set("tab", "swims");
    redirect(`?${newParams.toString()}`);
  }

  if (payment) {
    return (
      <div className={"flex flex-col p-4 gap-4"}>
        Производиться оплата
      </div>
    )
  }

  return (
    <div className={"flex flex-col p-4 gap-4"}>
      <div className={"flex flex-col"}>
        <label className={"text-bodyM_medium text-base-95"}>Регистрация на заплыв</label>
        <label className={"text-h5 text-base-95"}>
          {getSwimShort(selectedSwim)}
          {", "}
          {`${selectedSwim.gender == "MALE" ? "Мужчины" : (selectedSwim.gender == "FEMALE" ? "Женщины" : "Общий")}, макс. очков: ${selectedSwim.maxPoints}, ${getTime(new Date(selectedSwim.startTime))}`}
        </label>
      </div>

      <div className={"flex flex-col w-full gap-4 xl:flex-row"}>
        <TextInput title={"Фамилия"} value={user?.lastName} disabled/>
        <TextInput title={"Имя"} value={user?.firstName} disabled/>
        <TextInput title={"Отчетство"} value={user?.middleName} disabled/>
      </div>

      <div className={"flex flex-col w-full gap-4 xl:flex-row"}>
        <TextInput title={"Почта"} value={user?.email} disabled/>
        <TextInput title={"Дата рождения"} value={formatDate(user?.birthDate)} disabled/>
        <TextInput title={"Экстренный телефон"} value={user?.emergencyPhone} disabled/>
      </div>

      <FileInput title={"Загрузить мед. справку"} />

      <Button
        variant={"primary"} size={"M"} isLoading={isLoading}
        className={"w-full max-w-[350px] self-center"}
        onClick={() => createPayment(
          100,
          `http://localhost:3000/calendar/competition?id=${competition?.competitionUuid}&tab=swims`,
          `Оплата участия в заплыве ${getSwimShort(selectedSwim)}`
        )}
      >
        {"Оплатить" + (selectedSwim.cost ? selectedSwim.cost!.toString() : "")}
      </Button>
    </div>
  )
}
