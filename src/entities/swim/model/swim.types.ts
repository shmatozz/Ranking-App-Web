export type Swim = {
  distance: number,
  style: string,
  gender: "MALE" | "FEMALE",
  ageCategory: string,
  maxPoints: number,
  startTime: string,
  status?: "CREATED" | "IN PROGRESS" | "ENDED",
  competitionUUID?: string
}

export type SwimResult = {
  swim: Swim;
  place: number;
  time: string;
}
