import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  WalletAddress,
  WalletAddressSchema,
} from "@/schema/walletAddressSchema";
import { CollectionData } from "@/types";

const fetchCollections = async (
  walletAddress: string | undefined,
): Promise<CollectionData[]> => {
  return await axios.get(
    `https://api-mainnet.magiceden.dev/v3/rtp/monad-testnet/users/${walletAddress}/collections/v3?includeTopBid=false&includeLiquidCount=false&offset=0&limit=100`,
  );
};

export default function useGetNFTeas(walletAddress: WalletAddress | null) {
  const parsed = WalletAddressSchema.safeParse(walletAddress);
  const isValidWalletAddress = parsed.success;

  return useQuery({
    queryKey: ["nfts", { walletAddress }],
    queryFn: () => fetchCollections(parsed.data),
    enabled: isValidWalletAddress, // Only run if address is valid
    retry: 1, // Retry once on failure
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  });
}
