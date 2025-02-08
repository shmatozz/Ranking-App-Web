export type Swim = {
  distance: number,
  style: string,
  gender: "MALE" | "FEMALE",
  ageCategory: string,
  maxPoints: number,
  startTime: string,
  endTime: string,
  competitionUUID: string
}

export type SwimResult = {
  swim: Swim;
  place: number;
  time: string;
}