'use client'
import React, { createContext, useContext, useState } from "react";
import type { Game } from '@/types/game';

// Re-export for backward compatibility with existing component imports
export type { Game } from '@/types/game';

interface GamesContextType {
  games: Game[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

interface GamesProviderProps {
  children: React.ReactNode;
  initialGames: Game[];
}

export const GamesContext = createContext<GamesContextType | undefined>(undefined);
GamesContext.displayName = "Games";

export function GamesProvider({ children, initialGames }: GamesProviderProps) {
  const [games] = useState<Game[]>(initialGames);
  const [search, setSearch] = useState("");

  return (
    <GamesContext.Provider value={{ games, isLoading: false, search, setSearch }}>
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
