'use client'
import { useState } from 'react';
import type { Game } from '@/types/game';

export function useGameModal() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (game: Game) => {
    setSelectedGame(game);
    setIsOpen(true);
  };

  const close = () => {
    setSelectedGame(null);
    setIsOpen(false);
  };

  return { selectedGame, isOpen, open, close };
}
