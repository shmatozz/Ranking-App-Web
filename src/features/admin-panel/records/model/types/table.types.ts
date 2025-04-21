export type RecordEntry = {
  id: number;
  distance: number;
  style: string;
  gender: "MALE" | "FEMALE";
  time: string;
}

export type TimeInput = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export const genderDropDown: {id: string, name: string}[] = [
  { id: "MALE", name: "Мужской" },
  { id: "FEMALE", name: "Женский" },
  { id: "RESET", name: "Сбросить" }
]

export const swimStylesDropdown: { id: string, name: string }[] = [
  { id: "freestyle", name: "Вольный" },
  { id: "breaststroke", name: "Брасс" },
  { id: "crawl", name: "Кроль" },
  { id: "butterfly", name: "Баттерфляй" },
  { id: "neck", name: "На спине" },
  { id: "medley", name: "Комплексный" },
  { id: "RESET", name: "Сбросить" }
]

