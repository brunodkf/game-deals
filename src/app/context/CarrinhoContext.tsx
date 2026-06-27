'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem } from '@/types/cart'

export type { CartItem } from '@/types/cart'

interface CarrinhoContextType {
  itens: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  isPanelOpen: boolean
  openPanel: () => void
  closePanel: () => void
}

export const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined)
CarrinhoContext.displayName = 'Carrinho'

export default function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      const stored = localStorage.getItem('carrinho')
      if (stored) setItens(JSON.parse(stored))
    } catch {
      localStorage.removeItem('carrinho')
    }
  }, [])

  useEffect(() => {
    if (isClient) localStorage.setItem('carrinho', JSON.stringify(itens))
  }, [itens, isClient])

  function addItem(item: CartItem) {
    setItens(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item])
  }

  function removeItem(id: number) {
    setItens(prev => prev.filter(i => i.id !== id))
  }

  function clearCart() {
    setItens([])
  }

  return (
    <CarrinhoContext.Provider value={{
      itens,
      addItem,
      removeItem,
      clearCart,
      isPanelOpen,
      openPanel: () => setIsPanelOpen(true),
      closePanel: () => setIsPanelOpen(false),
    }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext)
  if (!context) throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider')
  return context
}
