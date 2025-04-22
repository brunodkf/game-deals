// components/CardView.tsx
import { Game } from '@/app/context/GamesContext'
import Image from 'next/image'

interface CardViewProps {
  games: Game[]
}

const CardView = ({ games }: CardViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <div key={game.dealID} className="bg-gray-800 p-4 rounded-xl shadow-lg text-white flex flex-col items-center">
          <Image src={game.thumb} alt={game.title} width={150} height={150} className="rounded" />
          <h3 className="text-md font-semibold mt-2">{game.title}</h3>
          <p className="text-purple-400 text-sm">R${game.salePrice}</p>
          <p className="text-gray-400 text-sm line-through">R${game.normalPrice}</p>
          <p className="text-green-500 text-sm">-{Math.round(game.savings)}%</p>
        </div>
      ))}
    </div>
  )
}

export default CardView
