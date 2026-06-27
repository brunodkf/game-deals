'use client'

import { useState } from 'react'
import { ShoppingCart, CheckCircle2 } from 'lucide-react'
import { useCarrinho } from '@/app/context/CarrinhoContext'
import { useStores } from '@/app/context/StoresContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import SidePanelItem from '../SidePanelItem'

export default function CarrinhoPanel() {
  const { itens, removeItem, clearCart, isPanelOpen, closePanel } = useCarrinho()
  const { resolveStoreName } = useStores()
  const [checkoutState, setCheckoutState] = useState<'idle' | 'success'>('idle')

  const total = itens.reduce((sum, item) => sum + item.price, 0)
  const savings = itens.reduce((sum, item) => sum + (item.normalPrice - item.price), 0)

  function handleCheckout() {
    setCheckoutState('success')
    clearCart()
    setTimeout(() => {
      setCheckoutState('idle')
      closePanel()
    }, 2500)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setCheckoutState('idle')
      closePanel()
    }
  }

  return (
    <Sheet open={isPanelOpen} onOpenChange={handleOpenChange}>
      <SheetContent aria-label="Carrinho de compras">
        <SheetHeader>
          <SheetTitle className="font-orbitron text-white flex items-center gap-2">
            <ShoppingCart size={16} className="text-purple-400 flex-shrink-0" />
            Carrinho
            {itens.length > 0 && (
              <span className="ml-auto text-xs font-normal text-zinc-400">
                {itens.length} {itens.length === 1 ? 'item' : 'itens'}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Jogos selecionados para compra
          </SheetDescription>
        </SheetHeader>

        {checkoutState === 'success' ? (
          <div className="flex flex-col items-center justify-center flex-1 px-8 py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mb-5">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-200">Compra finalizada!</h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Obrigado pela sua preferência. Em uma aplicação real, você seria
              redirecionado ao gateway de pagamento.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {itens.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-5">
                    <ShoppingCart size={38} className="text-zinc-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Carrinho vazio
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-[220px]">
                    Adicione jogos clicando em{' '}
                    <span className="text-purple-400 font-medium">Adicionar ao Carrinho</span>{' '}
                    nos detalhes de qualquer oferta.
                  </p>
                </div>
              ) : (
                itens.map((item) => (
                  <SidePanelItem
                    key={item.id}
                    thumb={item.thumb}
                    title={item.name}
                    storeName={resolveStoreName(item.storeID)}
                    price={item.price}
                    normalPrice={item.normalPrice}
                    savings={item.savings}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              )}
            </div>

            {itens.length > 0 && (
              <SheetFooter>
                <div className="space-y-1 mb-3">
                  {savings > 0 && (
                    <div className="flex justify-between text-xs text-green-400">
                      <span>Você economiza</span>
                      <span className="font-semibold">${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Total</span>
                    <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={closePanel}
                  className="w-full py-2 px-4 rounded border border-zinc-600 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Continuar comprando
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 px-4 rounded bg-roxo-medio hover:opacity-90 text-white font-semibold text-sm transition-opacity cursor-pointer"
                >
                  Finalizar compra
                </button>
              </SheetFooter>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
