import { TrendingDown, TrendingUp } from "lucide-react";

export default function PriceChange({ value }: { value: number }) {
  if (!value) return <span>-</span>;

  const isPositive = value > 0;
  return (
    <div
      className={`flex items-center justify-end gap-1 ${
        isPositive ? "text-green-500" : "text-red-500"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      {Math.abs(value).toFixed(2)}%
    </div>
  );
}
