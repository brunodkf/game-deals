export interface FilterValues {
  store: string;
  lowerPrice: string;
  upperPrice: string;
  minDiscount: string;
  sortBy: string;
}

export interface ApiFilters {
  storeID?: string;
  lowerPrice?: string;
  upperPrice?: string;
}
