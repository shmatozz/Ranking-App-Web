import {Swim} from "@/entities/swim";

export function getDistances(swims: Swim[]): string {
  if (swims.length === 0) return "-";

  const distances = swims.map((swim) => swim.distance);
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);

  return `${minDistance}-${maxDistance}`;
}

export function getAgeRange(from: number, to: number): string {
  return `от ${from} до ${to} ${to % 10 == 1 ? "года" : "лет"}`;
}

export function isPassed(competitionDate?: string): boolean {
  if (!competitionDate) return false;

  const competition = new Date(competitionDate);
  const today = new Date();

  competition.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return competition < today;
}
