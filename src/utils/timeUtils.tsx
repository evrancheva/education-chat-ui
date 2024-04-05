export function getCurrentTime(): string {
  const now = new Date();

  return now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}
