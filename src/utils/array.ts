export const generateArray = (
  nItems: number,
  interval: number = 1,
  start: number = 0
): number[] => {
  const arr = [];
  for (let i = 0; i < nItems; i++) {
    arr.push(start + i * interval);
  }
  return arr;
};
