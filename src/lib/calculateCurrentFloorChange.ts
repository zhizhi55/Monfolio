export default function calculateFloorChange(
  current: number,
  previous: number,
): number {
  if (!current || !previous) return 0;
  return ((current - previous) / previous) * 100;
}
