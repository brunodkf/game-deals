export interface Store {
  storeID: number;
  storeName: string;
  isActive: boolean;
}

export interface RawStore {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

export function parseStore(raw: RawStore): Store {
  return {
    storeID: parseInt(raw.storeID, 10),
    storeName: raw.storeName,
    isActive: raw.isActive === 1,
  };
}
