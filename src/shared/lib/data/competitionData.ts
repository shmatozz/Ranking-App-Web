import {Swim} from "@/entities/swim";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

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

  return competition <= today;
}

export function getSwimsDropDown(swims: Swim[]): DropdownItem[] {
  const shortInfo: DropdownItem[] = [];

  swims.forEach((swim) => {
    shortInfo.push({
      id: swim.eventUuid,
      name: getSwimShort(swim)
    })
  })

  return shortInfo;
}

export function getSwimShort(swim: Swim): string {
  return `${swim.distance}м, ${getAgeRange(swim.ageFrom, swim.ageTo)}, стиль ${swim.style}`;
}
