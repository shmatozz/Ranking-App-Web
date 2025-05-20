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
  placemark: PointData;
  selected?: boolean;
  onClick?: () => void;
  admin?: boolean;
  onDeletePress?: () => void;
  className?: string;
}

export const PlacemarkCard: React.FC<PlacemarkCardProps> = (
  props
) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updateFormVisible, setUpdateFormVisible] = React.useState(false);
  const {getMarker, clearForm, fillForm} = usePlacemarkCreateStore();
  const {updatePlacemark} = useMapStore();

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 px-6 py-3 container-shadow rounded-2xl xs:px-8",
        props.selected ? "bg-gradient-to-l from-blue-5 to-base-0" : "bg-base-0"
      )}
      onClick={props.admin ? () => {} : props.onClick}
    >
      <div className={"flex flex-col w-full items-center justify-between xs:flex-row"}>
        <div className={"flex flex-col gap-1 w-full"}>
          <p className={"text-bodyM_medium text-base-95 xs:text-h5_bold"}>{props.placemark.geoJson.properties.name}</p>
          <p className={"text-bodyS_regular text-base-95 xs:text-bodyM_regular whitespace-pre-wrap"}>{props.placemark.geoJson.properties.description}</p>
        </div>

        {props.admin && (
          <div className={"flex flex-row gap-2"}>
            <>
              <Button
                variant={"tertiary"} size={"S"} palette={"blue"}
                onClick={() => {
                  fillForm(props.placemark)
                  setUpdateFormVisible(true)
                }}
              >
                Редактировать
              </Button>

              {updateFormVisible && (
                <PlacemarkCreateForm
                  onSubmit={() => {
                    updatePlacemark(props.placemark.id, getMarker(), () =>  setUpdateFormVisible(false));
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
                    <Button variant="primary" size={"S"} onClick={() => { if (props.onDeletePress) props.onDeletePress()} }>Удалить</Button>
                    <Button variant="secondary" size={"S"} onClick={() => setIsModalOpen(false)}>Отмена</Button>
                  </div>
                </Modal>
              )}
            </>
          </div>
        )}
      </div>

      <TrainersList coordinateId={props.placemark.id} selected={props.selected} admin={props.admin}/>
    </div>
  )
}
