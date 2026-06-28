import { parseGame, type Game, type RawGame } from '@/types/game';

const CHEAPSHARK_DEALS_URL =
  'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=60';

/**
 * Server-side fetch with ISR. Revalida o cache a cada 5 minutos.
 * Deve ser chamada apenas em Server Components ou Route Handlers.
 */
export async function fetchDealsSSR(): Promise<Game[]> {
  const res = await fetch(CHEAPSHARK_DEALS_URL, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`CheapShark API responded with ${res.status}`);
  }

  const rawGames: RawGame[] = await res.json();
  return rawGames.map(parseGame);
}
