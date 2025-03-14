import {LngLat} from "@yandex/ymaps3-types";
import {PointData} from "@/features/training-map";

export type SavePointRequest = {
  name: string,
  description: string,
  geometry: {
    type: string,
    coordinates: LngLat
  },
  email: string
}

export type GetPointsResponse = {
  status: number,
  data: PointData[]
}

export type UpdatePointRequest = {
  id: number,
  point: SavePointRequest,
}

export type DeletePointRequest = {
  id: number,
}
