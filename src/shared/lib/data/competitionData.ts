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
  return `от ${from} до ${to} ${(to % 10 == 1 && to != 11) ? "года" : "лет"}`;
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

export function getEmbedStreamUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("vkvideo.ru")) {
      if (parsed.pathname.includes("app/embed/")) {
        return url;
      } else {
        return `https://live.vkvideo.ru/app/embed${parsed.pathname}`;
      }
    }
    if (parsed.hostname.includes("vkvideo.ru")) {
      const channelName = parsed.pathname.replace(/^\/+/, "");
      return `https://live.vkvideo.ru/app/embed/${channelName}`;
    }

    if (parsed.hostname.includes("twitch.tv")) {
      const channel = parsed.pathname.split("/")[1];
      return `https://player.twitch.tv/?channel=${channel}&parent=localhost`;
    }

    return null;
  } catch {
    return null;
  }
}
