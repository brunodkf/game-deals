import { parseGame, type Game, type RawGame } from '@/types/game';
import type { ApiFilters } from '@/types/filter';

export async function fetchDealsClient(filters: ApiFilters, signal?: AbortSignal): Promise<Game[]> {
  const params = new URLSearchParams();
  if (filters.storeID) params.set('storeID', filters.storeID);
  if (filters.lowerPrice) params.set('lowerPrice', filters.lowerPrice);
  if (filters.upperPrice) params.set('upperPrice', filters.upperPrice);

  const qs = params.toString();
  const url = `/api/games${qs ? `?${qs}` : ''}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    let message = `Falha ao buscar ofertas: ${res.status}`;
    try {
      const body = await res.json() as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // ignore — use default message
    }
    throw new Error(message);
  }

  const rawGames: unknown = await res.json();

  if (!Array.isArray(rawGames)) {
    throw new Error('Formato de resposta inesperado');
  }

  return (rawGames as RawGame[]).map(parseGame);
}
