import { parseGame, type Game, type RawGame } from '@/types/game';
import type { ApiFilters } from '@/types/filter';

export async function fetchDealsClient(filters: ApiFilters): Promise<Game[]> {
  const params = new URLSearchParams();
  if (filters.storeID) params.set('storeID', filters.storeID);
  if (filters.lowerPrice) params.set('lowerPrice', filters.lowerPrice);
  if (filters.upperPrice) params.set('upperPrice', filters.upperPrice);

  const qs = params.toString();
  const url = `/api/games${qs ? `?${qs}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch deals: ${res.status}`);

  const rawGames: RawGame[] = await res.json();
  return rawGames.map(parseGame);
}
