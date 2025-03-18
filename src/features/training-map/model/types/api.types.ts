import {LngLat} from "@yandex/ymaps3-types";
import {PointData} from "@/features/training-map";
import {Trainer} from "@/features/training-map/model/types/trainers.types";

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

export type GetTrainersRequest = {
  coordinateId: number,
}

export type GetTrainersResponseData = {
  totalElements: number,
  totalPages: number,
  content: Trainer[]
}

export type CreateTrainerRequest = {
  coordinateId: number,
  data: FormData
}
