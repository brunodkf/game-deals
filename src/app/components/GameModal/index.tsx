'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Game } from '@/app/context/GamesContext'

interface GameModalProps {
  game: Game | null
  isOpen: boolean
  onClose: () => void
}

export const GameModal = ({ game, isOpen, onClose }: GameModalProps) => {
  if (!game) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-purple-400">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-orbitron tracking-wider">
            {game.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <img
            src={game.thumb}
            alt={game.title}
            className="w-full h-auto rounded-lg object-cover"
          />

          <div>
            <strong className="block text-sm text-branco">Loja:</strong>
            {game.storeID}
          </div>

          <div className="flex items-center gap-2">
            <div>
              <strong className="block text-sm text-branco">Preço atual:</strong>
              <span className="text-green-400 font-bold">${game.salePrice}</span>
            </div>
            <div>
              <strong className="block text-sm text-branco">Preço original:</strong>
              <span className="line-through">${game.normalPrice}</span>
            </div>
          </div>

          <div>
            <strong className="block text-sm text-branco">Desconto:</strong>
            <span>{Math.round(game.savings)}%</span>
          </div>

          <div>
            <strong className="block text-sm text-branco">Menor preço histórico:</strong>
            <span>${game.normalPrice ?? "N/A"}</span>
          </div>

          <a
            href={`https://store.steampowered.com/app/${game.steamAppID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-roxo-medio hover:bg-roxo-escuro text-white font-medium py-2 px-4 rounded transition"
          >
            Ver na loja
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
