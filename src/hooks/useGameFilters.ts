'use client'
import { useCallback, useEffect, useState } from 'react';
import { useGames } from '@/app/context/GamesContext';
import type { Game } from '@/types/game';
import type { FilterValues } from '@/types/filter';

const initialFilters: FilterValues = {
  store: '',
  lowerPrice: '',
  upperPrice: '',
  minDiscount: '',
  sortBy: '',
};

export function useGameFilters() {
  const { games, search } = useGames();
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);

  const handleFilter = useCallback((filters: FilterValues) => {
    let filtered = [...games];

    if (search) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.store && filters.store !== 'all') {
      filtered = filtered.filter(game => game.storeID.toString() === filters.store);
    }

    if (filters.lowerPrice) {
      filtered = filtered.filter(game => game.salePrice >= parseFloat(filters.lowerPrice));
    }

    if (filters.upperPrice) {
      filtered = filtered.filter(game => game.salePrice <= parseFloat(filters.upperPrice));
    }

    if (filters.minDiscount) {
      filtered = filtered.filter(game => game.savings >= parseFloat(filters.minDiscount));
    }

    switch (filters.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'savings':
        filtered.sort((a, b) => b.savings - a.savings);
        break;
      case 'dealRating':
        filtered.sort((a, b) => b.dealRating - a.dealRating);
        break;
    }

    setFilteredGames(filtered);
  }, [games, search]);

  useEffect(() => {
    handleFilter(initialFilters);
  }, [handleFilter]);

  return { filteredGames, handleFilter };
}
