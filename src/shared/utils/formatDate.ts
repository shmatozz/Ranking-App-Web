export function formatDate(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined

  const date = new Date(dateStr);
  let month: string;

  switch (date.getMonth()) {
    case 0: month = "января"; break;
    case 1: month = "февраля"; break;
    case 2: month = "марта"; break;
    case 3: month = "апреля"; break;
    case 4: month = "мая"; break;
    case 5: month = "июня"; break;
    case 6: month = "июля"; break;
    case 7: month = "августа"; break;
    case 8: month = "сентября"; break;
    case 9: month = "октября"; break;
    case 10: month = "ноября"; break;
    default: month = "Декабрь"
  }

  return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export function getTime(date: Date): string | undefined {
  const dateHours = date.getUTCHours();
  const dateMinutes = date.getUTCMinutes();

  return `${dateHours}:${dateMinutes < 10 ? "0" + dateMinutes : dateMinutes}`;
}

