'use client'

import { FaSearch } from "react-icons/fa"
import { BiFilterAlt } from "react-icons/bi"
import React, { useState } from "react"
import { IoCaretDown } from "react-icons/io5";
import { IoCaretUp } from "react-icons/io5";
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface FiltersProps {
    onFilter: (filters: FilterValues) => void
}

export interface FilterValues {
    store: string //loja
    lowerPrice: string //min preço
    upperPrice: string //max preco
    minDiscount: string //desconto min
    sortBy: string //ordem
}

export default function FilterSidebar({ onFilter }: FiltersProps) {

    const [store, setStore] = useState("")
    const [lowerPrice, setLowerPrice] = useState("")
    const [upperPrice, setUpperPrice] = useState("")
    const [minDiscount, setMinDiscount] = useState("")
    const [sortBy, setSortBy] = useState("price")
    const [isOpen, setIsOpen] = useState(false)


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        onFilter({
            store,
            lowerPrice,
            upperPrice,
            minDiscount,
            sortBy,
        })
    }


    return (
        <section className='sidebar lg:max-w-[214px] p-4 lg:p-0'>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <BiFilterAlt />
                <p className='uppercase font-bold font-orbitron'>filtros</p>

                <button className="bg-purple-700 rounded ml-2 lg:hidden">
                    {
                        isOpen? <IoCaretDown /> :  <IoCaretUp />
                    }
                </button>
            </div>

            <form className={`space-y-6 mt-6 ${isOpen ? 'hidden' : 'block'} lg:block transition-transform duration-300 ease-in-out`} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="store">Filtrar por loja:</label>

                    <Select value={store} onValueChange={setStore}>
                        <SelectTrigger className='w-full p-2 border border-cinza-suave rounded mt-2'>
                            <SelectValue placeholder="Selecione uma loja" />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-600 rounded border-none">
                            <SelectItem className="text-white font-sora" value="all">Todas as Lojas</SelectItem>
                            <SelectItem className="text-white font-sora" value="1">Steam</SelectItem>
                            <SelectItem className="text-white font-sora" value="2">Epic Games</SelectItem>
                            <SelectItem className="text-white font-sora" value="3">GOG</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                <div>
                    <label>Faixa de preço:</label>
                    <div className="flex gap-2 mt-2">
                        <Input type="number" value={lowerPrice} placeholder="Min."
                            className='w-1/2 p-2 border border-cinza-suave rounded' onChange={(e) => setLowerPrice(e.target.value)} />
                        <Input type="number" value={upperPrice} placeholder="Máx."
                            className='w-1/2 p-2 border border-cinza-suave rounded' onChange={(e) => setUpperPrice(e.target.value)} />

                        <button type="submit" className='bg-roxo-medio rounded px-3'>
                            <FaSearch className="text-white" />
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
                            <SelectValue placeholder="Selecione uma loja" />
                        </SelectTrigger>
                        <SelectContent className="bg-purple-600 rounded border-none">
                            <SelectItem className="text-white font-sora" value="price">Preço</SelectItem>
                            <SelectItem className="text-white font-sora" value="savings">Desconto</SelectItem>
                            <SelectItem className="text-white font-sora" value="dealRating">Avaliação</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-3 justify-between">

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
                                <SelectValue placeholder="Selecione uma loja" />
                            </SelectTrigger>
                            <SelectContent className="bg-purple-600 rounded border-none">
                                <SelectItem className="text-white font-sora" value="price">Preço</SelectItem>
                                <SelectItem className="text-white font-sora" value="savings">Desconto</SelectItem>
                                <SelectItem className="text-white font-sora" value="dealRating">Avaliação</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <button type="submit" className='bg-roxo-medio w-full p-2 rounded cursor-pointer'>
                    Filtrar
                </button>

            </form>
        </section>
    )
}