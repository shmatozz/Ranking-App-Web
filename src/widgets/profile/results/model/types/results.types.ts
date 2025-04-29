export type EventResult = {
  gender: string,
  ageFrom: number,
  ageTo: number,
  distance: number,
  style: string,
  time: string,
  place: number
}

export type CompetitionResult = {
  competitionName: string,
  events: EventResult[]
}

export type UserResults = {
  userRating?: number,
  competitions: CompetitionResult[]
}
