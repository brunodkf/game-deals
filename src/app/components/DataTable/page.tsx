'use client'
import { Game, useGames } from '@/app/context/GamesContext'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useState } from 'react'
import FilterControls from '../FilterControls/page'

import { IoGrid } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import GameCard from '../GameCard/page'

interface GamesTableProps {
  filteredGames?: Game[]
}

const GamesTable = ({ filteredGames }: GamesTableProps) => {

  const { games, isLoading } = useGames()

  const [viewMode, setViewMode] = useState('table')

  const dataToDisplay = filteredGames && filteredGames.length > 0 ? filteredGames : games

  return (
    <div className="text-branco lg:w-full xl:p-4">
 
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold font-orbitron">Os melhores jogos aqui:</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded cursor-pointer ${viewMode === 'table' ? 'bg-purple-600' : 'bg-cinza-suave'}`}
          >
            <IoList />
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded cursor-pointer ${viewMode === 'card' ? 'bg-purple-600' : 'bg-cinza-suave'}`}
          >
            <IoGrid />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Carregando jogos...</p>

      ) : dataToDisplay.length > 0 ? (

        viewMode === 'table' ? (

          <DataTable columns={columns} data={dataToDisplay} />
        ) : (

          <GameCard games={dataToDisplay} />
        )

      ) : (
        <p>Nenhum jogo encontrado com os filtros aplicados.</p>
      )}
    </div>
  )
}

export default GamesTable
