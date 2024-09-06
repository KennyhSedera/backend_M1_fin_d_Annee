export const NewCodeEns = (previewCode: string) => {
  const numPart = previewCode.match(/\d+/)?.[0];
  let incNum = parseInt(numPart, 10) + 1;
  const formatNum = incNum.toString().padStart(numPart.length, '0');
  return previewCode.replace(numPart, formatNum);
};
