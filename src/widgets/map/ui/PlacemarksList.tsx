import React, {useEffect} from "react";
import {PlacemarkCreateForm, useMapStore, usePlacemarkCreateStore} from "@/features/training-map";
import {Checkbox} from "@/shared/ui";
import {useWhoAmIStore} from "@/features/who-am-i";

export const PlacemarksList = () => {
  const {
    createAllowed, formVisible,
    setCreateAllowed, setFormVisible, getMarker
  } = usePlacemarkCreateStore();
  const { addPlacemark } = useMapStore();
  const { whoAmI, getWhoAmI } = useWhoAmIStore()

  useEffect(() => {
    if (!whoAmI) getWhoAmI()
  }, [whoAmI, getWhoAmI]);

  return (
    <div className={"h-fit p-4"}>
      <div className={"flex flex-row w-full justify-between"}>
        <label className={"text-h5_bold text-base-95 w-full"}>Доступные места</label>

        {whoAmI && whoAmI.admin && (
          <Checkbox
            checked={createAllowed} onClick={() => setCreateAllowed(!createAllowed)}
            text={"Режим редактирования"} className={"max-w-fit"}
          />
        )}
      </div>

      <div className={"flex flex-col"}>
        *Список карточек меток*
      </div>

      {formVisible && (
        <PlacemarkCreateForm
          onSubmit={() => {
            addPlacemark(getMarker());
            setFormVisible(false);
          }}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  )
}
