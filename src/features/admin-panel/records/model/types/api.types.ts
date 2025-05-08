import {RecordEntry} from "@/features/admin-panel/records";

export type PageRequestDto = {
  page: number;
  size: number;
}

export type SearchParamsDto = {
  distance?: number;
  style?: string;
  gender?: string;
}

export type CreateRecordParams = {
  distance: number,
  style: string,
  gender: "MALE" | "FEMALE",
  time: {
    hour: number,
    minute: number,
    second: number,
    nano: number
  }
}

export type UpdateRecordParams = {
  id: number,
  newTime: {
    hour: number,
    minute: number,
    second: number,
    nano: number
  }
}
export type RecordResponse = {
  totalElements: number;
  totalPages: number;
  content: RecordEntry[];
}
