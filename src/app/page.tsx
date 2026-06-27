import { Suspense } from 'react';
import { fetchDealsSSR } from '@/services/games.service';
import { fetchStoresSSR } from '@/services/stores.service';
import type { Game } from '@/types/game';
import type { Store } from '@/types/store';
import HomeClient from './components/HomeClient';

export default async function Home() {
  let games: Game[] = [];
  let stores: Store[] = [];

  try {
    [games, stores] = await Promise.all([
      fetchDealsSSR(),
      fetchStoresSSR(),
    ]);
  } catch (error) {
    console.error('[page] Failed to load data:', error);
  }

  return (
    <Suspense fallback={null}>
      <HomeClient initialGames={games} initialStores={stores} />
    </Suspense>
  );
}
