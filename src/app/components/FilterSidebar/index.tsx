'use client'

import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { useGames } from '@/app/context/GamesContext'
import { useStores } from '@/app/context/StoresContext'
import type { FilterValues } from '@/types/filter'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Re-export so existing page-level imports remain valid
export type { FilterValues } from '@/types/filter'

interface FiltersProps {
    onFilter: (filters: FilterValues) => void
}

export default function FilterSidebar({ onFilter }: FiltersProps) {
    const { games } = useGames()
    const { stores, resolveStoreName } = useStores()

    const [store, setStore] = useState("")
    const [lowerPrice, setLowerPrice] = useState("")
    const [upperPrice, setUpperPrice] = useState("")
    const [minDiscount, setMinDiscount] = useState("")
    const [sortBy, setSortBy] = useState("price")
    const [isOpen, setIsOpen] = useState(false)

    // Derive the set of storeIDs actually present in the current dataset
    const availableStores = useMemo(() => {
        const presentIds = new Set(games.map((g) => g.storeID))
        return stores
            .filter((s) => presentIds.has(s.storeID))
            .sort((a, b) => a.storeName.localeCompare(b.storeName))
    }, [games, stores])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onFilter({ store, lowerPrice, upperPrice, minDiscount, sortBy })
    }

    return (
        <section className='sidebar lg:max-w-[214px] p-4 lg:p-0'>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <SlidersHorizontal size={16} />
                <p className='uppercase font-bold font-orbitron'>filtros</p>
                <button className="bg-purple-700 rounded ml-2 lg:hidden">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            <form
                className={`space-y-6 mt-6 ${isOpen ? 'block' : 'hidden'} lg:block transition-transform duration-300 ease-in-out`}
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="store">Filtrar por loja:</label>
                    <Select value={store} onValueChange={setStore}>
                        <SelectTrigger className='w-full p-2 border border-cinza-suave rounded mt-2'>
                            <SelectValue placeholder="Selecione uma loja" />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-600 rounded border-none">
                            <SelectItem className="text-white font-sora" value="all">
                                Todas as Lojas
                            </SelectItem>
                            {availableStores.map((s) => (
                                <SelectItem
                                    key={s.storeID}
                                    className="text-white font-sora"
                                    value={s.storeID.toString()}
                                >
                                    {resolveStoreName(s.storeID)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Faixa de preço:</label>
                    <div className="flex gap-2 mt-2">
                        <Input
                            type="number"
                            value={lowerPrice}
                            placeholder="Min."
                            className='w-1/2 p-2 border border-cinza-suave rounded'
                            onChange={(e) => setLowerPrice(e.target.value)}
                        />
                        <Input
                            type="number"
                            value={upperPrice}
                            placeholder="Máx."
                            className='w-1/2 p-2 border border-cinza-suave rounded'
                            onChange={(e) => setUpperPrice(e.target.value)}
                        />
                        <button type="submit" className='bg-roxo-medio rounded px-3 cursor-pointer'>
                            <Search size={14} className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="minDiscount">Desconto mínimo (%):</label>
                    <input
                        type="number"
                        id="minDiscount"
                        placeholder="Ex: 70"
                        className='w-full p-2 border border-cinza-suave rounded mt-2'
                        value={minDiscount}
                        onChange={(e) => setMinDiscount(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="sortBy">Ordenar por:</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className='w-full p-2 border border-cinza-suave rounded mt-2'>
                            <SelectValue placeholder="Selecione uma ordenação" />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-600 rounded border-none">
                            <SelectItem className="text-white font-sora" value="price">Preço</SelectItem>
                            <SelectItem className="text-white font-sora" value="savings">Desconto</SelectItem>
                            <SelectItem className="text-white font-sora" value="dealRating">Avaliação</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <button type="submit" className='bg-roxo-medio w-full p-2 rounded cursor-pointer'>
                    Filtrar
                </button>
            </form>
        </section>
    )
}
