export function ConvertBalance(count: number): string {
  return new Intl.NumberFormat('ukr-UA', {
    style: 'currency',
    currency: 'UAH',
  }).format(count / 100);
}

export function ConvertTransactionSuma(suma: number): string {
  return `${suma > 0 ? '+' : ''}${new Intl.NumberFormat('ukr-UA', {
    style: 'currency',
    currency: 'UAH',
  }).format(suma / 100)}`;
}
