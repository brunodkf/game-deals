import { parseStore, type Store, type RawStore } from '@/types/store';

const CHEAPSHARK_STORES_URL = 'https://www.cheapshark.com/api/1.0/stores';

export async function fetchStoresSSR(): Promise<Store[]> {
  try {
    const res = await fetch(CHEAPSHARK_STORES_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.warn(`[stores] CheapShark responded with ${res.status} — continuing with empty store list`);
      return [];
    }

    const rawStores: RawStore[] = await res.json();
    return rawStores.map(parseStore);
  } catch (error) {
    console.error('[stores] Failed to fetch stores:', error);
    return [];
  }
}
