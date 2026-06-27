'use client'
import { useCallback, useMemo, useState } from 'react';
import { useGames } from '@/app/context/GamesContext';
import type { FilterValues, ApiFilters } from '@/types/filter';

interface ClientFilters {
  minDiscount: string;
  sortBy: string;
}

const defaultClientFilters: ClientFilters = { minDiscount: '', sortBy: 'price' };

export function useGameFilters() {
  const { games, search, refreshGames } = useGames();
  const [clientFilters, setClientFilters] = useState<ClientFilters>(defaultClientFilters);

  const handleFilter = useCallback((filters: FilterValues) => {
    setClientFilters({ minDiscount: filters.minDiscount, sortBy: filters.sortBy });

    const apiFilters: ApiFilters = {};
    if (filters.store && filters.store !== 'all') apiFilters.storeID = filters.store;
    if (filters.lowerPrice) apiFilters.lowerPrice = filters.lowerPrice;
    if (filters.upperPrice) apiFilters.upperPrice = filters.upperPrice;

    refreshGames(apiFilters);
  }, [refreshGames]);

  const filteredGames = useMemo(() => {
    let result = [...games];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((g) => g.title.toLowerCase().includes(q));
    }

    if (clientFilters.minDiscount) {
      const min = parseFloat(clientFilters.minDiscount);
      result = result.filter((g) => g.savings >= min);
    }

    switch (clientFilters.sortBy) {
      case 'price':
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'savings':
        result.sort((a, b) => b.savings - a.savings);
        break;
      case 'dealRating':
        result.sort((a, b) => b.dealRating - a.dealRating);
        break;
    }

    return result;
  }, [games, search, clientFilters]);

  return { filteredGames, handleFilter };
}
