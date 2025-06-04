type Currency = {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
};

type Amount = {
  raw: string;
  decimal: number;
  usd: null | number;
  native: number;
};

type FloorAskPrice = {
  currency: Currency;
  amount: Amount;
};

type Rank = {
  "1day": null | number;
  "7day": null | number;
  "30day": number | null;
  allTime: number;
};

type Volume = {
  "1day": number;
  "7day": number;
  "30day": number;
  allTime: number;
};

type VolumeChange = {
  "1day": number;
  "7day": number;
  "30day": number;
};

type FloorSale = {
  "1day": null | number;
  "7day": number;
  "30day": number;
};

type Collection = {
  id: string;
  slug: string | null;
  name: string;
  image: string;
  isSpam: boolean;
  banner: string | null;
  twitterUrl: string | null;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  openseaVerificationStatus: string | null;
  description: string;
  metadataDisabled: boolean;
  sampleImages: string[];
  tokenCount: string;
  primaryContract: string;
  tokenSetId: string;
  floorAskPrice: FloorAskPrice;
  rank: Rank;
  volume: Volume;
  volumeChange: VolumeChange;
  floorSale: FloorSale;
  contractKind: string;
};

type Ownership = {
  tokenCount: string;
  onSaleCount: string;
};

export type CollectionData = {
  collection: Collection;
  ownership: Ownership;
};
