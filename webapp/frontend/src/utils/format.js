const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatReadMinutes(minutes) {
  const n = minutes || 1;
  const mod10 = n % 10;
  const mod100 = n % 100;
  let word = "минут";
  if (mod100 < 11 || mod100 > 14) {
    if (mod10 === 1) word = "минута";
    else if (mod10 >= 2 && mod10 <= 4) word = "минуты";
  }
  return `${n} ${word}`;
}
