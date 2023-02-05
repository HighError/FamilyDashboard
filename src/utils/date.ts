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

export function GetForamtedData(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return `${date.toLocaleDateString('ukr-UA', options)}`;
}

export function GetDataForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}
