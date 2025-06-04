"use server";

import { WalletAddressSchema } from "@/schema/walletAddressSchema";
import { CollectionData } from "@/types";

interface ActionResponse {
  message: string;
  success?: boolean;
  data?: CollectionData[];
  walletAddress?: string;
}

export default async function findCollection(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const walletAddress = formData.get("walletAddress");

  if (!walletAddress || walletAddress === "") {
    return {
      message: "Please enter a wallet address",
      success: false,
    };
  }

  try {
    const parsed = WalletAddressSchema.safeParse(walletAddress);
    if (!parsed.success) {
      return { message: parsed.error.errors[0].message, success: false };
    }

    const res = await fetch(
      `https://api-mainnet.magiceden.dev/v3/rtp/monad-testnet/users/${parsed.data}/collections/v3?includeTopBid=false&includeLiquidCount=false&offset=0&limit=100`,
    );

    if (!res.ok) {
      throw new Error("Error fetching Magic Eden API");
    }

    const responseData = await res.json();

    if (!responseData || !responseData.collections) {
      return { message: "No collections found for this wallet address" };
    }

    const data: CollectionData[] = responseData.collections || [];

    return {
      message: "Successfully fetched!",
      success: true,
      data,
      walletAddress: parsed.data, // Return the parsed wallet address
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(errorMessage);
    return { message: errorMessage, success: false };
  }
}
