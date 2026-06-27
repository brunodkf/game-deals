import { Suspense } from 'react';
import { fetchDealsSSR } from '@/services/games.service';
import { fetchStoresSSR } from '@/services/stores.service';
import type { Game } from '@/types/game';
import type { Store } from '@/types/store';
import HomeClient from './components/HomeClient';

export default async function Home() {
  let games: Game[] = [];
  let stores: Store[] = [];

  const [gamesResult, storesResult] = await Promise.allSettled([
    fetchDealsSSR(),
    fetchStoresSSR(),
  ]);

  if (gamesResult.status === 'fulfilled') {
    games = gamesResult.value;
  } else {
    console.error('[page] Failed to load games:', gamesResult.reason);
  }

  if (storesResult.status === 'fulfilled') {
    stores = storesResult.value;
  } else {
    console.error('[page] Failed to load stores:', storesResult.reason);
  }

  return (
    <Suspense fallback={null}>
      <HomeClient initialGames={games} initialStores={stores} />
    </Suspense>
  );
}
