// TO DO: Remove the whole file when real db is created
export function generateUniqueId(): number {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
