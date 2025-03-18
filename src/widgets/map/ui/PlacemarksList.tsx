"use client"

import React, {useEffect} from "react";
import {PlacemarkCreateForm, useMapStore, usePlacemarkCreateStore} from "@/features/training-map";
import {Checkbox} from "@/shared/ui";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useSession} from "next-auth/react";
import {PlacemarkCard} from "@/features/training-map/ui/PlacemarkCard";

export const PlacemarksList = () => {
  const session = useSession()
  const {formVisible, setFormVisible, getMarker, clearForm} = usePlacemarkCreateStore();
  const {
    placemarks, selectedPointID, editMode,
    setEditMode, addPlacemark, getPlacemarks, deletePlacemark, setSelectedPointID
  } = useMapStore();
  const { whoAmI, getWhoAmI } = useWhoAmIStore()

  useEffect(() => {
    if (!whoAmI && session.data) getWhoAmI()
  }, [whoAmI, getWhoAmI, session.data]);

  useEffect(() => {
    getPlacemarks()
  }, [getPlacemarks]);

  return (
    <div className={"flex flex-col gap-2 h-fit p-4"}>
      <div className={"flex flex-row w-full justify-between"}>
        <label className={"text-h5_bold text-base-95 w-full"}>Доступные места</label>

        {whoAmI && whoAmI.admin && (
          <Checkbox
            checked={editMode} onClick={() => setEditMode(!editMode)}
            text={"Режим редактирования"} className={"max-w-fit"}
          />
        )}
      </div>

      <div className={"flex flex-col gap-4"}>
        {placemarks.length > 0 && placemarks.map((item) => (
          <PlacemarkCard
            key={item.id}
            placemark={item}
            selected={selectedPointID === item.id}
            onClick={() => {
              setSelectedPointID(selectedPointID === item.id ? undefined : item.id);
            }}
            admin={editMode} onDeletePress={() => deletePlacemark(item.id)}
          />
        ))}

        {placemarks.length === 0 && (
          <p className={"text-bodyM_regular text-base-95 text-center"}>В данный момент информация отсутвует</p>
        )}
      </div>

      {formVisible && (
        <PlacemarkCreateForm
          onSubmit={() => {
            addPlacemark(getMarker(), () =>  setFormVisible(false));
            clearForm();
          }}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  )
}
