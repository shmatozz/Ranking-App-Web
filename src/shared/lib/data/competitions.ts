import {Competition} from "@/entities/competition";

export function splitCompetitions(competitions: Competition[]) {
  const upcoming: Competition[] = [];
  const passed: Competition[] = [];

  const currentDate = new Date();

  competitions.forEach(competition => {
    const competitionDate = new Date(competition.date);
    if (competitionDate >= currentDate) {
      upcoming.push(competition);
    } else {
      passed.push(competition);
    }
  });

  return { upcoming: upcoming, passed: passed };
}

export type ArrangeOption = "date-closer" | "date-farther" | "participants-more" | "participants-less" | "name";

export function sortCompetitions(
  competitions: Competition[],
  arrange: ArrangeOption
): Competition[] {
  switch (arrange) {
    case 'date-closer': {
      // Сортировка по дате (от ближайшей к дальней)
      return competitions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    case 'date-farther': {
      // Сортировка по дате (от дальней к ближайшей)
      return competitions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    case 'name': {
      // Сортировка по имени
      return competitions.sort((a, b) => a.name.localeCompare(b.name));
    }
    default: {
      // Если тип сортировки не поддерживается, возвращаем без изменений
      return competitions;
    }
  }
}
