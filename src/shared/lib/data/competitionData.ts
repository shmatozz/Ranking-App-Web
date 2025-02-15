import {Swim} from "@/entities/swim";

export function getDistances(swims: Swim[]): string {
  if (swims.length === 0) return "-";

  const distances = swims.map((swim) => swim.distance);
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);

  return `${minDistance}-${maxDistance}`;
}
