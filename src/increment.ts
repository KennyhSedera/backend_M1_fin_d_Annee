export function incrementCode(previousCode: string): string {
  const numberPart = previousCode.match(/\d+/)?.[0];

  if (!numberPart) {
    throw new Error('Aucune partie numérique trouvée dans le code.');
  }

  const incrementedNumber = parseInt(numberPart, 10) + 1;

  const formattedNumber = incrementedNumber
    .toString()
    .padStart(numberPart.length, '0');

  return previousCode.replace(numberPart, formattedNumber);
}

export function arrondissement(number: number): string {
  const num = number.toFixed(2);
  return num;
}
