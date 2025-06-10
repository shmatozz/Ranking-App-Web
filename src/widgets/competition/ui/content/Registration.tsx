"use client"

import React, {useEffect, useState} from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {getSwimShort} from "@/shared/lib";
import {useUserStore} from "@/entities/user";
import {Button, FileInput, TextInput, Modal} from "@/shared/ui";
import {formatDate, getTime} from "@/shared/utils";
import {redirect, useSearchParams} from "next/navigation";
import {usePaymentStore, YooKassaWidget} from "@/features/participation-payment";

export const Registration = () => {
  const { competition, selectedSwim, joinSwim } = useCompetitionStore();
  const { user, getUserShortInfo } = useUserStore();
  const isUserLoading = useUserStore(state => state.isLoading)
  const {
    payment, token,
    createWidgetPayment, isLoading, clearPayment
  } = usePaymentStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!user && !isUserLoading) getUserShortInfo()
  }, [getUserShortInfo, isUserLoading, user]);

  const params = useSearchParams()
  if (!competition || !selectedSwim) {
    const newParams = new URLSearchParams(params);
    newParams.set("tab", "swims");
    redirect(`?${newParams.toString()}`);
  }

  const handleJoinSwim = () => {
    if (selectedSwim.price === 0) {
      setShowConfirmation(true);
    } else {
      createWidgetPayment(selectedSwim.price, `Оплата участия в заплыве ${getSwimShort(selectedSwim)}`);
    }
  };

  const confirmRegistration = () => {
    setShowConfirmation(false);
    joinSwim(selectedSwim.eventUuid);
  };

  return (
    <div className={"flex flex-col p-4 gap-4"}>
      <div className={"flex flex-col"}>
        <label className={"text-bodyM_medium text-base-95"}>Регистрация на заплыв</label>
        <label className={"text-h5 text-base-95"}>
          {getSwimShort(selectedSwim)}
          {", "}
          {`${selectedSwim.gender == "MALE" ? "Мужчины" : (selectedSwim.gender == "FEMALE" ? "Женщины" : "Общий")}, ${getTime(new Date(selectedSwim.startTime))}`}
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

      <FileInput title={"Загрузить мед. справку"}/>

      <Button
        variant={"primary"} size={"M"} isLoading={isLoading}
        className={"w-full max-w-[350px] self-center"}
        onClick={handleJoinSwim}
        disabled={user?.userEvents?.some((swim) => swim.eventUuid == selectedSwim.eventUuid)}
      >
        {user?.userEvents?.some((swim) => swim.eventUuid == selectedSwim.eventUuid) ?
          "Вы уже зарегистрированы" :
          selectedSwim.price === 0 ? "Зарегистрироваться" : `Оплатить ${selectedSwim.price} ₽`}
      </Button>

      {payment && token && (
        <YooKassaWidget
          confirmationToken={token}
          onComplete={() => {
            joinSwim(selectedSwim.eventUuid);
            clearPayment();
          }}
          onError={(error: never) => {
            console.error("Payment error:", error);
          }}
        />
      )}

      {showConfirmation && (
        <Modal>
          <div className={"flex flex-col gap-4"}>
            <p>Вы уверены, что хотите зарегистрироваться на заплыв {getSwimShort(selectedSwim)}?</p>
            <p className="mt-2">Участие бесплатное.</p>

            <div className={"flex flex-col xs:flex-row gap-4 justify-center items-center"}>
              <Button variant={"secondary"} onClick={() => setShowConfirmation(false)}>
                Отмена
              </Button>

              <Button variant={"primary"} onClick={confirmRegistration}>
                Подтвердить
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
