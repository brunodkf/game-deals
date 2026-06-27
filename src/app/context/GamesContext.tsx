'use client'
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Game } from '@/types/game';
import type { ApiFilters } from '@/types/filter';
import { fetchDealsClient } from '@/services/deals.client';

export type { Game } from '@/types/game';

interface GamesContextType {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  refreshGames: (filters: ApiFilters) => void;
}

interface GamesProviderProps {
  children: React.ReactNode;
  initialGames: Game[];
}

export const GamesContext = createContext<GamesContextType | undefined>(undefined);
GamesContext.displayName = "Games";

export function GamesProvider({ children, initialGames }: GamesProviderProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const refreshGames = useCallback((filters: ApiFilters) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    setIsLoading(true);
    setError(null);
    fetchDealsClient(filters, signal)
      .then((newGames) => { setGames(newGames); })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        const message = err instanceof Error ? err.message : 'Erro ao buscar jogos';
        setError(message);
        console.error('[GamesContext] refreshGames failed:', err);
      })
      .finally(() => {
        if (!signal.aborted) setIsLoading(false);
      });
  }, []);

  return (
    <GamesContext.Provider value={{ games, isLoading, error, search, setSearch, refreshGames }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames deve ser usado dentro de um GamesProvider");
  }
  return context;
}
