import {LngLat} from "@yandex/ymaps3-types";

export type Marker = {
  name: string,
  description: string,
  geometry: {
    type: string,
    coordinates: LngLat
  },
  email: string
}
