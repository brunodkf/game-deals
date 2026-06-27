export interface Game {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: number;
  gameID: number;
  salePrice: number;
  normalPrice: number;
  isOnSale: boolean;
  savings: number;
  metacriticScore: number;
  steamRatingText: string;
  steamRatingPercent: number;
  steamRatingCount: number;
  steamAppID: number;
  releaseDate: number;
  lastChange: number;
  dealRating: number;
  thumb: string;
}

export interface RawGame {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number | string;
  lastChange: number | string;
  dealRating: string;
  thumb: string;
}

export function parseGame(raw: RawGame): Game {
  return {
    ...raw,
    storeID: Number(raw.storeID),
    gameID: Number(raw.gameID),
    salePrice: parseFloat(raw.salePrice),
    normalPrice: parseFloat(raw.normalPrice),
    isOnSale: raw.isOnSale === "1",
    savings: parseFloat(raw.savings),
    metacriticScore: parseInt(raw.metacriticScore),
    steamRatingPercent: parseInt(raw.steamRatingPercent),
    steamRatingCount: parseInt(raw.steamRatingCount),
    steamAppID: parseInt(raw.steamAppID),
    releaseDate: Number(raw.releaseDate),
    lastChange: Number(raw.lastChange),
    dealRating: parseFloat(raw.dealRating),
  };
}
