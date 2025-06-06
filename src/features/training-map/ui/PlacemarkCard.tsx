"use client"

import React from "react";
import {
  PlacemarkCreateForm,
  PointData,
  TrainersList,
  useMapStore,
  usePlacemarkCreateStore
} from "@/features/training-map";
import {Button, Modal} from "@/shared/ui";
import clsx from "clsx";

interface PlacemarkCardProps {
  placemark?: PointData;
  selected?: boolean;
  onClick?: () => void;
  admin?: boolean;
  onDeletePress?: () => void;
  className?: string;
}

export const PlacemarkCard: React.FC<PlacemarkCardProps> = ({
  placemark,
  selected,
  onClick,
  admin,
  onDeletePress,
  className
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updateFormVisible, setUpdateFormVisible] = React.useState(false);
  const {getMarker, clearForm, fillForm} = usePlacemarkCreateStore();
  const {updatePlacemark} = useMapStore();

  if (!placemark) {
    return (
      <div className={"px-6 py-3 h-[120px] container-shadow rounded-2xl xs:px-8 bg-base-5 animate-pulse"}/>
    )
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 px-6 py-3 container-shadow rounded-2xl xs:px-8",
        selected ? "bg-gradient-to-l from-blue-5 to-base-0" : "bg-base-0",
        className
      )}
      onClick={admin ? () => {} : onClick}
    >
      <div className={"flex flex-col w-full items-center justify-between xs:flex-row"}>
        <div className={"flex flex-col gap-1 w-full"}>
          <p className={"text-bodyM_medium text-base-95 xs:text-h5_bold"}>{placemark.geoJson.properties.name}</p>
          <p className={"text-bodyS_regular text-base-95 xs:text-bodyM_regular whitespace-pre-wrap"}>{placemark.geoJson.properties.description}</p>
        </div>

        {admin && (
          <div className={"flex flex-row gap-2"}>
            <>
              <Button
                variant={"tertiary"} size={"S"} palette={"blue"}
                onClick={() => {
                  fillForm(placemark)
                  setUpdateFormVisible(true)
                }}
              >
                Редактировать
              </Button>

              {updateFormVisible && (
                <PlacemarkCreateForm
                  onSubmit={() => {
                    updatePlacemark(placemark.id, getMarker(), () =>  setUpdateFormVisible(false));
                    clearForm();
                  }}
                  onCancel={() => setUpdateFormVisible(false)}
                  edit
                />
              )}
            </>

            <>
              <Button
                variant={"tertiary"} size={"S"} palette={"gray"}
                onClick={() => setIsModalOpen(true)}
              >
                Удалить
              </Button>

              {isModalOpen && (
                <Modal>
                  <p>Вы уверены, что хотите удалить точку на карте?</p>
                  <div className="flex gap-4 mt-4 justify-evenly">
                    <Button variant="primary" size={"S"} onClick={() => { if (onDeletePress) onDeletePress()} }>Удалить</Button>
                    <Button variant="secondary" size={"S"} onClick={() => setIsModalOpen(false)}>Отмена</Button>
                  </div>
                </Modal>
              )}
            </>
          </div>
        )}
      </div>

      <TrainersList coordinateId={placemark.id} selected={selected} admin={admin}/>
    </div>
  )
}
