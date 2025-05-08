import {ArrangeOption} from "@/shared/lib";

export type ArrangeFilter = { id: ArrangeOption, name: string }

export const arrangeFilters: ArrangeFilter[] = [
  { id: "date-closer", name: "Дата (ближе)"},
  { id: "date-farther", name: "Дата (дальше)"},
  { id: "name", name: "Название"},
]
