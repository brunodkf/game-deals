'use client';

import { useEffect, useState } from 'react';
import { type Game, useGames } from '@/app/context/GamesContext';
import { columns } from './columns';
import { DataTable } from './data-table';
import GameCard from '../GameCard';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

interface GamesTableProps {
  filteredGames: Game[]
}

const GamesTable = ({ filteredGames }: GamesTableProps) => {
  const { isLoading, error } = useGames();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filteredGames]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedData = filteredGames.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const isTableView = viewMode === 'table';

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
        <p className="text-zinc-400 text-sm py-8 text-center">Carregando jogos...</p>
      ) : error ? (
        <p className="text-red-400 text-sm py-8 text-center">Erro ao carregar jogos: {error}</p>
      ) : filteredGames.length > 0 ? (
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
        <p className="text-zinc-400 text-sm py-8 text-center">
          Nenhum jogo encontrado com os filtros aplicados.
        </p>
      )}
    </div>
  );
};

export default GamesTable;
