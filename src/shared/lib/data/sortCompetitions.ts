import {Competition} from "@/entities/competition";

export function sortCompetitions(competitions: Competition[]) {
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
