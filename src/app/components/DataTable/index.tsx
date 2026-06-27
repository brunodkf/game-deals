'use client';

import { useEffect, useState } from 'react';
import { Game, useGames } from '@/app/context/GamesContext';
import { columns } from './columns';
import { DataTable } from './data-table';
import GameCard from '../GameCard';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

interface GamesTableProps {
  filteredGames: Game[]
}

const GamesTable = ({ filteredGames }: GamesTableProps) => {
  const { games, isLoading } = useGames();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [page, setPage] = useState(1);

  const dataToDisplay = filteredGames?.length ? filteredGames : games;

  useEffect(() => {
    setPage(1);
  }, [filteredGames]);

  const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
  const paginatedData = dataToDisplay.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const isTableView = viewMode === 'table';
  const hasGames = dataToDisplay.length > 0;

  return (
    <div className="text-branco lg:w-full xl:p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold font-orbitron">Os melhores jogos aqui:</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            aria-label="Ver em tabela"
            className={`p-2 rounded cursor-pointer ${
              isTableView ? 'bg-purple-600' : 'bg-cinza-suave'
            }`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('card')}
            aria-label="Ver em cards"
            className={`p-2 rounded cursor-pointer ${
              !isTableView ? 'bg-purple-600' : 'bg-cinza-suave'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Carregando jogos...</p>
      ) : hasGames ? (
        <>
          {isTableView ? (
            <DataTable columns={columns} data={paginatedData} />
          ) : (
            <GameCard games={paginatedData} />
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Página anterior"
                className="p-2 rounded bg-cinza-suave disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Próxima página"
                className="p-2 rounded bg-cinza-suave disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Nenhum jogo encontrado com os filtros aplicados.</p>
      )}
    </div>
  );
};

export default GamesTable;
