"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { useActionState } from "react";
import findCollection from "@/app/_actions/findCollection";
import calculateRarityScore from "@/lib/calculateRarityScore";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import formatNumber from "@/lib/formatNumber";
import calculateFloorChange from "@/lib/calculateCurrentFloorChange";
import PriceChange from "@/components/price-change";

const placeholder =
  "https://cdn.prod.website-files.com/667c57e6f9254a4b6d914440/667d7104644c621965495f6e_LogoMark.svg";

export default function NFTDataViewer() {
  const [state, formAction, isPending] = useActionState(findCollection, null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rarity");

  const nftData = state?.data || [];
  const hasData = Array.isArray(nftData) && nftData.length > 0;
  const hasError = state?.message && !hasData;

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
        <Card className="mb-8 border-gray-700 bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-100">
                <Wallet className="h-5 w-5" />
                Enter Wallet Address
              </CardTitle>
              <div className="flex items-center gap-2">
                <Link
                  href="https://x.com/SawadaTataro88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-purple-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <span className="text-sm text-gray-400">Follow me hehe</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="walletAddress" className="text-gray-300">
                  Wallet Address
                </Label>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="0x..."
                  disabled={isPending}
                  className="border-gray-600 bg-gray-700 font-mono text-gray-100 placeholder-gray-400"
                />
              </div>
              <Button
                disabled={isPending}
                className="mb-1 w-full cursor-pointer bg-purple-600 text-white hover:bg-purple-700 disabled:cursor-not-allowed md:w-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Collections...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Fetch NFT Collections
                  </>
                )}
              </Button>
            </form>

            {/* Error Message */}
            {hasError && !state.success && (
              <Alert
                className="mt-4 border-red-700 bg-red-900/50 text-red-200"
                variant="destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-semibold">
                  {state.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {state?.walletAddress && (
          <div className="my-4 text-center text-xs text-slate-300">
            Wallet: {state.walletAddress} NFTeas!
          </div>
        )}

        {/* Loading State */}
        {isPending && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative">
              <Image
                src={placeholder}
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

            <Table className="border-gray-700 bg-gray-800">
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="w-12 p-4 text-gray-300">#</TableHead>
                  <TableHead className="p-4 text-gray-300">
                    Collection
                  </TableHead>
                  <TableHead className="p-4 text-right text-gray-300">
                    Floor
                  </TableHead>
                  <TableHead className="p-4 text-right text-gray-300">
                    Floor 1d %
                  </TableHead>
                  <TableHead className="p-4 text-right text-gray-300">
                    24h Volume
                  </TableHead>
                  <TableHead className="p-4 text-right text-gray-300">
                    All Time Volume
                  </TableHead>
                  <TableHead className="p-4 text-right text-gray-300">
                    Rarity Score
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((item, index) => (
                  <TableRow
                    key={item.collection.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell className="p-4 text-gray-300">
                      {index + 1}
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <Image
                          height={100}
                          width={100}
                          src={item.collection.image || placeholder}
                          alt={item.collection.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-100">
                            {item.collection.name}
                          </div>
                          <Badge
                            variant="outline"
                            className="border-gray-600 text-gray-300 uppercase"
                          >
                            {item.collection.contractKind}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-right text-gray-300">
                      {formatNumber(
                        item.collection.floorAskPrice?.amount?.decimal,
                      ) || "-"}{" "}
                      MON
                    </TableCell>
                    <TableCell className="p-4 text-right">
                      <PriceChange
                        value={calculateFloorChange(
                          item.collection.floorAskPrice?.amount?.decimal || 0,
                          item.collection.floorSale?.["1day"] || 0,
                        )}
                      />
                    </TableCell>
                    <TableCell className="p-4 text-right text-gray-300">
                      {formatNumber(item.collection.volume?.["1day"] || 0)} MON
                    </TableCell>
                    <TableCell className="p-4 text-right text-gray-300">
                      {formatNumber(item.collection.volume?.allTime || 0)} MON
                    </TableCell>
                    <TableCell className="p-4 text-right font-medium text-gray-300">
                      {calculateRarityScore(item).toFixed(0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
