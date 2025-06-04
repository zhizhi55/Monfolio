export default function formatNumber(num: number): string {
  if (!num) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  if (absNum >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  return num.toFixed(2);
}
