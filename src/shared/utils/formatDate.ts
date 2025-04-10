export function formatDate(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return undefined;
  }
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
    default: month = "декабря"
  }

  return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export function getTime(date: Date): string | undefined {
  const dateHours = date.getUTCHours();
  const dateMinutes = date.getUTCMinutes();

  return `${dateHours}:${dateMinutes < 10 ? "0" + dateMinutes : dateMinutes}`;
}


export function getAge(birthDate: Date | string): string {
  const date = new Date(birthDate);
  const today = new Date();

  if (isNaN(date.getTime())) {
    return '-';
  }

  let years = today.getFullYear() - date.getFullYear();

  const currentMonth = today.getMonth();
  const birthMonth = date.getMonth();
  const currentDay = today.getDate();
  const birthDay = date.getDate();

  if (currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)) {
    years--;
  }

  let ageSuffix: string;
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    ageSuffix = 'лет';
  } else {
    switch (lastDigit) {
      case 1:
        ageSuffix = 'год';
        break;
      case 2:
      case 3:
      case 4:
        ageSuffix = 'года';
        break;
      default:
        ageSuffix = 'лет';
    }
  }

  return `${years} ${ageSuffix}`;
}
