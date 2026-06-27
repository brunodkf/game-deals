'use client'
import type { Game } from '@/app/context/GamesContext'
import Image from 'next/image'
import { GameModal } from '../GameModal'
import { useGameModal } from '@/hooks/useGameModal'

interface GameCardProps {
  games: Game[]
}

const GameCard = ({ games }: GameCardProps) => {
  const { selectedGame, isOpen, open, close } = useGameModal();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">

      {games.map((game) => (
        <div
          key={game.dealID}
          onClick={() => open(game)}
          className="bg-cinza-suave p-4 rounded-xl shadow-lg text-white flex flex-col cursor-pointer hover:scale-105 hover:bg-neutral-950 transition-all"
        >
          <Image
            src={game.thumb}
            alt={game.title}
            width={460}
            height={215}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
            className="rounded w-full h-auto"
            loading="lazy"
          />

          <h3 className="text-sm font-semibold mt-3 text-balance">{game.title}</h3>

          <div className='flex justify-between'>
            <div>
              <p className="text-green-500 text-xl font-bold tracking-wider mt-2">${game.salePrice}</p>
              <p className="text-gray-400 text-sm line-through">${game.normalPrice.toFixed(2)}</p>
            </div>
            <p className="text-yellow-300 mt-2 text-[12px] h-fit p-1">-{Math.round(game.savings)}%</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-branco text-[12px] p-1">⭐ {game.dealRating.toFixed(1)}</p>
            <button className='text-[12px] bg-purple-600 p-2 rounded font-semibold cursor-pointer'>Saiba mais</button>
          </div>
        </div>
      ))}

      <GameModal game={selectedGame} isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default GameCard
