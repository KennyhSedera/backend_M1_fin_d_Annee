export function incrementCode(previousCode: string): string {
  const numberPart = previousCode.match(/\d+/)?.[0];

  if (!numberPart) {
    throw new Error("Aucune partie numérique trouvée dans le code.");
  }

  let incrementedNumber = parseInt(numberPart, 10) + 1;

  const formattedNumber = incrementedNumber.toString().padStart(numberPart.length, '0');

  return previousCode.replace(numberPart, formattedNumber);
}