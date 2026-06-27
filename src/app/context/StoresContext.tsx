'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Store } from '@/types/store'

export type { Store } from '@/types/store'

interface StoresContextType {
  stores: Store[]
  resolveStoreName: (storeID: number) => string
}

interface StoresProviderProps {
  children: React.ReactNode
  initialStores: Store[]
}

export const StoresContext = createContext<StoresContextType | undefined>(undefined)
StoresContext.displayName = 'Stores'

export function StoresProvider({ children, initialStores }: StoresProviderProps) {
  const [stores] = useState<Store[]>(initialStores)

  // Build a lookup map once — O(1) resolution at render time
  const storeMap = useMemo(
    () => new Map(stores.map((s) => [s.storeID, s.storeName])),
    [stores]
  )

  const resolveStoreName = useMemo(
    () => (storeID: number): string => storeMap.get(storeID) ?? `Loja #${storeID}`,
    [storeMap]
  )

  return (
    <StoresContext.Provider value={{ stores, resolveStoreName }}>
      {children}
    </StoresContext.Provider>
  )
}

export function useStores() {
  const context = useContext(StoresContext)
  if (!context) throw new Error('useStores deve ser usado dentro de um StoresProvider')
  return context
}
