import { Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CollectionData } from "@/types";

export default function TotalMonValue({
  collections,
  walletAddress,
}: {
  collections: CollectionData[];
  walletAddress?: string;
}) {
  const total = collections.reduce((sum, item) => {
    return sum + (item.collection.floorAskPrice?.amount?.decimal || 0);
  }, 0);
  return (
    <Card className="mb-6 border-purple-700 bg-gradient-to-r from-purple-900/80 to-blue-900/80 shadow-lg">
      <CardContent className="flex items-center gap-6 py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700/30">
          <Coins className="h-8 w-8 text-purple-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">
            {total.toLocaleString()}{" "}
            <span className="text-purple-400">MON</span>
          </div>
          <div className="text-sm text-gray-300">Total Floor Value</div>
          {walletAddress && (
            <div className="mt-2 w-full font-mono text-xs break-all text-gray-400 sm:max-w-xs md:max-w-full">
              Wallet: {walletAddress}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
