'use client'

import { GamesProvider } from '@/app/context/GamesContext'
import CarrinhoProvider from '@/app/context/CarrinhoContext'
import { StoresProvider } from '@/app/context/StoresContext'
import type { Game } from '@/types/game'
import type { Store } from '@/types/store'
import Navbar from './Navbar/Navbar'
import Banner from './Banner'
import DataTable from './DataTable'
import FilterSidebar from './FilterSidebar'
import FavoritosPanel from './FavoritosPanel'
import CarrinhoPanel from './CarrinhoPanel'
import { useGameFilters } from '@/hooks/useGameFilters'

interface HomeClientProps {
  initialGames: Game[];
  initialStores: Store[];
}

// Definido fora de HomeClient para preservar identidade estável do componente
function HomeContent() {
  const { filteredGames, handleFilter } = useGameFilters();

  return (
    <main className="w-full min-h-screen font-sora">
      <Navbar />
      <div className="container m-auto flex flex-col md:flex-row gap-4 mt-6">
        <FilterSidebar onFilter={handleFilter} />
        <div className="w-full p-2 md:p-0 md:max-w-full m-auto">
          <Banner />
          <DataTable filteredGames={filteredGames} />
        </div>
      </div>
      <FavoritosPanel />
      <CarrinhoPanel />
    </main>
  );
}

export default function HomeClient({ initialGames, initialStores }: HomeClientProps) {
  return (
    <CarrinhoProvider>
      <StoresProvider initialStores={initialStores}>
        <GamesProvider initialGames={initialGames}>
          <HomeContent />
        </GamesProvider>
      </StoresProvider>
    </CarrinhoProvider>
  );
}
