'use client'

import { Heart } from 'lucide-react'
import { useFavoritos } from '@/app/context/FavoritosContext'
import { useGames } from '@/app/context/GamesContext'
import { useStores } from '@/app/context/StoresContext'
import { useGameModal } from '@/hooks/useGameModal'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { GameModal } from '../GameModal'
import SidePanelItem from '../SidePanelItem'

export default function FavoritosPanel() {
  const { favoritos, removerFavorito, isPanelOpen, closePanel } = useFavoritos()
  const { games } = useGames()
  const { resolveStoreName } = useStores()
  const { selectedGame, isOpen: isModalOpen, open: openModal, close: closeModal } = useGameModal()

  return (
    <>
      <Sheet open={isPanelOpen} onOpenChange={(open) => !open && closePanel()}>
        <SheetContent aria-label="Painel de favoritos">
          <SheetHeader>
            <SheetTitle className="font-orbitron text-white flex items-center gap-2">
              <Heart size={16} className="text-pink-400 flex-shrink-0" />
              Lista de Favoritos
              {favoritos.length > 0 && (
                <span className="ml-auto text-xs font-normal text-zinc-400">
                  {favoritos.length} {favoritos.length === 1 ? 'jogo' : 'jogos'}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>
              Jogos que você salvou para não perder a oferta
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {favoritos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-8 py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-5">
                  <Heart size={38} className="text-zinc-600" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-300">
                  Nenhum favorito ainda
                </h3>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-[220px]">
                  Abra um jogo e clique em{' '}
                  <span className="text-pink-400 font-medium">+ Lista de Favoritos</span>{' '}
                  para salvar as ofertas que mais gosta.
                </p>
              </div>
            ) : (
              favoritos.map((fav) => {
                const liveGame = games.find((g) => g.gameID === fav.id)
                return (
                  <SidePanelItem
                    key={fav.id}
                    thumb={fav.thumb}
                    title={fav.name}
                    storeName={resolveStoreName(fav.storeID)}
                    price={fav.price}
                    normalPrice={fav.normalPrice}
                    savings={fav.savings}
                    onRemove={() => removerFavorito(fav.id)}
                    onDetails={liveGame ? () => openModal(liveGame) : undefined}
                  />
                )
              })
            )}
          </div>
        </SheetContent>
      </Sheet>

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
