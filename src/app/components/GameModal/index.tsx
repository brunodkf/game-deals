'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ShoppingCart } from 'lucide-react'
import { Game } from '@/app/context/GamesContext'
import { useCarrinho } from '@/app/context/CarrinhoContext'
import { useStores } from '@/app/context/StoresContext'
import Image from "next/image"
import ButtonFavoritos from "../ButtonFavoritos"

interface GameModalProps {
  game: Game | null
  isOpen: boolean
  onClose: () => void
}

function AddToCartButton({ game }: { game: Game }) {
  const { addItem, openPanel, itens } = useCarrinho()
  const isInCart = itens.some((i) => i.id === game.gameID)

  function handleClick() {
    addItem({
      id: game.gameID,
      name: game.title,
      price: game.salePrice,
      thumb: game.thumb,
      storeID: game.storeID,
      normalPrice: game.normalPrice,
      savings: game.savings,
    })
    openPanel()
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 mt-4 font-medium py-2 px-4 rounded transition cursor-pointer ${
        isInCart
          ? 'bg-purple-900 text-purple-300'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      }`}
    >
      <ShoppingCart size={15} />
      {isInCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
    </button>
  )
}

export const GameModal = ({ game, isOpen, onClose }: GameModalProps) => {
  const { resolveStoreName } = useStores()

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
          <Image
            src={game.thumb}
            alt={game.title}
            width={460}
            height={215}
            sizes="(max-width: 640px) calc(100vw - 4rem), 560px"
            className="w-full h-auto rounded-lg"
          />

          <div>
            <strong className="block text-sm text-branco">Loja:</strong>
            <span>{resolveStoreName(game.storeID)}</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <strong className="block text-sm text-branco">Preço atual:</strong>
              <span className="text-green-400 font-bold">${game.salePrice.toFixed(2)}</span>
            </div>
            <div>
              <strong className="block text-sm text-branco">Preço original:</strong>
              <span className="line-through">${game.normalPrice.toFixed(2)}</span>
            </div>
            <div>
              <strong className="block text-sm text-branco">Desconto:</strong>
              <span className="text-yellow-300 font-semibold">{Math.round(game.savings)}%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://store.steampowered.com/app/${game.steamAppID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-roxo-medio hover:bg-roxo-escuro text-white font-medium py-2 px-4 rounded transition"
            >
              Ver na loja
            </a>

            <ButtonFavoritos game={game} />
            <AddToCartButton game={game} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
