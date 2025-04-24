'use client';

import { useState } from 'react';
import { Game, useGames } from '@/app/context/GamesContext';
import { columns } from './columns';
import { DataTable } from './data-table';
import GameCard from '../GameCard';

import { IoGrid, IoList } from 'react-icons/io5';

interface GamesTableProps {
  filteredGames: Game[]
}

const GamesTable = ({ filteredGames }: GamesTableProps) => {
  const { games, isLoading } = useGames();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (game: Game) => {
    setSelectedGame(game)
    setIsOpen(true)
  }

  const handleClose = () => {
    setSelectedGame(null)
    setIsOpen(false)
  }

  const dataToDisplay = filteredGames?.length ? filteredGames : games;

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
            <IoList />
          </button>
          <button
            onClick={() => setViewMode('card')}
            aria-label="Ver em cards"
            className={`p-2 rounded cursor-pointer ${
              !isTableView ? 'bg-purple-600' : 'bg-cinza-suave'
            }`}
          >
            <IoGrid />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Carregando jogos...</p>
      ) : hasGames ? (
        isTableView ? (
          <DataTable columns={columns} data={dataToDisplay} />
        ) : (
          <GameCard games={dataToDisplay} />
        )
      ) : (
        <p>Nenhum jogo encontrado com os filtros aplicados.</p>
      )}
    </div>
  );
};

export default GamesTable;
