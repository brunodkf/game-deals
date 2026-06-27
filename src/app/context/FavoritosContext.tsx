'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Favorito } from '@/types/favorito';

export type { Favorito } from '@/types/favorito';

interface FavoritoType {
  favoritos: Favorito[]
  adicionarFavorito: (novoFavorito: Favorito) => void;
  removerFavorito: (id: number) => void;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

export const FavoritosContext = createContext<FavoritoType | undefined>(undefined);
FavoritosContext.displayName = 'Favoritos';

export default function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedFavoritos = localStorage.getItem("favoritos");
      if (storedFavoritos) {
        const parsed = JSON.parse(storedFavoritos);
        // Migrate old format: ensure new required fields have fallback values
        const migrated: Favorito[] = parsed.map((f: Record<string, unknown>) => ({
          id: (f.id as number) ?? 0,
          name: (f.name as string) ?? '',
          price: (f.price as number) ?? 0,
          thumb: (f.thumb as string) ?? '',
          storeID: (f.storeID as number) ?? 0,
          normalPrice: (f.normalPrice as number) ?? 0,
          savings: (f.savings as number) ?? 0,
        }));
        setFavoritos(migrated);
      }
    } catch {
      localStorage.removeItem("favoritos");
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos, isClient]);

  function adicionarFavorito(novoFavorito: Favorito) {
    if (!favoritos.find((item) => item.id === novoFavorito.id)) {
      setFavoritos(prev => [...prev, novoFavorito]);
    }
  }

  function removerFavorito(id: number) {
    setFavoritos(prev => prev.filter((item) => item.id !== id));
  }

  return (
    <FavoritosContext.Provider value={{
      favoritos,
      adicionarFavorito,
      removerFavorito,
      isPanelOpen,
      openPanel: () => setIsPanelOpen(true),
      closePanel: () => setIsPanelOpen(false),
    }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos deve ser usado dentro de um FavoritosProvider");
  }
  return context;
}
