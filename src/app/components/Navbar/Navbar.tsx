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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearch(inputValue); 
        }
    }

    return (
        <section className='w-full h-16 flex items-center border-b-1 border-b-cinza-suave'>
            <nav className='container m-auto flex items-center justify-between px-2 md:px-0'>
                <div className="flex items-center">
                    <SiNintendogamecube className='text-4xl text-roxo-medio' />
                    <span className='font-orbitron font-extrabold text-roxo-medio'>GameDeal</span>
                </div>

                <div className="flex gap-6 items-center">
                    <FaSearch className='md:hidden text-xl text-roxo-medio' />

                    <div className="hidden md:block relative w-full max-w-sm">
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
        </section>
    )
}

export default Navbar