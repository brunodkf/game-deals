import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { SiNintendogamecube } from "react-icons/si";
import { IoHeart } from "react-icons/io5";
import { useGames } from '@/app/context/GamesContext'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const Navbar = () => {

    const { setSearch } = useGames();
    const [inputValue, setInputValue] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [searchView, setSearchView] = useState('hidden')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearch(inputValue);
        }
    }


    const handleOpen = () => {
        setIsOpen(!isOpen)

        if (isOpen) {
            setSearchView('flex')
        } else {
            setSearchView('hidden')
        }
    }

    return (
        <section className='w-full h-auto py-3 flex flex-col items-center  relative'>
            <nav className='container m-auto flex items-center justify-between px-2 md:px-0 border-b-1 pb-3 border-b-cinza-suave'>
                <div className="flex items-center">
                    <SiNintendogamecube className='text-4xl text-roxo-medio' />
                    <span className='font-orbitron font-extrabold text-roxo-medio'>GameDeal</span>
                </div>

                <div className="flex gap-6 items-center">
                    <FaSearch className='sm:hidden text-xl text-roxo-medio cursor-pointer' onClick={() => handleOpen()} />

                    <div className="hidden sm:block relative w-full max-w-sm">
                        <div className="flex w-full max-w-lg items-center space-x-2 border-muted-foreground ">
                            <Input
                                type="text"
                                placeholder="Search games..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='z-0 border border-cinza-suave'
                            />
                            <Button
                                type="submit"
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 cursor-pointer"
                                onClick={() => setSearch(inputValue)}
                            >
                                <FaSearch />
                            </Button>
                        </div>
                    </div>

                    <IoHeart className='text-3xl text-roxo-medio' />
                    <FaShoppingCart className='text-3xl text-roxo-medio' />
                </div>
            </nav>

            <div className={`${searchView} w-full left-0 sm:hidden p-4`}>
                <div className="w-full items-center space-x-2 border-muted-foreground  ">
                    <Input
                        type="text"
                        placeholder="Search games..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='z-0 border border-cinza-suave '
                    />
                    <Button
                        type="submit"
                        className="absolute right-5 top-8/12 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 cursor-pointer"
                        onClick={() => setSearch(inputValue)}
                    >
                        <FaSearch />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Navbar