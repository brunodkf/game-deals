'use client'

import Banner from "./components/Banner/page";
import Navbar from "./components/Navbar/Navbar";
import DataTable from "@/app/components/DataTable/page"
import FilterSidebar, { FilterValues } from "./components/FilterSidebar/page";

import { useGames } from "./context/GamesContext"
import { useEffect, useState } from "react";

export default function Home() {

  const { games, search } = useGames()

  const [filteredGames, setFilteredGames] = useState(games)

  const initialFilters: FilterValues = {
    store: '',
    lowerPrice: '',
    upperPrice: '',
    minDiscount: '',
    sortBy: '',
  }

  const handleFilter = (filters: FilterValues) => {

    let filtered = [...games]

    if (search) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase())
      )
    }


    if (filters.store) {
      filtered = filtered.filter(game => game.storeID.toString() === filters.store)
    }

    if (filters.lowerPrice) {
      filtered = filtered.filter(game => game.salePrice >= parseFloat(filters.lowerPrice))
    }

    if (filters.upperPrice) {
      filtered = filtered.filter(game => game.salePrice <= parseFloat(filters.upperPrice))
    }

    if (filters.minDiscount) {
      filtered = filtered.filter(game => game.savings >= parseFloat(filters.minDiscount))
    }

    switch (filters.sortBy) {
      case "price":
        filtered.sort((a, b) => a.salePrice - b.salePrice)
        break
      case "savings":
        filtered.sort((a, b) => b.savings - a.savings)
        break
      case "dealRating":
        filtered.sort((a, b) => b.dealRating - a.dealRating)
        break
    }

    setFilteredGames(filtered)
  }

  useEffect(() => {
    handleFilter(initialFilters)
  }, [search])


  return (
    <main className="w-full min-h-screen font-sora">
      <Navbar />

      <div className="container m-auto flex flex-col lg:flex-row gap-4 mt-6">

        <FilterSidebar onFilter={handleFilter} />

        <div className=" w-10/11 md:w-full m-auto">

          <Banner />

          <DataTable filteredGames={filteredGames} />
        </div>
      </div>

    </main>
  );
}
