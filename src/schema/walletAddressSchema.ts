import { z } from "zod";

// Zod schema for a wallet address (Ethereum/Monad style)
export const WalletAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, {
    message: "Invalid EVM Wallet Address.",
  })
  .transform((val) => val.toLowerCase()); // Normalize to lowercase for consistency

// Type derived from the schema
export type WalletAddress = z.infer<typeof WalletAddressSchema>;
