'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactifiedModule } from '@yandex/ymaps3-types/reactify/reactify';
import {DomEvent, YMapLocationRequest} from '@yandex/ymaps3-types';
import {DomEventHandlerObject} from "@yandex/ymaps3-types/imperative/YMapListener";
import {useMapStore, usePlacemarkCreateStore} from "@/features/training-map";

export const LOCATION: YMapLocationRequest = {
  center: [43.961082, 56.29254],
  zoom: 12,
};

type ReactifiedApi = ReactifiedModule<typeof ymaps3>;

export const Map = () => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();

  const { placemarks, editMode, selectedPointID, setSelectedPointID } = useMapStore();
  const {setFormVisible, setCoordinates } = usePlacemarkCreateStore();

  React.useEffect(() => {
    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]).then(([{ reactify }]) =>
      setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
    );
  }, []);

  const handleMapClick = async (_object: DomEventHandlerObject, event: DomEvent) => {
    if (editMode) {
      setFormVisible(true);
      setCoordinates(event.coordinates)
    }
  };

  if (!reactifiedApi) {
    return (
      <div className={"flex relative h-full w-full items-center justify-center"}>
        <p className={"text-bodyM_regular text-base-95 z-10"}>Загрузка карты</p>
        <div className={"absolute w-full h-full bg-base-5 animate-pulse"}/>
      </div>
    )
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapCollection,
    YMapMarker,
    YMapListener,
  } = reactifiedApi;

  return (
    <YMap location={LOCATION} className="w-full h-full">
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapCollection>
        {placemarks.map((marker) => (
          <YMapMarker
            key={marker.id}
            coordinates={marker.geoJson.geometry.coordinates}
            onClick={() => setSelectedPointID(selectedPointID === marker.id ? undefined : marker.id)}
          >
            <div className="absolute bg-blue-50 w-6 h-6 border-2 rounded-full border-white -top-3 -left-3 z-10"/>

            {selectedPointID === marker.id && (
              <div className={"absolute flex h-6 w-fit -top-3 bg-white px-4 rounded-xl"}>
                <p className={"text-bodyM_regular text-nowrap"}>{marker.geoJson.properties.name}</p>
              </div>
            )}
          </YMapMarker>
        ))}
      </YMapCollection>

      <YMapListener onClick={handleMapClick}/>
    </YMap>
  );
};
