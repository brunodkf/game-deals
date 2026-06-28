import { parseGame, type Game, type RawGame } from '@/types/game';
import type { ApiFilters } from '@/types/filter';

const CHEAPSHARK_DEALS_URL = 'https://www.cheapshark.com/api/1.0/deals';

export async function fetchDealsClient(filters: ApiFilters, signal?: AbortSignal): Promise<Game[]> {
  const url = new URL(CHEAPSHARK_DEALS_URL);
  url.searchParams.set('pageSize', '60');

  if (filters.storeID) url.searchParams.set('storeID', filters.storeID);
  if (filters.lowerPrice) url.searchParams.set('lowerPrice', filters.lowerPrice);
  if (filters.upperPrice) url.searchParams.set('upperPrice', filters.upperPrice);

  const res = await fetch(url.toString(), { signal });

  if (!res.ok) {
    throw new Error(`Falha ao buscar ofertas: ${res.status}`);
  }

  const rawGames: unknown = await res.json();

  if (!Array.isArray(rawGames)) {
    throw new Error('Formato de resposta inesperado');
  }

  return (rawGames as RawGame[]).map(parseGame);
}
