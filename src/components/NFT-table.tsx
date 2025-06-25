import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import PriceChange from "@/components/price-change";
import formatNumber from "@/lib/formatNumber";
import calculateRarityScore from "@/lib/calculateRarityScore";
import calculateFloorChange from "@/lib/calculateCurrentFloorChange";
import { CollectionData } from "@/types";
import NFTDetailDialog from "@/components/NFTDetailDialog";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";

type NFTTableProps = {
  processedData: CollectionData[];
};

export default function NFTTable({ processedData }: NFTTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CollectionData | null>(null);

  const handleRowClick = (item: CollectionData) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <>
      <Table className="border-gray-700 bg-gray-800">
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-700/50">
            <TableHead className="w-12 p-4 text-gray-300">#</TableHead>
            <TableHead className="p-4 text-gray-300">Collection</TableHead>
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
              className="cursor-pointer border-gray-700 hover:bg-gray-700/50"
              onClick={() => handleRowClick(item)}
            >
              <TableCell className="p-4 text-gray-300">{index + 1}</TableCell>
              <TableCell className="p-4">
                <div className="flex items-center gap-2">
                  <Image
                    height={100}
                    width={100}
                    src={item.collection.image || PLACEHOLDER_IMAGE}
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
                {formatNumber(item.collection.floorAskPrice?.amount?.decimal) ||
                  "-"}{" "}
                MON
              </TableCell>
              <TableCell className="p-4 text-right">
                <PriceChange
                  value={calculateFloorChange(
                    item.collection.floorAskPrice?.amount?.decimal ?? 0,
                    item.collection.floorSale?.["1day"] ?? 0,
                  )}
                />
              </TableCell>
              <TableCell className="p-4 text-right text-gray-300">
                {formatNumber(item.collection.volume?.["1day"] ?? 0)} MON
              </TableCell>
              <TableCell className="p-4 text-right text-gray-300">
                {formatNumber(item.collection.volume?.allTime ?? 0)} MON
              </TableCell>
              <TableCell className="p-4 text-right font-medium text-gray-300">
                {item ? calculateRarityScore(item).toFixed(0) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NFTDetailDialog open={open} onOpenChange={setOpen} nft={selected} />
    </>
  );
}
