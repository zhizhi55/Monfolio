"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Wallet } from "lucide-react";
import { useActionState } from "react";
import findCollection from "@/app/_actions/findCollection";
import WalletAddressForm from "@/components/WalletAddressForm";
import NFTTable from "@/components/NFT-table";
import calculateRarityScore from "@/lib/calculateRarityScore";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";
import TotalMonValue from "@/components/total-mon-value";

export default function NFTDataViewer() {
  const [state, formAction, isPending] = useActionState(findCollection, null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rarity");

  const nftData = useMemo(() => state?.data || [], [state?.data]);
  const hasData = Array.isArray(nftData) && nftData.length > 0;
  const hasError = !!(state?.message && !hasData);

  const processedData = useMemo(() => {
    if (!hasData) return [];

    const filtered = nftData.filter((item) =>
      item.collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rarity":
          return calculateRarityScore(b) - calculateRarityScore(a);
        case "volume":
          return (
            (b.collection.volume?.["1day"] || 0) -
            (a.collection.volume?.["1day"] || 0)
          );
        case "floor":
          return (
            (b.collection.floorAskPrice?.amount?.decimal || 0) -
            (a.collection.floorAskPrice?.amount?.decimal || 0)
          );
        case "rank":
          return (
            (a.collection.rank?.["allTime"] || 999) -
            (b.collection.rank?.["allTime"] || 999)
          );
        default:
          return 0;
      }
    });
  }, [nftData, searchTerm, sortBy, hasData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-12 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            NFT Portfolio Dashboard
          </h1>
          <p className="text-gray-400">
            Track your NFT collections with advanced rarity scoring and
            analytics
          </p>
        </div>

        {/* Wallet Address Form */}
        <WalletAddressForm
          state={state}
          formAction={formAction}
          isPending={isPending}
          hasError={hasError}
        />

        {/* Loading State */}
        {isPending && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Loading..."
                width={64}
                height={64}
                className="animate-spin-3d transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/10 to-transparent" />
            </div>
            <p className="text-xl text-gray-400">Fetching NFT collections...</p>
          </div>
        )}

        {/* Results */}
        {hasData && state?.success ? (
          <div className="space-y-4">
            <TotalMonValue
              collections={processedData}
              walletAddress={state?.walletAddress}
            />
            <div className="mb-4 flex gap-4">
              <Input
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
              />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-gray-600 bg-gray-700 text-gray-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                  <SelectItem value="rarity">Rarity Score</SelectItem>
                  <SelectItem value="volume">24h Volume</SelectItem>
                  <SelectItem value="floor">Floor Price</SelectItem>
                  <SelectItem value="rank">Rank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <NFTTable processedData={processedData} />
          </div>
        ) : (
          state?.success &&
          !hasData && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-lg border border-gray-700 p-8 text-center text-gray-400">
                <Search className="mx-auto mb-4 h-8 w-8 opacity-50" />
                <span className="text-lg font-medium">No NFT found...</span>
              </div>
            </div>
          )
        )}

        {/* Empty State */}
        {!hasData && !isPending && !hasError && (
          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400">
                <Wallet className="mx-auto mb-4 h-16 w-16 opacity-50" />
                <h3 className="mb-2 text-xl font-semibold text-gray-100">
                  Ready to explore your NFT portfolio?
                </h3>
                <p className="mb-4">
                  Enter your wallet address above to view your NFT collections
                  with rarity scoring
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Rarity Analysis
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Portfolio Tracking
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Market Data
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Collection Insights
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
