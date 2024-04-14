export function truncateText(text: string, n: number): string {
  return text.length > n ? `${text.slice(0, n)}...` : text;
}
