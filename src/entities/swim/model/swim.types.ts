export type Swim = {
  distance: number,
  style: string,
  gender: "MALE" | "FEMALE" | "MIXED",
  ageFrom: number,
  ageTo: number,
  maxPoints: number,
  startTime: string,
  status?: "CREATED" | "IN PROGRESS" | "ENDED",
  eventUuid: string
}

export type SwimResult = {
  swim: Swim;
  place: number;
  time: string;
}
