import { CollectionData } from "@/types";

// Rarity Score Calculation
export default function calculateRarityScore(
  collection: CollectionData,
): number {
  const { rank, volume, floorAskPrice, tokenCount } = collection.collection;

  // Safe access with fallbacks
  const rankScore = rank?.allTime ? Math.max(0, 100 - rank.allTime) : 0;
  const volumeScore = volume?.allTime
    ? Math.min(50, Math.log10(volume.allTime) * 10)
    : 0;
  const scarcityScore = tokenCount
    ? Math.max(0, 50 - Math.log10(Number.parseInt(tokenCount)) * 10)
    : 0;
  const priceScore = floorAskPrice?.amount?.decimal
    ? Math.min(30, Math.log10(floorAskPrice.amount.decimal + 1) * 15)
    : 0;

  return Math.round(rankScore + volumeScore + scarcityScore + priceScore);
}
