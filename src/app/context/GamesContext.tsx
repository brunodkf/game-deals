'use client'
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Game {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: number;
  gameID: number;
  salePrice: number;
  normalPrice: number;
  isOnSale: boolean;
  savings: number;
  metacriticScore: number;
  steamRatingText: string;
  steamRatingPercent: number;
  steamRatingCount: number;
  steamAppID: number;
  releaseDate: number;
  lastChange: number;
  dealRating: number;
  thumb: string;
}

interface RawGame {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number | string;
  lastChange: number | string;
  dealRating: string;
  thumb: string;
}

function parseGame(game: RawGame): Game {
  return {
    ...game,
    storeID: Number(game.storeID),
    gameID: Number(game.gameID),
    salePrice: parseFloat(game.salePrice),
    normalPrice: parseFloat(game.normalPrice),
    isOnSale: game.isOnSale === "1",
    savings: parseFloat(game.savings),
    metacriticScore: parseInt(game.metacriticScore),
    steamRatingPercent: parseInt(game.steamRatingPercent),
    steamRatingCount: parseInt(game.steamRatingCount),
    steamAppID: parseInt(game.steamAppID),
    releaseDate: Number(game.releaseDate),
    lastChange: Number(game.lastChange),
    dealRating: parseFloat(game.dealRating),
  };
}

interface GamesContextType {
  games: Game[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

export const GamesContext = createContext<GamesContextType | undefined>(undefined);
GamesContext.displayName = "Games";

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get("/api/games");

        const listFormat = response.data.map((game: RawGame) => parseGame(game));
        setGames(listFormat);
      } catch (error) {
        console.error("Erro ao buscar lista de jogos (GAMES):", error);
      } finally {
        setIsLoading(false);
      }
    };

    getGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games, isLoading, search, setSearch }}>
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
