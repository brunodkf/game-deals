import { parseStore, type Store, type RawStore } from '@/types/store';

const CHEAPSHARK_STORES_URL = 'https://www.cheapshark.com/api/1.0/stores';

export async function fetchStoresSSR(): Promise<Store[]> {
  const res = await fetch(CHEAPSHARK_STORES_URL, {
    next: { revalidate: 3600 }, // stores change very infrequently — cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`CheapShark stores API responded with ${res.status}`);
  }

  const rawStores: RawStore[] = await res.json();
  return rawStores.map(parseStore);
}
