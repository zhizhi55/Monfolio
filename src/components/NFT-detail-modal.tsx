import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CollectionData } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";

// Helper for sample images
function SampleImages({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="flex justify-center gap-4 overflow-x-auto py-2">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={`Sample ${i + 1}`}
          width={140}
          height={140}
          className="rounded-xl border border-purple-700 bg-[#22103a] object-cover shadow-lg"
        />
      ))}
    </div>
  );
}

type NFTDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: CollectionData | null;
};

export default function NFTDetailDialog({
  open,
  onOpenChange,
  nft,
}: NFTDetailDialogProps) {
  if (!nft) return null;
  const { collection } = nft;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-purple-800 bg-gradient-to-br from-[#2a133e] to-[#1a102b] p-0 text-gray-100 shadow-2xl sm:max-w-2xl">
        <div className="p-6">
          {/* Header: Small image beside name */}
          <div className="mb-4 flex items-center gap-4">
            <Image
              src={collection.image || PLACEHOLDER_IMAGE}
              alt={collection.name}
              width={56}
              height={56}
              className="rounded-lg border border-purple-700 object-cover shadow"
            />
            <DialogHeader className="flex-1">
              <DialogTitle className="text-2xl font-bold text-purple-300 drop-shadow">
                {collection.name}
              </DialogTitle>
            </DialogHeader>
          </div>
          {/* Sample Images Gallery */}
          <SampleImages images={collection.sampleImages || []} />
          {/* Description */}
          <div className="mt-2 mb-4 text-center text-base leading-relaxed text-gray-300">
            {collection.description}
          </div>
          {/* Stats */}
          <div className="mb-6 flex flex-wrap justify-center gap-6">
            <div className="rounded-lg bg-[#22103a] px-4 py-2 text-sm text-purple-200 shadow">
              Token Count:{" "}
              <span className="font-semibold text-white">
                {collection.tokenCount}
              </span>
            </div>
            <div className="rounded-lg bg-[#22103a] px-4 py-2 text-sm text-purple-200 shadow">
              Floor Price:{" "}
              <span className="font-semibold text-purple-300">
                {collection.floorAskPrice?.amount?.decimal ?? "-"} MON
              </span>
            </div>
            <div className="rounded-lg bg-[#22103a] px-4 py-2 text-sm text-purple-200 shadow">
              Rank:{" "}
              <span className="font-semibold text-white">
                {collection.rank?.allTime ?? "-"}
              </span>
            </div>
          </div>
          <DialogFooter className="mt-4 sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-purple-800 text-purple-100 hover:bg-purple-700"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
