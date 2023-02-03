export function GetForamtedDataAndTime(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return `${date.toLocaleDateString(
    'ukr-UA',
    options
  )} ${date.toLocaleTimeString('ukr-UA')}`;
}
